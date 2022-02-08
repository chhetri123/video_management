import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";
const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedText(text), 500);
    return () => clearTimeout(timeoutId);
  }, [text]);
  useEffect(() => {
    axios
      .post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: API_KEY,
          },
        }
      )
      .then((res) =>
        setTranslated(res.data.data.translations[0].translatedText)
      );
  }, [language, debouncedText]);
  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};
export default Convert;
