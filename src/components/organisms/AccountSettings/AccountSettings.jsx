import React, { useState } from 'react';
import { InfoText } from '../../atoms/Info/InfoText';
import InputField from '../../atoms/InputField';
import SelectField from '../../atoms/SelectField';
import { PriceText } from '../../atoms/Price/PriceText';
import SavedPaymentMethods from '../SavedPaymentMethods/SavedPaymentMethods';
import { Button } from '../../atoms/Buttons/Button';
import { Icon } from '../../atoms/Icon/Icon';
import AccountClosureModal from '../../molecules/AccountClosureModal';
import UpdateAccoutDetails from '../../molecules/UpdateAccoutDetails';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    companyName: "Test Shop",
    status: "Active",
    shopName: "TEST SHOP",
    streetAddress: "6011 E ADAMS ST 123 BLOCK A",
    unit: "",
    city: "BAY SAINT LOUIS",
    state: "MISSISSIPPI",
    zipCode: "39520-8373",
    phoneNumber: "(228) 467-1234",
    billingAddressSame: true,
    mailingAddressSame: true,
    emailAddress: "admin@gmail.com",
    // Billing address fields
    billingStreetAddress: "",
    billingUnit: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    // Mailing address fields
    mailingStreetAddress: "",
    mailingUnit: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);


  const paymentMethodOptions = [
    { value: '***1111', label: '***1111' },
    { value: '***2222', label: '***2222' },
  ];

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputFieldBlur = (field) => (e) => {
    // Validation logic can be added here
    console.log(`Field ${field} blurred with value:`, e.target.value);
  };

  return (
    <>
      <UpdateAccoutDetails />

      {/* Account Information */}
      <div className="max-w-4xl mx-0 p-6 bg-white">
        <div className="space-y-6">
          {/* Company Name - Read Only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <div className="md:col-span-2">
              <span className="text-gray-900">{formData.companyName}</span>
            </div>
          </div>

          {/* Status - Read Only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <div className="md:col-span-2">
              <span className="text-gray-900">{formData.status}</span>
            </div>
          </div>

          {/* Shop Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium text-gray-700 pt-2">Shop Name</label>
            <div className="md:col-span-2">
              <InputField
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
                className="w-full border-gray-300"
                disabled={true}
              />
            </div>
          </div>

          {/* Shop Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium text-gray-700 pt-2">Shop Address</label>
            <div className="md:col-span-2 space-y-4">
              {/* Street Address */}
              <InputField
                label="Street Address"
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                onBlur={handleInputFieldBlur("streetAddress")}
                className="w-full border-gray-300"
                error={errors.streetAddress}
                disabled={true}
              />

              {/* Unit, Suite, Apartment */}
              <InputField
                label="Unit, Suite, Apartment, etc."
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="w-full border-gray-300"
                optional={true}
                disabled={true}
              />

              {/* City */}
              <InputField
                label="City"
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                onBlur={handleInputFieldBlur("city")}
                className="w-full border-gray-300"
                error={errors.city}
                disabled={true}
              />

              {/* State and ZIP Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full border-gray-300"
                  disabled={true}
                />

                <InputField
                  label="Zip Code"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  onBlur={handleInputFieldBlur("zipCode")}
                  className="w-full border-gray-300"
                  error={errors.zipCode}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium text-gray-700 pt-2">Billing Address</label>
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
      </div>

      {/* Contact Information */}
      <>
        <h1 className='md:my-6'>Contact Information</h1>
        <div className="max-w-4xl mx-auto p-6 bg-white">
          <div className="space-y-6">
            {/* Account Phone No */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">Account Phone Number</label>
              <div className="md:col-span-2">
                <InputField
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  onBlur={handleInputFieldBlur("phoneNumber")}
                  className="w-full border-gray-300"
                  error={errors.phoneNumber}
                  disabled={true}
                />
              </div>
            </div>
            {/* Email Add */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">Email Address</label>
              <div className="md:col-span-2">
                <InputField
                  id="emailAddress"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                  onBlur={handleInputFieldBlur("emailAddress")}
                  className="w-full border-gray-300"
                  error={errors.emailAddress}
                  disabled={true}
                />
              </div>
            </div>
            {/* Business Email Add */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2"> Business Email Address</label>
              <div className="md:col-span-2">
                <InputField
                  id="emailAddress"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                  onBlur={handleInputFieldBlur("emailAddress")}
                  className="w-full border-gray-300"
                  error={errors.emailAddress}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </>


      {/* {Legal Agreements & Contracts} */}
      <>
        <h1 className='md:my-6'>Legal Agreements & Contracts</h1>
        <div className="max-w-4x p-6 bg-white">
          <div className="space-y-6">
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <InfoText
                  label="Recent Subscription Contract"
                  value="Download"
                  link="/path/to/invoice.pdf"
                  billStatus="Signed on September 23, 2025"
                />
              </div>
            </div>
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <InfoText
                  label="Recent Subscription Contract"
                  value="Download"
                  link="/path/to/invoice.pdf"
                  billStatus="Signed on September 23, 2025"
                />
              </div>
            </div>
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <InfoText
                  label="Payment Notifications"
                  billStatus="0 notifications"
                />
              </div>
            </div>
          </div>
        </div>

      </>

      {/* Automatic Payments */}
      <>
        <h1 className='md:my-6'>Automatic Payments</h1>
        <div className="max-w-4xl p-6 bg-white">
          <div className="space-y-6">
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <InfoText
                  label="Automatic Payments"
                  billStatus="Yes"
                />
              </div>
            </div>
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <SelectField
                  label="State"
                  options={paymentMethodOptions}
                  value={formData.state}
                  className="w-1/2 px-4 py-3 border-2 border-gray-300 rounded-none focus:border-blue-500 text-base"
                  disabled={true}
                />
              </div>
            </div>
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <PriceText amount={179.00} label="Payment Amount" />
              </div>
            </div>
            <div className="border-b-2 border-[#faf9f9]">
              <div className="p-4">
                <InfoText
                  label="Payment Frequency"
                  value="Monthly"
                />
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Automatic Payments */}
      <>
        <h1 className='md:my-6'>Saved Payment Methods</h1>
        <div className="max-w-4xl p-6 bg-white">
          <SavedPaymentMethods />
        </div>
      </>

      {/* Billing Cycle */}
      <>
        <h1 className='md:my-6'>Billing Cycle</h1>
        <div className="max-w-4xl p-6 bg-white">
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <InfoText
                label="Invoice Due Date"
                value="23 of the month"
              />
            </div>
          </div>
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <InfoText
                label="Current Billing Cycle"
                value="Sep 23-Oct 22"
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AccountSettings;