import React, { useState } from 'react'
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
        <nav className="flex justify-center">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                variant="tab"
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown - Visible only on mobile */}
      <div className="md:hidden relative">
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
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};