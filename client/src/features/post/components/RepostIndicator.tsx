import { FullPostType } from "@/types";

import { Repeat2 } from "lucide-react";

interface RepostIndicatorProps {
  post: FullPostType;
  currentUserIdLog: string;
}

const RepostIndicator = ({ post, currentUserIdLog }: RepostIndicatorProps) => {
  return (
    <div>
      {post.reposts.map((rep) => rep.userId).includes(currentUserIdLog) && (
        <div className="flex items-center gap-2 text-sm mb-2 text-text-gray">
          <Repeat2 size={16} />
          <p className="text-xs">Has reposteado</p>
        </div>
      )}
    </div>
  );
};

export default RepostIndicator;
