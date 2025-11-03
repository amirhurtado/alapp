"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostByIdAction } from "@/actions/post/getPost";
import PostCard from "@/features/post/components/PostCard";
import { FullPostType } from "@/types";

interface IARecomentationProps {
  currentUserId: string;
  iARecomendation?: {
    message: string;
    post?: FullPostType;
  };
}

const IARecommentation = ({
  currentUserId,
  iARecomendation,
}: IARecomentationProps) => {
  const post = iARecomendation?.post;
  const message =
    iARecomendation?.message ?? "No se encontró una recomendación.";

  const queryKey = ["IARecommendationPost", { id: post?.id }];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getPostByIdAction(post!.id),
    initialData: post,
    enabled: !!post, 
  });

  if (!post) {
    return (
      <div className="flex flex-col gap-4 border rounded-xl p-4">
        <p className="text-md font-bold">Recomendaciones de la IA</p>
        <p className="text-xs text-text-gray">{message}</p>
      </div>
    );
  }

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

      <PostCard post={data} currentUserId={currentUserId} queryKey={queryKey} />
    </div>
  );
};

export default IARecommentation;
