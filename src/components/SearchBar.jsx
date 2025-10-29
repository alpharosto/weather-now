import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMapPin, FiNavigation } from "react-icons/fi";

export default function SearchBar({ onSearch, onGeo, suggestions = [], recent = [] }) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Search Form */}
      <form
        onSubmit={submit}
        className="flex flex-wrap items-center gap-2 bg-white border border-gray-300 rounded-xl p-2 shadow-sm focus-within:border-gray-400 transition-all"
      >
        {/* Search Icon */}
        <div className="px-3 text-gray-500">
          <FiSearch className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          aria-label="Enter city name"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setShowDropdown(e.target.value.length > 1);
          }}
          placeholder="Search for a city..."
          ref={inputRef}
          className="flex-1 min-w-[180px] bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium py-2"
        />

        {/* My Location Button */}
        <button
          type="button"
          onClick={onGeo}
          className="order-first sm:order-none w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 transition-all"
        >
          <FiNavigation className="w-4 h-4" />
          <span className="sm:block">My Location</span>
        </button>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
        >
          <FiSearch className="w-4 h-4" />
          <span className="sm:block">Search</span>
        </button>
      </form>

      {recent.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {recent.map((r) => (
            <button
              key={r}
              onClick={() => onSearch(r)}
              className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => {
                onSearch(`${s.name}, ${s.country}`);
                setValue(s.name);
                setShowDropdown(false);
              }}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors text-gray-800"
            >
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <FiMapPin className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-500">
                  {s.country} • Lat: {s.lat.toFixed(2)}, Lon: {s.lon.toFixed(2)}
                </p>
              </div>
              <FiNavigation className="w-4 h-4 text-gray-400 transform rotate-45" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
