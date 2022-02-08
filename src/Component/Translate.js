import React, { useState } from "react";
import DropDown from "./DropDown";
import Convert from "./Convert";
const options = [
  { label: "Afrikaans", value: "af" },
  { label: "Arabic", value: "ar" },
  { label: "India", value: "in" },
  { label: "Nepali", value: "ne" },
];
const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState("");
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label className="label">Enter text</label>
          <input onChange={(e) => setText(e.target.value)} value={text} />
        </div>
      </div>
      <DropDown
        label="Select  a Language"
        selected={language}
        options={options}
        onSelectedChange={setLanguage}
      />
      <hr></hr>

      <h3 className="ui header">Convert to {language.label} Language</h3>
      <Convert language={language} text={text} />
    </div>
  );
};
export default Translate;
