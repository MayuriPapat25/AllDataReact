import React, { useState } from 'react';
import { X } from 'lucide-react';
import InputFieldWithoutBorder from '../../../shared/ui/InputField/InputFieldWithoutBorder';
import { Button } from '../../../shared/ui/Buttons/Button';

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

  const handleSubmitRequest = () => {
    console.log("Submitting removal request:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      phoneNumber: "",
      email: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex w-max-[1000px] mx-auto items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="relative rounded-lg shadow-lg bg-white w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="h3 text-primary pr-8 font-normal" style={{ fontWeight: 500 }}>{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 w-[60%] mx-auto">
          <p className="text-sm text-gray-600">
            {desc1}
          </p>

          <p className="text-sm text-gray-600">
            {desc2}
            <br />
            <span className="text-xs text-gray-500">{requiredMessage}</span>
          </p>

          <div className="text-right">
            <span className="text-gray-500">=Required Fields</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <InputFieldWithoutBorder
              label="First Name"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full"
            />

            <InputFieldWithoutBorder
              label="Last Name"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full"
            />

            <InputFieldWithoutBorder
              label="Title"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full"
            />

            <InputFieldWithoutBorder
              label="Phone Number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full"
            />

            <InputFieldWithoutBorder
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
        <div className="flex gap-3 pt-4 w-[80%] mx-auto">
          <Button
            variant="outline"
            className="btn btn-primary w-1/2"
            size="sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="btn btn-primary w-1/2"
            size="sm"
            onClick={handleSubmitRequest}
          >
            SUBMIT REQUEST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountClosureModal;