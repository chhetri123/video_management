import React, { useState, useEffect } from "react";
import { Search, X, History, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useYoutube } from "../../context/YoutubeContext";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory] = useState(() => {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  });
  const [searchParams] = useSearchParams();
  const { loading } = useYoutube();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) setSearchTerm(query);
  }, [searchParams]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // Save to search history
      const newHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setIsFocused(false);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-6xl">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2 mr-8 group">
          <div className="bg-red-600 w-8 h-8 rounded-md flex items-center justify-center group-hover:bg-red-700 transition-colors">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-white font-semibold text-lg hidden sm:block">
            VideoHub
          </span>
        </a>
      </div>

      <div className="relative flex-1 max-w-xl">
        <form onSubmit={onFormSubmit} className="flex">
          <div className="relative flex flex-1 items-center">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search videos..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full bg-gray-900 border border-gray-700 text-white pl-4 pr-10 py-2.5 
                rounded-l-full focus:outline-none focus:border-blue-500 text-sm transition-all
                placeholder-gray-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 px-6 rounded-r-full border border-l-0 border-gray-700 
              hover:bg-gray-700 transition-colors flex items-center justify-center min-w-[60px]
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="text-gray-300 animate-spin" />
            ) : (
              <Search size={18} className="text-gray-300" />
            )}
          </button>
        </form>

        {/* Search History Dropdown */}
        {isFocused && searchHistory.length > 0 && (
          <div
            className="absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50"
            onMouseDown={(e) => e.preventDefault()}
          >
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(term)}
                className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-gray-800 text-left
                  first:rounded-t-lg last:rounded-b-lg group transition-colors"
              >
                <History
                  size={16}
                  className="text-gray-400 group-hover:text-gray-300"
                />
                <span className="text-gray-300 text-sm">{term}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
