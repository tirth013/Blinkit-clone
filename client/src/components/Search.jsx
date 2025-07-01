import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-white border border-[rgb(229,236,245)] rounded-full px-3 py-1 w-full max-w-xs md:max-w-sm shadow focus-within:ring-2 focus-within:ring-yellow-400">
      {/* Animated Placeholder */}
      {value === "" && (
        <span className="absolute left-10 md:left-12 text-gray-400 pointer-events-none select-none">
          <TypeAnimation
            sequence={[
              'Search for products...',
              1200,
              'Fruits, Vegetables, Snacks...',
              1200,
              'Milk, Bread, Beverages...',
              1200,
              'Personal Care, Household...',
              1200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="bg-transparent outline-none text-gray-900 flex-1 px-2 py-1 relative z-10"
        aria-label="Search for products"
      />
      <button
        type="submit"
        className="text-yellow-500 hover:text-yellow-400 text-lg z-10"
        aria-label="Search"
        title="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;