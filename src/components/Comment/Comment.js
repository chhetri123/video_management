import React from "react";
import "./Comment.css";
const Comment = (props) => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">
        {props.comment} &nbsp;&nbsp;Comments
        <i className="icon sort amount up"></i>
      </h3>
      <div className="ui grid">
        <div className="two wide column">
          <img
            className="ui image comment_avatar"
            alt=""
            src="http://carismartes.com.br/assets/global/images/avatars/avatar1_big.png"
          />
        </div>
        <div className="column">
          <div className="ui icon input">
            <input
              className="comment_input"
              type="text"
              placeholder="Add a public comment ...."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
