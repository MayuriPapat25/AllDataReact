import React from 'react'

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
        className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
          isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
        }`}
      >
        {children}
      </button>
    );
  }

  // Default: tab variant
  return (
    <button
      onClick={onClick}
      className={`
        relative px-8 py-4 text-base font-medium transition-all duration-200
        focus:outline-none whitespace-nowrap
        ${isActive 
          ? 'text-gray-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 4\'%3E%3Cpath d=\'M0,4 Q25,0 50,2 Q75,4 100,1 L100,4 Z\' fill=\'%23ff6b35\'/%3E%3C/svg%3E")] after:bg-cover after:bg-no-repeat' 
          : 'text-gray-500 hover:text-gray-700'
        }
      `}
    >
      {children}
    </button>
  );
};
