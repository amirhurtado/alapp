"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostByIdAction } from "@/actions/post/getPost";
import PostCard from "@/features/post/components/PostCard";
import { FullPostType } from "@/types";

interface IARecomentationClientProps {
  currentUserId: string;
  post: FullPostType;
  message: string;
}

const IARecomentationClient = ({
  currentUserId,
  post: originalPost,
  message,
}: IARecomentationClientProps) => {
  const queryKey = ["IARecommendationPost", { id: originalPost.id }];

  // Igual que en FullPostView
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getPostByIdAction(originalPost.id),
    initialData: originalPost,
  });

  if (isLoading && !data) {
    return <div>Cargando recomendación...</div>;
  }

  if (!data) {
    return <div>No se encontró el post recomendado.</div>;
  }

  return (
    <div className="flex flex-col gap-4 border rounded-xl p-4 max-h-[19rem] overflow-hidden">
      <p className="text-md font-bold">Recomendaciones de la IA</p>
      <p className="text-xs text-text-gray">{message}</p>

      <PostCard
        post={data}
        currentUserId={currentUserId}
        queryKey={queryKey}
      />
    </div>
  );
};

export default IARecomentationClient;
