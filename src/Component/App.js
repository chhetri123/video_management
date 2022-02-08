import React, { useState } from "react";
import Route from "./Route";
import Header from "./Header";
import Accordian from "./Accordion";
import Search from "./Search";
import DropDown from "./DropDown";
import Translate from "./Translate";

const items = [
  {
    title: "What is React js ",
    content: "It is a popular js library use to show content to user",
  },
  {
    title: "What is React js ",
    content: "It is a popular js library use to show content to user",
  },
  {
    title: "What is React js ",
    content: "It is a popular js library use to show content to user",
  },
  {
    title: "What is react js",
    content: "It is a popular js library use to show content to user",
  },
];

const options = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Blue",
    value: "blue",
  },
  {
    label: "The Color Green",
    value: "green",
  },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="ui container">
      <Header />
      <Route path="/">
        <Accordian items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <DropDown
          label="Select a Color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
