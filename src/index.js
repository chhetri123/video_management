import React from "react";
import ReactDOM from "react-dom";
import CommentDetail from "./commentDetail";

// class App extends React.Component {}

// create a react Components
// Its is a function or class that produces HTMl to show the user and handles feedback from users

/*  
Component Nesting -> A component can be shown inside of another 
Conponsnt Resuability -> We want to make components tat can be easily reused through out application 
component Configuration -> we should ba able to configure a components when it is created 


//  Props -> system for passing data from a parent component to a cild component -> Goal is o customize or configure a child component 
*/

// const getClickMe = () => {
//   return "Mansh chhetri";
// };
// const App = function () {
//   return (
//     <>
//       <div className="chhetri" style={{ backgroundColor: "Red" }}>
//         {/* {" " */}
//         Manish chhetri
//       </div>
//       <div
//         style={{
//           border: "10px solid yellow",
//           height: "200px",
//           width: "200px",
//           borderRadius: "3px",
//           backgroundColor: "red",
//         }}
//       >
//         {getClickMe()}
//       </div>
//     </>
//   );
// };

const App = () => {
  return (
    <>
      <div className="ui container comments" style={{ fontSize: "35px" }}>
        <CommentDetail
          author="Manish Chhetri"
          comment="Its is nice"
          date={"Today 9:30 pm"}
        />
        <CommentDetail
          author="Alex Chhetri"
          comment="very good"
          date={"yesterday 11:20pm"}
        />
        <CommentDetail
          author="Mandip  poudel"
          comment="I like it"
          date={"Just now "}
        />
      </div>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
