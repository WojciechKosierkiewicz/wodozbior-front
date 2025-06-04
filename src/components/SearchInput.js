import React, { useState } from "react";
import "../styles/search-input.scss";

function SearchInput({
  value,
  onChange,
  placeholder = "Szukaj...",
  suggestions = [],
  onSuggestionClick,
}) {
  const [open, setOpen] = useState(false);

  const handleChange = (val) => {
    onChange(val);
    setOpen(true);
  };

  const handlePick = (s) => {
    onSuggestionClick?.(s);
    setOpen(false);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTimeout(()=>setOpen(false),120)}
        onFocus={() => suggestions.length && setOpen(true)}
      />
      {open && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            <li key={s} onClick={() => handlePick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
