import { useEffect, useState } from "react";

import { getCommentsByParentIdAction } from "@/actions/comment";
import { FullCommentType } from "@/types";

export const useInfinityRepliesComments = (
  commentResponses: number,
  commentId: number
) => {
  const [request, setrequest] = useState(1);
  const [data, setData] = useState<Array<FullCommentType>>([]);
  const [hasMore, setHasmore] = useState(true);
  const [ocult, setOcult] = useState(false);

  useEffect(() => {
    if (data.length === commentResponses) {
      setHasmore(false);
    }
  }, [data, commentResponses]);

  const handleOcult = () => setOcult(true)

  const showResponses = async () => {
    if (ocult && data.length > 0) {
      setOcult(false);
      return;
    }

    if (hasMore) {
      const comments = await getCommentsByParentIdAction(commentId, request);
      setData((prev) => [...prev, ...comments]);
      setrequest((prev) => prev + 1);
    }
  };

  return { data, hasMore, ocult, handleOcult, showResponses };
};
