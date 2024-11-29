import React, { useState } from "react";

const CommentInput = () => {
  const [commentText, setCommentText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission here
    setCommentText("");
  };

  return (
    <div className="flex space-x-4">
      <img
        src="http://carismartes.com.br/assets/global/images/avatars/avatar1_big.png"
        alt="user avatar"
        className="w-10 h-10 rounded-full"
      />
      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-gray-700 focus:border-gray-500 outline-none py-2"
        />

        {isInputFocused && (
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsInputFocused(false);
                setCommentText("");
              }}
              className="px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentInput;
