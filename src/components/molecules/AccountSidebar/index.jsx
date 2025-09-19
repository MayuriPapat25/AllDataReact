import React from 'react'

const AccountSidebar = ({className, headline, accountDetails}) => {
  return (
    <div className={`w-64 bg-gray-50 ${className}`}>
      {/* Account Details Section */}
      <div className="mb-0">
        <div className="bg-slate-700 px-4 py-3">
          <h2 className="text-white text-sm font-medium tracking-wide">{headline}</h2>
        </div>
        <div className="bg-white">
          <nav className="py-2">
            {accountDetails.length > 0 && accountDetails.map((item) => (
              <a 
                key={item.id} 
                href={item.link} 
                className={`block px-4 py-2 text-sm ${item.isActive ? 'text-gray-900 font-semibold bg-gray-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>     
    </div>
  )
}

export default AccountSidebar;