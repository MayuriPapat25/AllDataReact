import React, { useState, useEffect } from "react";

const AutoCompleteInput = ({ label, value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async (query) => {
    if (query.length < 4) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSuggestions(data.slice(0, 5)); // limit to top 5
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    fetchAddresses(val);
  };

  const handleSelect = (address) => {
    onChange(address.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type="text"
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border p-2 rounded"
      />
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
