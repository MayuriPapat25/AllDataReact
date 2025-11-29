import React, { useState } from 'react';
import { X } from 'lucide-react';
import InputField from '../../../shared/ui/InputField/index';
import { Button } from '../../../shared/ui/Buttons/Button';

const AccountUpdateModal = ({ isOpen, onClose, title, desc1, desc2 }) => {

  const [formData, setFormData] = useState({
    companyName: "",
    streetAddress: "",
    unitSuiteApartment: "",
    city: "",
    state: "",
    zipCode: "",
    billingAddressSame: true,
    mailingAddressSame: true,
    accountPhoneNumber: "",
  });

  const handleInputFieldBlur = (field) => (e) => {
    // Validation logic can be added here
    console.log(`Field ${field} blurred with value:`, e.target.value);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close modal
    setFormData({
      companyName: "",
      streetAddress: "",
      unitSuiteApartment: "",
      city: "",
      state: "",
      zipCode: "",
      billingAddressSame: true,
      mailingAddressSame: true,
      accountPhoneNumber: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {title || "Request to Update Account Details"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Account Details cannot be changed without a request approval.
            </p>
            <p className="text-sm text-gray-600">
              Please allow 24-48 hours for Account information to be reviewed and updated. An Account Executive may reach out to confirm changes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Information Section */}
          <div>
            <h2 className="text-md mb-4">Account Information</h2>

            <div className="grid grid-cols-1 gap-4">
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <InputField
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Tea Shop"
                  className="w-full"
                />
              </>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shop Address
                </label>
                <div className="space-y-2">
                  <InputField
                    id="streetAddress"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                    placeholder="5001 E Adams St"
                    className="w-full"
                  />
                  <InputField
                    id="unitSuiteApartment"
                    value={formData.unitSuiteApartment}
                    onChange={(e) => handleInputChange("unitSuiteApartment", e.target.value)}
                    placeholder="Unit, Suite, Apartment, etc."
                    className="w-full"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <InputField
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Bay Saint Louis"
                      className="w-full"
                    />
                    <InputField
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="MS"
                      className="w-full"
                    />
                    <InputField
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="39520-4573"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <h2 className="text-md">Billing Address</h2>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="billingAddressSame"
                  checked={formData.billingAddressSame}
                  onChange={(e) => handleInputChange("billingAddressSame", e.target.checked)}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="billingAddressSame" className="text-gray-600 text-sm">
                  My billing address is the same as my shop address.
                </label>
              </div>

              {/* Show billing address form when checkbox is unchecked */}
              {!formData.billingAddressSame && (
                <div className="space-y-4">
                  {/* Street Address */}
                  <InputField
                    label="Street Address"
                    id="billingStreetAddress"
                    value={formData.billingStreetAddress || ""}
                    onChange={(e) => handleInputChange("billingStreetAddress", e.target.value)}
                    onBlur={handleInputFieldBlur("billingStreetAddress")}
                    className="w-full border-gray-300"
                    placeholder="6011 E ADAMS ST 123 BLOCK A"
                    disabled={true}
                  />

                  {/* Unit, Suite, Apartment */}
                  <InputField
                    label="Unit, Suite, Apartment, etc."
                    id="billingUnit"
                    value={formData.billingUnit || ""}
                    onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                    className="w-full border-gray-300"
                    optional={true}
                    disabled={true}
                  />

                  {/* City */}
                  <InputField
                    label="City"
                    id="billingCity"
                    value={formData.billingCity || ""}
                    onChange={(e) => handleInputChange("billingCity", e.target.value)}
                    onBlur={handleInputFieldBlur("billingCity")}
                    className="w-full border-gray-300"
                    placeholder="BAY SAINT LOUIS"
                    disabled={true}
                  />

                  {/* State and ZIP Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      id="billingCity"
                      value={formData.billingCity || ""}
                      onChange={(e) => handleInputChange("billingCity", e.target.value)}
                      onBlur={handleInputFieldBlur("billingCity")}
                      className="w-full border-gray-300"
                      placeholder="Mississippi"
                      disabled={true}
                    />

                    <InputField
                      label="Zip Code"
                      id="billingZipCode"
                      value={formData.billingZipCode || ""}
                      onChange={(e) => handleInputChange("billingZipCode", e.target.value)}
                      onBlur={handleInputFieldBlur("billingZipCode")}
                      className="w-full border-gray-300"
                      placeholder="39520-8373"
                      disabled={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mailing Address Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Mailing Address</h3>
            {/* Mailing Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">Mailing Address</label>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="mailingAddressSame"
                    checked={formData.mailingAddressSame}
                    onChange={(e) => handleInputChange("mailingAddressSame", e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="mailingAddressSame" className="text-gray-600 text-sm">
                    My mailing address is the same as my shop address.
                  </label>
                </div>

                {/* Show mailing address form when checkbox is unchecked */}
                {!formData.mailingAddressSame && (
                  <div className="space-y-4">
                    {/* Street Address */}
                    <InputField
                      label="Street Address"
                      id="billingStreetAddress"
                      value={formData.billingStreetAddress || ""}
                      onChange={(e) => handleInputChange("billingStreetAddress", e.target.value)}
                      onBlur={handleInputFieldBlur("billingStreetAddress")}
                      className="w-full border-gray-300"
                      placeholder="6011 E ADAMS ST 123 BLOCK A"
                      disabled={true}
                    />

                    {/* Unit, Suite, Apartment */}
                    <InputField
                      label="Unit, Suite, Apartment, etc."
                      id="billingUnit"
                      value={formData.billingUnit || ""}
                      onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                      className="w-full border-gray-300"
                      optional={true}
                      disabled={true}
                    />

                    {/* City */}
                    <InputField
                      label="City"
                      id="billingCity"
                      value={formData.billingCity || ""}
                      onChange={(e) => handleInputChange("billingCity", e.target.value)}
                      onBlur={handleInputFieldBlur("billingCity")}
                      className="w-full border-gray-300"
                      placeholder="BAY SAINT LOUIS"
                      disabled={true}
                    />

                    {/* State and ZIP Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="City"
                        id="billingCity"
                        value={formData.billingCity || ""}
                        onChange={(e) => handleInputChange("billingCity", e.target.value)}
                        onBlur={handleInputFieldBlur("billingCity")}
                        className="w-full border-gray-300"
                        placeholder="Mississippi"
                        disabled={true}
                      />

                      <InputField
                        label="Zip Code"
                        id="billingZipCode"
                        value={formData.billingZipCode || ""}
                        onChange={(e) => handleInputChange("billingZipCode", e.target.value)}
                        onBlur={handleInputFieldBlur("billingZipCode")}
                        className="w-full border-gray-300"
                        placeholder="39520-8373"
                        disabled={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Phone Number
              </label>
              <InputField
                id="accountPhoneNumber"
                value={formData.accountPhoneNumber}
                onChange={(e) => handleInputChange("accountPhoneNumber", e.target.value)}
                placeholder="334-692-7615"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Once submitted you will be unable to make additional changes until your request is processed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            CLOSE
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outline"
            style={{ borderColor: "#f75e00", color: "#f75e00" }}
            className="w-full cursor-pointer hover:bg-orange-50"
          >
            SUBMIT REQUEST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdateModal;