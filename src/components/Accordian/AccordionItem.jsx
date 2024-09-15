// components/Accordion/AccordionItem.jsx
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Function to render content as a table
  const renderTable = (data) => {
    const rows = Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <td className="px-4 py-2 font-medium text-gray-600">{key}</td>
        <td className="px-4 py-2 text-gray-900">{value}</td>
      </tr>
    ));

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">{rows}</tbody>
      </table>
    );
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-xl">
        <div className="accordion-item">
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleAccordion}
            >
              <span>{title}</span>
              <svg
                className={`w-3 h-3 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {isOpen && (
            <div className="p-5 border border-gray-200 dark:border-gray-700">
              {renderTable(content)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
