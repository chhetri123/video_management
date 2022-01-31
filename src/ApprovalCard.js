import React from "react";
// import ReactDOM from "react-dom";
const ApprovalCard = (props) => {
  console.log(props.children);
  return (
    <>
      <div className="ui card" style={{ width: "60%", height: "100%" }}>
        <div className="content">{props.children}</div>
        <div className="extra content ">
          <div className="ui two buttons">
            <div className="ui basic green button">Approve </div>
            <div className="ui basic red button">Decline</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalCard;
