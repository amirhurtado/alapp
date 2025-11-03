"use server";

import { prisma } from "@/prisma";
import { postIncludes } from "./constants";
import { FullPostType } from "@/types";

export const getPostsAction = async (
  currentUserId: string,
  placement: "mainFeed" | "exploreFeed" | "profile",
  page: number = 1
) => {
  const skip = (page - 1) * 10;

  // Para saber a quién sigo
  const following = await prisma.follow.findMany({
    where: { followerId: currentUserId },
    select: { followingId: true },
  });
  const followingIds = following.map((f) => f.followingId);

  if (placement === "mainFeed") {
    // Posts míos y de los que sigo
    const users = [currentUserId, ...followingIds];
    return prisma.post.findMany({
      where: { authorId: { in: users } },
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  if (placement === "profile") {
    // Solo posts del perfil específico
    return prisma.post.findMany({
      where: { authorId: currentUserId }, // O el perfil que se esté viendo
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  if (placement === "exploreFeed") {
    // Posts de otros que no sean yo ni los que sigo
    const excludedUsers = [currentUserId, ...followingIds];
    return prisma.post.findMany({
      where: {
        NOT: { authorId: { in: excludedUsers } },
      },
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }
  return [];
};

export const getPostByIdAction = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postIncludes,
  });
};

export const getPostsLikedByUserAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  return await prisma.post.findMany({
    where: {
      likesPost: {
        some: {
          userId,
        },
      },
    },
    include: postIncludes,
    take: 10,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostsRepostedByUserAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  return await prisma.post.findMany({
    where: {
      reposts: {
        some: {
          userId,
        },
      },
    },
    include: postIncludes,
    take: 10,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostsFavoriteByUserAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  return await prisma.post.findMany({
    where: {
      favorites: {
        some: {
          userId,
        },
      },
    },
    skip,
    take: 10,
    include: postIncludes,
    orderBy: {
      createdAt: "desc",
    },
  });
};




export const getIARecommendation = async (
  userId: string
): Promise<{ message: string; post?: FullPostType }> => {
  const [myPosts, otherPosts] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: userId },
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { description: true },
    }),
    prisma.post.findMany({
      where: { authorId: { not: userId } },
      take: 20,
      select: { id: true, description: true },
    }),
  ]);

  // 🟣 Caso: el usuario no tiene posts
  if (myPosts.length === 0) {
    const firstPost = await prisma.post.findUnique({
      where: { id: otherPosts[0].id },
      include: postIncludes,
    });

    if (!firstPost) {
      return { message: "No se encontró un post recomendado." };
    }

    return {
      message: "No has subido posts, pero puede interesarte:",
      post: {
        ...firstPost,
        metadata: { recommendedByIA: true },
      },
    };
  }

  // 🧠 Configuración IA
  const apiKey = process.env.GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const aiRules = `
    - Solo debes responder un JSON válido.
    - No uses bloques de código como \`\`\`json.
    - No incluyas texto adicional ni comentarios.
  `;

  const aiContext = `
    Eres un sistema de recomendación de una red social.
    Debes analizar los posts del usuario y otros posts para encontrar el más relacionado semánticamente.
  `;

  const currentQuestion = `
MIS ÚLTIMOS POSTS:
${myPosts.map((p, i) => `${i + 1}. ${p.description}`).join("\n")}

POSTS DE OTROS USUARIOS:
${otherPosts.map((p, i) => `${i + 1}. ID=${p.id} => ${p.description}`).join("\n")}

TAREA:
Devuelve solo un JSON con el formato exacto:
{
  "recommendedIndex": NÚMERO_DEL_POST_MÁS_RELEVANTE (1 a ${otherPosts.length})
}
IMPORTANTE: Devuelve el ÍNDICE (número de la lista), no el ID.
  `;

  try {
    const requestBody = {
      contents: [{ parts: [{ text: currentQuestion }] }],
      system_instruction: {
        parts: [
          {
            text: `
            Rules: ${aiRules}
            Context: ${aiContext}
            `,
          },
        ],
      },
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Request error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Invalid response or blocked by security settings.");
    }

    let textResponse = data.candidates[0].content.parts[0].text;

    textResponse = textResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed: { recommendedIndex?: number } | null = null;
    try {
      parsed = JSON.parse(textResponse);
    } catch {
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsed || typeof parsed.recommendedIndex !== "number") {
      return { message: "No se encontró una recomendación válida (etapa 1)." };
    }

    const index = parsed.recommendedIndex - 1;

    if (index < 0 || index >= otherPosts.length) {
      return { message: "No se encontró una recomendación válida (índice fuera de rango)." };
    }

    const recommendedId = otherPosts[index].id;

    const recommendedPost = await prisma.post.findUnique({
      where: { id: recommendedId },
      include: postIncludes,
    });

    if (!recommendedPost) {
      return { message: "No se encontró una recomendación válida." };
    }

    // ✅ Agregamos metadata justo antes del return
    const postWithMetadata = {
      ...recommendedPost,
      metadata: { recommendedByIA: true },
    };

    return {
      message: "Te podría interesar este post:",
      post: postWithMetadata,
    };
  } catch (error) {
    console.error("Error en getIARecommendation:", error);
    return { message: "Error al obtener recomendación." };
  }
};
