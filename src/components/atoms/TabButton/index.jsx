import React from 'react';

export const TabButton = ({
  children,
  isActive,
  onClick,
  variant = "tab", // "tab", "dropdown-toggle", "dropdown-item"
  isOpen = false // for dropdown toggle
}) => {
  if (variant === "dropdown-toggle") {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-gray-900 font-medium">{children}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }

  if (variant === "dropdown-item") {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${isActive ? 'text-primary bg-blue-50' : 'text-gray-700'
          }`}
      >
        {children}
      </button>
    );
  }

  // Default: tab variant - styled to match the image
  return (
    <button
      onClick={onClick}
      className={`
        relative px-12 py-4 text-sm transition-all duration-200
        focus:outline-none whitespace-nowrap border-b-2
        ${isActive
          ? 'text-gray-500 border-orange-500 font-bold'
          : 'text-[#1b3d6e] border-transparent hover:border-gray-300'
        }
      `}
    >
      {children}
    </button>
  );
};