import React, { useState } from 'react';
import { ProductInfo } from '../../../shared/ui/ProductInfo';

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
        description: (
          <>
            <a href="mailto:ann.watkins@alldata.com" className="test-primary underline">
              ann.watkins@alldata.com
            </a><br />
            800-829-8727
          </>
        ),
        className: "space-y-1",
      },
    },
  ];


  return (
    <>
      <div>
        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.id || sectionIndex} className={`border-r border-gray-200 mb-8 ${className}`}>
            {/* Section Header */}
            <div
              className={`transition-colors duration-150 ${activeSection === sectionIndex
                ? 'bg-primary'
                : 'bg-white hover:bg-gray-50'
                }`}
            >
              <h2 className={`text-md text-white uppercase bg-primary p-5 font-normal`} style={{ fontWeight: 400 }}>
                {section.title}
              </h2>
            </div>

            {/* Section Items */}
            {section.items && section.items.length > 0 && (
              <div>
                <nav>
                  {section.items.map((item, itemIndex) => {
                    const itemId = `${sectionIndex}-${itemIndex}`;
                    const isActive = activeItem === itemId || item.isActive;

                    return (
                      <button
                        key={item.id || itemIndex}
                        onClick={() => handleItemClick(item, sectionIndex, itemIndex)}
                        className={`w-full text-left block pl-16 pr-6 py-6 text-base font-normal duration-150 text-gray-600 border border-light-smoky-white ${isActive
                          ? ''
                          : ''
                          }`}
                        style={{ fontWeight: 400 }}
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
      <div className="mb-8 space-y-8 address-cards">
        {addressCard.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg"
          >
            <div className='border-2 border-light-smoky-white'>
              <h6 className='text-sm space tracking-wider py-4 px-8 uppercase text-gray-500'>{section.headerText}</h6>
            </div>
            <ProductInfo {...section.productInfo} />
          </div>
        ))}
      </div>

      {/* manager Card */}
      <div className="space-y-8 address-cards">
        {managerCard.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg"
          >
            <div className='border-b border-gray-200'>
              <h6 className='text-sm space tracking-wider py-4 px-8 uppercase text-gray-500'>{section.headerText}</h6>
            </div>
            <ProductInfo {...section.productInfo} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountSidebar;