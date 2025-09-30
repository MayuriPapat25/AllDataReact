import React, { useState } from 'react';
import { TabButton } from '../../atoms/TabButton';

export const Tabs = ({ tabs, defaultActiveTab, onTabChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false); // Close dropdown when tab is selected
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const activeTabContent = activeTabData?.content;

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Tabs - Hidden on mobile */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <ul className="horizontal-tabs-list bg-white border-b-2 border-[#faf9f9] flex items-center px-[15%] py-8 m-0 border-0 list-none w-full h-auto clear-both justify-center" data-horizontal-tabs-list="">
          {tabs.map((tab, index) => (
            <li
              key={tab.id}
              className={`horizontal-tab-button horizontal-tab-button-${index} ${index === 0 ? 'first' : ''
                } ${index === tabs.length - 1 ? 'last' : ''} ${activeTab === tab.id ? 'selected' : ''
                } m-0 min-w-20 float-left lg:bg-white lg:flex-1 lg:text-center lg:pt-5 lg:border-b lg:border-gray-300 ${activeTab === tab.id ? 'lg:-mb-1' : ''
                }`}
              tabIndex="-1"
              data-horizontaltabbutton={index}
            >
              <a
                href={`#edit-header-tabs-tabs-${index + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(tab.id);
                }}
                className={`
                    relative block px-12 py-4 text-sm transition-all duration-200
                    focus:outline-none whitespace-nowrap border-b-2 no-underline hover:no-underline
                    ${activeTab === tab.id
                    ? 'text-[#1b3d6e] border-orange-500'
                    : 'text-[#1b3d6e] border-transparent'
                  }
                  `}
              >
                <strong className={activeTab === tab.id ? 'font-bold' : 'font-normal'}>
                  {tab.label}
                </strong>
                <span className="summary"></span>
                {activeTab === tab.id && (
                  <span id="active-horizontal-tab" className="sr-only">
                    (active tab)
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown - Visible only on mobile */}
      <div className="md:hidden relative mb-6">
        <TabButton
          variant="dropdown-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          isOpen={isDropdownOpen}
        >
          {activeTabData?.label || 'Select Tab'}
        </TabButton>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                variant="dropdown-item"
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-6 w-full content">
        {activeTabContent}
      </div>
    </div >
  );
};