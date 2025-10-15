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
  const [contactType, setContactType] = useState("home")
  const [showSaveButton, setShowSaveButton] = useState(false);
  const dropdownRef = useRef(null);

  const contactTypeOptions = [
    { value: "home", label: "Home" },
    { value: "mobile", label: "Mobile" },
    { value: "office", label: "Office" },
  ]

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

  const handleContactTypeChange = (value) => {
    setContactType(value)
    if (value !== "home") {
      setShowSave(true)
    }
  }
  return (
    <div className="mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="p-8">
        <h2 className="!text-lg font-bold mb-2 text-foreground">MY PROFILE</h2>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h3 className="!text-sm text-gray-600 mb-6 pb-3 border-b border-gray-200">
            Contact Information
          </h3>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <InputField
              id="firstName"
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <InputField
              id="lastName"
              label="Last Name"
              type="text"
              value={formData.lastName}
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
            <div className="grid grid-cols-3 gap-4">
              <div className='col-span-2'>
                <PhoneField
                  id="contactNumber"
                  label="Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Contact Number"
                />
              </div>
              <div className="pt-8">
                <Dropdown
                  value={contactType}
                  onValueChange={handleContactTypeChange}
                  options={contactTypeOptions}
                  placeholder="-Select-"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Login Information Section */}
        <div>
          <h2 className="text-sm text-gray-600 mb-6 pb-3 border-b border-gray-200">
            Login Information
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Username
              </label>
              <div className="w-full py-2 bg-gray-50 text-gray-700 rounded">
                {formData.username}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="w-full py-2 bg-gray-50 text-gray-700 rounded">
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