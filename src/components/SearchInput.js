import React from "react";
import "../styles/search-input.scss"; 

function SearchInput({ value, onChange, placeholder = "Szukaj..." }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
