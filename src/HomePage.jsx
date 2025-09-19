import { useState } from "react";
import CartButtons from "./components/atoms/Buttons/cartButtons";
import InputField from "./components/atoms/InputField";
import PhoneField from "./components/atoms/PhoneNumberField";
import SelectField from "./components/atoms/SelectField";
import CheckoutSteps from "./components/atoms/CheckoutSteps";
import FormFileUpload from './components/atoms/FileUpload'
import AccountSidebar from "./components/molecules/AccountSidebar";

export default function HomePage() {
  const handleInputChange = (field, value) => {
    console.log("field, value", field, value);
  };
  const [currentStep, setCurrentStep] = useState(1)

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber)
  }

  const accountDetails = [
    {
      id: 1,
      label: "Account Information",
      link: "#",
      isActive: true,
    },
    {
      id: 2,
      label: "Contact Information",
      link: "#",
      isActive: false,
    },
    {
      id: 3,
      label: "Legal Agreements & Contracts",
      link: "#",
      isActive: false,
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Demo components.</h1>
      <p className="text-gray-600">
        Please fill in your details below. You can also explore DIY Cart or Professional Cart using the navigation.
      </p>

      <InputField label="Name" required />

      <PhoneField label="Business Phone Number" required placeholder="9999889889" />

      <PhoneField
        label="Business Phone Number"
        required
        value={9999889889}
        countryCode="+49"
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
      />

      <SelectField
        label="Business Type"
        required
        options={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
        ]}
        onChange={(e) => handleInputChange("language", e.target.value)}
        className="w-1/6"
      />

      <CartButtons />
      <AccountSidebar headline="Account Details" className="sidebar" accountDetails={accountDetails} />

      {/* File Upload */}
      <FormFileUpload
        label="Please Upload Your Tax Exempt Certificate Here"
        onChange={(file) => handleInputChange("certificate", file)}
        accept=".pdf,.jpg,.jpeg,.png"
        helperText="Warning: Reseller Certificate does not qualify for tax exemption."
      />

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <CheckoutSteps currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

    </div>


  );
}
