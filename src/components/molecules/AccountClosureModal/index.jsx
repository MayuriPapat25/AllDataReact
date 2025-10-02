import React, { useState } from 'react';
import { X } from 'lucide-react';
import InputField from '../../atoms/InputField';
import { Button } from '../../atoms/Buttons/Button';

const AccountClosureModal = ({ isOpen, onClose, title, desc1, desc2, requiredMessage }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            {desc1}
          </p>

          <p className="text-sm text-gray-600">
            {desc2}
            <br />
            <span className="text-xs text-gray-500">{requiredMessage}</span>
          </p>

          <div className="bg-gray-50 p-3 rounded-md text-center required-text">
            <p className="text-sm text-gray-600">=Required Fields</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <InputField
              label="First Name"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full"
            />

            <InputField
              label="Last Name"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full"
            />

            <InputField
              label="Title"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full"
            />

            <InputField
              label="Phone Number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full"
            />

            <InputField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="example@email.com"
              className="w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <Button
            variant="outline"
            style={{ borderColor: "#f75e00", color: "##1b3d6e" }}
            className="w-full cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            style={{ borderColor: "#f75e00", color: "##1b3d6e" }}
            className="w-full cursor-pointer"
          >
            SUBMIT REQUEST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountClosureModal;