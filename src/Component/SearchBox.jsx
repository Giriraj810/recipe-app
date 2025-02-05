import PropTypes from "prop-types"
import  { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="search-container flex justify-center items-center py-8">
      <form className="search-form relative w-full max-w-md" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="search-input w-full px-4 py-3 rounded-full shadow-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-all"
        />
        <button
          type="submit"
          className="search-button absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-all btn btn-outline-primary ms-2"
          
            style={{
              transition: "all 0.3s ease",
              transform: "scale(1.05)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); 
                handleSearch(e); // Call search function
              }
            }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBox;
