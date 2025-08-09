import { FullPostType } from "@/types";

import { Repeat2 } from "lucide-react";

interface RepostIndicatorProps {
  post: FullPostType;
  currentUserId: string;
}

const RepostIndicator = ({ post, currentUserId }: RepostIndicatorProps) => {
  return (
    <div>
      {post.reposts.map((rep) => rep.userId).includes(currentUserId) && (
        <div className="flex items-center gap-2 text-sm mb-2 text-text-gray">
          <Repeat2 size={16} />
          <p className="text-xs">Has reposteado</p>
        </div>
      )}
    </div>
  );
};

export default RepostIndicator;
