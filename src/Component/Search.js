import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState(term);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDebounced(term), 500);
    return () => clearTimeout(timeOutId);
  }, [term]);
  useEffect(() => {
    const search = async () => {
      try {
        const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: debounced,
          },
        });
        if (data.query.search.length === 0) {
          throw new Error("Not found");
        }
        setResults(data.query.search);
      } catch (err) {
        setError(err.message);
      }
    };
    if (debounced) {
      search();
    }
  }, [debounced]);
  const renderResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
        </div>
        <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
      </div>
    );
  });
  return (
    <>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term </label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">
        {results.length > 0 ? renderResults : error}
      </div>
    </>
  );
};
export default Search;
