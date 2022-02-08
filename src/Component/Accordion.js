import React, { useState } from "react";

const Accordian = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const rendredItems = props.items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      <React.Fragment key={Math.random().toString()}>
        <div className="title active" onClick={() => setActiveIndex(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{rendredItems}</div>;
};
export default Accordian;
