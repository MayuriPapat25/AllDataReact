import React, { useState } from 'react';
import { ProductInfo } from '../../atoms/ProductInfo';

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

  const addressCard = [
    {
      headerText: "Viewing Shop",
      showDropdown: false,
      productInfo: {
        title: "Downtown Branch",
        description: "456 Oak Street, Nashville, Tennessee, 37201-1234",
        className: "space-y-1",
      },
    },
  ];

  const managerCard = [
    {
      headerText: "Account Manager",
      showDropdown: false,
      productInfo: {
        title: "Ann Watkins",
        description: "ann.watkins@alldata.com 800-829-8727 Option 4",
        className: "space-y-1",
      },
    },
  ];

  return (
    <>
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
                <nav>
                  {section.items.map((item, itemIndex) => {
                    const itemId = `${sectionIndex}-${itemIndex}`;
                    const isActive = activeItem === itemId || item.isActive;

                    return (
                      <button 
                        key={item.id || itemIndex}
                        onClick={() => handleItemClick(item, sectionIndex, itemIndex)}
                        className={`w-full text-left block px-6 py-3 text-sm transition-colors duration-150 border-b border-gray-200 ${isActive
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
      {/* address Card */}
      <div className="mt-12 space-y-8 address-cards">
        {addressCard.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm w-80"
          >
            <div className='border-b border-gray-200'>
              <h4 className='p-4'>{section.headerText}</h4>
            </div>
            <ProductInfo {...section.productInfo} />
          </div>
        ))}
      </div>

      {/* manager Card */}
      <div className="mt-12 space-y-8 address-cards">
        {managerCard.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm w-80"
          >
            <div className='border-b border-gray-200'>
              <h4 className='p-4'>{section.headerText}</h4>
            </div>
            <ProductInfo {...section.productInfo} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountSidebar;