import React, { useState } from 'react';

const AccountSidebar = ({
  className = '',
  sections = [],
  onItemClick = () => { },
  onSectionClick = () => { }
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleSectionClick = (section, sectionIndex) => {
    setActiveSection(sectionIndex);
    setActiveItem(null); // Reset item selection when section is clicked
    onSectionClick(section, sectionIndex);
  };

  const handleItemClick = (item, sectionIndex, itemIndex) => {
    const itemId = `${sectionIndex}-${itemIndex}`;
    setActiveItem(itemId);
    onItemClick(item, sectionIndex, itemIndex);
  };

  return (
    <div className={`w-80 bg-white border-r border-gray-200 ${className}`}>
      {/* Sections */}
      {sections.map((section, sectionIndex) => (
        <div key={section.id || sectionIndex} className="mb-0">
          {/* Section Header */}
          <div
            className={`transition-colors duration-150 ${activeSection === sectionIndex
              ? 'bg-indigo-700'
              : 'bg-white hover:bg-gray-50'
              }`}
          >
            <button
              onClick={() => handleSectionClick(section, sectionIndex)}
              className="w-full text-left px-4 py-3"
            >
              <h2 className={`text-sm font-semibold tracking-wide uppercase ${activeSection === sectionIndex
                ? 'text-white'
                : 'text-gray-600'
                }`}>
                {section.title}
              </h2>
            </button>
          </div>

          {/* Section Items */}
          {section.items && section.items.length > 0 && (
            <div className="bg-gray-50">
              <nav className="py-2">
                {section.items.map((item, itemIndex) => {
                  const itemId = `${sectionIndex}-${itemIndex}`;
                  const isActive = activeItem === itemId || item.isActive;

                  return (
                    <button
                      key={item.id || itemIndex}
                      onClick={() => handleItemClick(item, sectionIndex, itemIndex)}
                      className={`w-full text-left block px-6 py-3 text-sm transition-colors duration-150 ${isActive
                        ? 'text-gray-900 font-medium bg-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountSidebar;