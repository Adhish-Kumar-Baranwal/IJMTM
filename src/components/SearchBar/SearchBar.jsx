import React from "react";
import SearchImg from "../../assets/search.png";

const SearchBar = () => {
  return (
    <form className="w-[600px] relative flex justify-center">
      <div className="relative w-full">
        <input
          type="search"
          placeholder="Search..."
          className="w-full p-4 rounded-full bg-slate-800 text-white"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full text-white">
          <img src={SearchImg} alt="Search" width={18} height={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
