import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
import { formatTimeAgo } from "../Helper/helperStat";

const CommentItem = ({ comment }) => {
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const { snippet } = comment.snippet.topLevelComment;
  const replyCount = comment.snippet.totalReplyCount;

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <img
          src={snippet.authorProfileImageUrl}
          alt={snippet.authorDisplayName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{snippet.authorDisplayName}</span>
            <span className="text-sm text-gray-400">
              {formatTimeAgo(snippet.publishedAt)}
            </span>
          </div>
          <p className="mt-1 text-gray-200">{snippet.textDisplay}</p>

          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center space-x-2 hover:bg-gray-800 rounded-full px-3 py-1">
              <ThumbsUp size={16} />
              <span className="text-sm">{snippet.likeCount}</span>
            </button>
            <button className="hover:bg-gray-800 rounded-full p-2">
              <ThumbsDown size={16} />
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              Reply
            </button>
          </div>

          {replyCount > 0 && (
            <button
              onClick={() => setIsRepliesVisible(!isRepliesVisible)}
              className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-400"
            >
              {isRepliesVisible ? "Hide" : `View`} {replyCount}{" "}
              {replyCount === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
      </div>

      {isRepliesVisible && comment.replies && (
        <div className="ml-14 space-y-4">
          {comment.replies.comments.map((reply) => (
            <CommentReply key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
