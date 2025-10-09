import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PhoneField from '../../atoms/PhoneNumberField';
import InputField from '../../atoms/InputField';
import { Dropdown } from '../../atoms/Dropdown/Dropdown';

const DiyProfileInfo = () => {
  const initialFormData = {
    firstName: 'TestLib',
    lastName: 'TesMath',
    email: 'libbna.mathew@gmail.com',
    contactNumber: '',
    contactType: '',
    username: 'libbna123@',
    password: '••••••••••••••••••'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveButton, setShowSaveButton] = useState(false);
  const dropdownRef = useRef(null);

  const contactTypes = ['Mobile', 'Home', 'Office'];

  const filteredTypes = contactTypes.filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if form has changed
  useEffect(() => {
    const hasChanged =
      formData.firstName !== initialFormData.firstName ||
      formData.lastName !== initialFormData.lastName ||
      formData.email !== initialFormData.email ||
      formData.contactNumber !== initialFormData.contactNumber ||
      formData.contactType !== initialFormData.contactType;

    setShowSaveButton(hasChanged);
  }, [formData]);

  const handleSelectType = (type) => {
    setFormData({ ...formData, contactType: type });
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleSave = () => {
    console.log('Form saved:', formData);
    alert('Profile saved successfully!');
    setShowSaveButton(false);
  };


  const handleInputChange = (field, value) => {
    const sanitizedEvent = sanitizePhoneInput(e)
    const updatedValue = sanitizedEvent.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: updatedValue,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }
  return (
    <div className="mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="p-8">
        <h2 className="!text-lg font-bold mb-2 text-foreground">MY PROFILE</h2>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h3 className="!text-sm text-gray-600 font-semibold mb-6 pb-3 border-b border-gray-200">
            Contact Information
          </h3>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <InputField
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <InputField
              id="lastName"
              label="Last Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <InputField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                helperText=" Used for ALLDATA Communications including Password Reset. Does not change Username."
              />
            </div>
            <div className="flex justify-between items-center">
              {/* <label htmlFor="contactNumber" className="block text-sm text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="flex gap-2">
                <input
                  id="contactNumber"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // remove all non-digits
                    setFormData({ ...formData, contactNumber: value });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div> */}

              <PhoneField
                id="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="Contact Number"
              />
              <div className="w-40">
                <Dropdown
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  options={filteredTypes}
                  placeholder="-Select-"
                />
              </div>
              {/* <div className="relative w-40" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <span className={formData.contactType ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.contactType || '- Select -'}
                  </span>
                  {isDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded shadow-lg bg-white z-10">
                    <input
                      type="text"
                      placeholder=""
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                      autoFocus
                    />
                    <div className="max-h-40 overflow-y-auto">
                      {filteredTypes.length > 0 ? (
                        filteredTypes.map((type) => (
                          <div
                            key={type}
                            onClick={() => handleSelectType(type)}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${type === 'Home' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                              }`}
                          >
                            {type}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-400 text-sm">
                          No results found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Login Information Section */}
        <div>
          <h2 className="text-sm font-semibold mb-6 pb-3 border-b border-gray-200">
            Login Information
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Username
              </label>
              <div className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded">
                {formData.username}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded">
                {formData.password}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {showSaveButton && (
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="btn btn-primary w-1/4"
            // className="px-8 py-2 border-2 border-orange-500 text-orange-500 rounded font-semibold hover:bg-orange-50 transition-colors"
            >
              SAVE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default DiyProfileInfo;