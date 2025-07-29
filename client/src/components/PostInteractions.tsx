import {
  MessageSquare,
  Repeat2,
  Heart,
  ChartNoAxesColumn,
  Star,
  Upload,
} from "lucide-react";
import React from "react";

const PostInteractions = ({ comment = false }: { comment?: boolean }) => {
  return (
    <div className={`flex ${comment ? 'justify-end gap-8' : 'justify-between'} text-xs mt-6 text-text-gray`}>
      <div className="flex gap-1 items-center rounded-2xl  group cursor-pointer hover:text-icon-blue hover:scale-[1.05] transition-transform ease-in duration-200">
        <MessageSquare size={18} />
        <p>127</p>
      </div>

      {!comment && (
        <div className="flex gap-1 items-center group cursor-pointer  hover:text-icon-green hover:scale-[1.05] transition-transform ease-in duration-200">
          {" "}
          <Repeat2 size={18} />
          <p>127</p>
        </div>
      )}

      <div className="flex gap-1 items-center group cursor-pointer hover:text-icon-pink hover:scale-[1.05] transition-transform ease-in duration-200">
        <Heart size={18} />
        <p>127</p>
      </div>

      {!comment && (
        <>
          <div className="hidden md:flex gap-1 items-center group cursor-pointer hover:text-icon-orange hover:scale-[1.05] transition-transform ease-in duration-200 ">
            {" "}
            <ChartNoAxesColumn size={18} />
            <p>127</p>
          </div>

          <div className="flex gap-4 items-center  ">
            <Star
              size={18}
              className="text-text-gray hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in"
            />
            <Upload
              size={18}
              className=" text-text-gray hover:text-icon-blue cursor-pointer transition-colors duration-200 ease-in"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostInteractions;
