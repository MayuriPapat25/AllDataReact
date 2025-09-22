import React from 'react'

export const TabButton = ({ children, isActive, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 text-sm font-medium transition-colors duration-200
        focus:outline-none whitespace-nowrap
        ${isActive 
          ? className ? className  : 'text-blue-600 border-b-2 border-orange-500'
          : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
        }
      `}
    >
      {children}
    </button>
  );
};
