import React from "react";

const CommentDetail = (prop) => {
  return (
    <>
      <div className="comment">
        <a href="/" className="avatar">
          <img
            alt="avatar"
            src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
          />
        </a>
        <div className="content">
          <a href="/" className="author">
            {prop.author}
          </a>

          <div className="metadata">
            <span className="date">{prop.date}</span>
          </div>
          <div className="Text"> {prop.comment}</div>
        </div>
      </div>
    </>
  );
};

export default CommentDetail;
