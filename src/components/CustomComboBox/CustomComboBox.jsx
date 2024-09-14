import React, { useState } from "react";

const ComboBox = ({ options, onChange }) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedItem(option);
    setQuery(option);
    setIsDropdownOpen(false);
    if (onChange) onChange(option); // Trigger onChange prop
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setQuery("");
    setIsDropdownOpen(true);
    if (onChange) onChange(null); // Clear the selection
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative h-10 rounded-sm w-60">
      <div className="relative">
        <input
          placeholder="--Select--"
          className="block w-full py-3 text-sm border-2 rounded-sm ps-4 pe-9"
          type="text"
          role="combobox"
          aria-expanded={isDropdownOpen}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {query !== "" && (
          <div className="absolute inset-y-0 z-20 flex items-center end-8">
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-500 rounded-full shrink-0 size-6 hover:text-blue-600"
              aria-label="Close"
              onClick={clearSelection}
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </button>
          </div>
        )}
        <div
          className="absolute -translate-y-1/2 top-1/2 end-3"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg
            className="shrink-0 size-3.5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>

      {isDropdownOpen && filteredOptions.length > 0 && (
        <div className="z-50 w-full p-1 mt-1 overflow-hidden overflow-y-auto bg-white border border-gray-200 rounded-lg max-h-60">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="w-full px-4 py-2 text-sm text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100"
              tabIndex={index}
              onClick={() => handleSelect(option)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option}</span>
                {selectedItem === option && (
                  <svg
                    className="shrink-0 size-3.5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
