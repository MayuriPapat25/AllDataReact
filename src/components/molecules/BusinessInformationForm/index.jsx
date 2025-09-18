"use client";

import React from "react";

import { useState } from "react";
import { InputField } from "../../atoms/InputField";
import { SelectField } from "../../atoms/SelectField";
import { PhoneField } from "../../atoms/PhoneNumberField";
import { VatField } from "../../atoms/VatField";
import { Button } from "../../atoms/Buttons/Button"

const phoneTypeOptions = [
  { value: "home", label: "Home" },
  { value: "mobile", label: "Mobile" },
  { value: "work", label: "Work" },
  { value: "fax", label: "Fax" },
];

const jobTitleOptions = [
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "owner", label: "Owner" },
  { value: "employee", label: "Employee" },
  { value: "other", label: "Other" },
];

const shopTypeOptions = [
  { value: "public-sector", label: "Public Sector" },
  { value: "private-sector", label: "Private Sector" },
  { value: "non-profit", label: "Non-Profit" },
  { value: "retail", label: "Retail" },
  { value: "wholesale", label: "Wholesale" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "german", label: "German" },
  { value: "french", label: "French" },
  { value: "spanish", label: "Spanish" },
  { value: "italian", label: "Italian" },
];

export function BusinessInformationForm() {
  const [formData, setFormData] = useState({
    businessName: "test",
    phoneNumber: "9999989969",
    phoneType: "home",
    firstName: "Hinal",
    lastName: "Modi",
    jobTitle: "manager",
    shopType: "public-sector",
    vat: "",
    purchaseOrderRef: "",
    language: "english",
  });

  const [errors, setErrors] = useState({});
  const [setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business/Shop Name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Business Phone Number is required";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.phoneType) {
      newErrors.phoneType = "Business Phone Type is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.jobTitle) {
      newErrors.jobTitle = "Job Title is required";
    }

    if (!formData.shopType) {
      newErrors.shopType = "Shop Type is required";
    }

    if (!formData.language) {
      newErrors.language = "Preferred Language is required";
    }

    if (formData.vat && !/^[A-Z]{2}[0-9A-Z]{2,12}$/.test(formData.vat)) {
      newErrors.vat = "Please enter a valid VAT ID (e.g., DE123456789)";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      // Handle successful form submission here
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg border">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          BUSINESS INFORMATION
        </h2>
        <p className="text-sm text-muted-foreground">| = Fields are Required</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business/Shop Name */}
        <InputField
          label="Business/Shop Name"
          required
          value={formData.businessName}
          onChange={(e) => handleInputChange("businessName", e.target.value)}
          error={errors.businessName}
        />

        {/* Phone Number and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneField
            label="Business Phone Number"
            required
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            error={errors.phoneNumber}
          />
          <SelectField
            label="Business Phone Type"
            required
            options={phoneTypeOptions}
            value={formData.phoneType}
            onChange={(e) => handleInputChange("phoneType", e.target.value)}
            error={errors.phoneType}
          />
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            required
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            required
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={errors.lastName}
          />
        </div>

        {/* Job Title and Shop Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Job Title"
            required
            options={jobTitleOptions}
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            error={errors.jobTitle}
          />
          <SelectField
            label="Shop Type"
            required
            options={shopTypeOptions}
            value={formData.shopType}
            onChange={(e) => handleInputChange("shopType", e.target.value)}
            error={errors.shopType}
          />
        </div>

        {/* VAT */}
        <VatField
          label="VAT"
          optional
          placeholder="ENTER VAT ID"
          value={formData.vat}
          onChange={(e) => handleInputChange("vat", e.target.value)}
          error={errors.vat}
        />

        {/* Purchase Order Reference Number */}
        <InputField
          label="Purchase Order Reference Number"
          optional
          placeholder="ENTER PURCHASED ORDER REFERENCE"
          value={formData.purchaseOrderRef}
          onChange={(e) =>
            handleInputChange("purchaseOrderRef", e.target.value)
          }
        />

        {/* Preferred Language */}
        <SelectField
          label="Preferred Language For Communication"
          required
          options={languageOptions}
          value={formData.language}
          onChange={(e) => handleInputChange("language", e.target.value)}
          error={errors.language}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" variant="primary" size="md" className="w-full">
            Submit Business Information
          </Button>
        </div>
      </form>
    </div>
  );
}
