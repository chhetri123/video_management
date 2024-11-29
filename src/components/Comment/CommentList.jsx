import React from "react";
import CommentItem from "./CommentItem";
import { useYoutube } from "../../context/YoutubeContext";
import { formatViews } from "../Helper/helperStat";
import CommentInput from "./CommentInput";

const CommentList = () => {
  const { comments } = useYoutube();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-medium">Comments</h3>
        <span className="text-gray-400">
          {formatViews(comments?.length)} comments
        </span>
      </div>

      <CommentInput />

      <div className="space-y-6">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
