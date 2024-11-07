import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="px-4 flex items-center border rounded-md transition-all">
      <input
        type="text"
        placeholder="Search"
        className="px-2 py-1.5 w-full text-sm rounded-full focus:outline-none"
      />

      <FiSearch className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
    </div>
  );
};

export default Search;
