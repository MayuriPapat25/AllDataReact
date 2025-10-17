import React, { useState } from 'react';
import { TabButton } from '../../../shared/ui/TabButton';

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
      <div className="hidden md:block">
        <ul className="horizontal-tabs-list bg-white border-b-2 borde-light-smoky-white flex items-center px-[15%] m-0 border-0 list-none w-full h-auto clear-both justify-center" data-horizontal-tabs-list="">
          {tabs.map((tab, index) => (
            <li
              key={tab.id}
              className={`horizontal-tab-button horizontal-tab-button-${index} ${index === 0 ? 'first' : ''
                } ${index === tabs.length - 1 ? 'last' : ''} ${activeTab === tab.id ? 'selected' : ''
                } m-0 min-w-20 float-left lg:bg-white lg:flex-1 lg:text-center ${activeTab === tab.id ? 'lg:-mb-1' : ''
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
                style={{ textDecoration: 'none' }}
                className={`
                  relative block px-2 py-4 text-base transition-all duration-200 whitespace-nowrap border-b-2 no-underline hover:no-underline focus:no-underline active:no-underline !hover:no-underline !focus:no-underline !active:no-underline
                  ${activeTab === tab.id
                    ? '!text-gray-600 border-orange-500 border-b-4'
                    : 'text-primary border-transparent'
                  }
                  `}
              >
                <span className={activeTab === tab.id ? '!font-semibold text-h6' : '!font-normal text-h6'}>
                  {tab.label}
                </span>
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
          <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md shadow-lg bg-white z-10">
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