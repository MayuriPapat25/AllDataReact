// import { useState } from "react";
import InputField from "./components/atoms/InputField";
import PhoneField from "./components/atoms/PhoneNumberField";
import SelectField from "./components/atoms/SelectField";
// import CheckoutSteps from "./components/atoms/CheckoutSteps";
import FormFileUpload from './components/atoms/FileUpload'
// import AccountSidebar from "./components/molecules/AccountSidebar";
import { Icon } from './components/atoms/Icon/Icon'
// import AccountCreationForm from "./components/molecules/AccountCreationForm";
// import OrderSummary from "./components/molecules/OrderSummary";
// import OrderSummaryCard from "./components/molecules/OrderSummaryCardDIY";
import OrderSummaryDIY from "./components/molecules/OrderSummaryDIY";
import BillingInfoReview from "./components/atoms/BillingInfoReview";
import BillingInformationEdit from "./components/molecules/BillingInformationEdit";




export default function HomePage() {
  const handleInputChange = (field, value) => {
    console.log("field, value", field, value);
  };
  // const [currentStep, setCurrentStep] = useState(1)

  // const handleStepClick = (stepNumber) => {
  //   setCurrentStep(stepNumber)
  // }

  // const handleFormSubmit = (formData) => {
  //   console.log("Form submitted:", formData)
  //   // Handle form submission here
  // }

  // const variant1Data = {
  //   paymentFrequency: "MONTHLY",
  //   subscriptionTerm: "12 MONTHS",
  //   autoRenewalDate: "09/12/2026",
  //   services: [
  //     { name: "ALLDATA COLLISION", accessPoints: 1, monthlyPrice: "$229.00", icon: "/car-icon.png" },
  //     { name: "ALLDATA COMMUNITY", accessPoints: 1, monthlyPrice: "$0.00", icon: "/community-icon.png" },
  //     { name: "ALLDATA FIND A FIX", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //     { name: "ESTIMATOR", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //   ],
  //   subscriptionSubtotal: "$229.00",
  //   totalMonthly: "$229.00",
  //   salesTax: "+$0.00",
  //   totalDueToday: "$229.00",
  //   isPromotionalRate: false,
  // }

  // const variant2Data = {
  //   paymentFrequency: "MONTHLY",
  //   subscriptionTerm: "12 MONTHS",
  //   autoRenewalDate: "09/10/2026",
  //   services: [
  //     { name: "ALLDATA REPAIR", accessPoints: 5, monthlyPrice: "$209.00", icon: "/repair-icon.png" },
  //     { name: "ALLDATA MOBILE", accessPoints: 2, monthlyPrice: "$39.00", icon: "/generic-mobile-icon.png" },
  //     { name: "ESTIMATOR", accessPoints: 5, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //     { name: "ALLDATA COMMUNITY", accessPoints: 5, monthlyPrice: "$0.00", icon: "/community-icon.png" },
  //     { name: "ALLDATA FIND A FIX", accessPoints: 5, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //     { name: "BASIC DIAGNOSTICS", accessPoints: 2, monthlyPrice: "$0.00", icon: "/diagnostics-icon.png" },
  //   ],
  //   subscriptionSubtotal: "$248.00",
  //   bundleDiscount: "-$12.40",
  //   discount: "-$9.93",
  //   totalMonthly: "$225.67",
  //   totalDueToday: "$225.67",
  //   isPromotionalRate: true,
  // }

  // const variant3Data = {
  //   paymentFrequency: "MONTHLY",
  //   subscriptionTerm: "12 MONTHS",
  //   autoRenewalDate: "09/10/2026",
  //   services: [
  //     { name: "ALLDATA COLLISION", accessPoints: 1, monthlyPrice: "$229.00", icon: "/car-icon.png" },
  //     { name: "ALLDATA COMMUNITY", accessPoints: 1, monthlyPrice: "$0.00", icon: "/community-icon.png" },
  //     { name: "ALLDATA FIND A FIX", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //     { name: "ESTIMATOR", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
  //   ],
  //   subscriptionSubtotal: "$229.00",
  //   totalMonthly: "$229.00",
  //   salesTax: "+$0.00",
  //   totalDueToday: "$229.00",
  //   isPromotionalRate: false,
  // }

  // const variant4Data = {
  //   paymentFrequency: "MONTHLY",
  //   subscriptionTerm: "12 MONTHS",
  //   autoRenewalDate: "10.09.2026",
  //   services: [{ name: "ALLDATA REPAIR", accessPoints: 1, monthlyPrice: "€145,00", icon: "/repair-icon.png" }],
  //   subscriptionSubtotal: "€145,00",
  //   totalMonthly: "€145,00",
  //   totalDueToday: "€145,00",
  //   isPromotionalRate: true,
  // }
  const handleEdit = () => {
    console.log("Edit billing information")
  }
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

      {/* <AccountSidebar headline="Account Details" className="sidebar" accountDetails={accountDetails} /> */}

      {/* File Upload */}
      <FormFileUpload
        label="Please Upload Your Tax Exempt Certificate Here"
        onChange={(file) => handleInputChange("certificate", file)}
        accept=".pdf,.jpg,.jpeg,.png"
        helperText="Warning: Reseller Certificate does not qualify for tax exemption."
      />


      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        {/* <CheckoutSteps currentStep={currentStep} onStepClick={handleStepClick} /> */}
      </div>

      {/* 
      <Icon type="cart" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="check" className="w-8 h-8 mb-2 text-[#00a811]" />
      <Icon type="plus" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="refund" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="carFront" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="euro" className="w-8 h-8 mb-2 text-black" />
      <Icon type="doller" className="w-8 h-8 mb-2 text-black" />
      <Icon type="downloadFile" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="cancelSubscription" className="w-8 h-8 mb-2 text-[#1b3e6e]" />
      <Icon type="downArrow" className="w-8 h-8 mb-2 text-orange-300" />
      <Icon type="toggleYes" className="w-8 h-8 mb-2 text-orange-300" />
      <Icon type="toggleNo" className="w-8 h-8 mb-2 text-orange-300" /> */}



      {/* <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Full Account Creation Form</h2>
          <AccountCreationForm variant="full" onSubmit={handleFormSubmit} className="mb-12" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Business Account Creation Form</h2>
          <AccountCreationForm variant="business" onSubmit={handleFormSubmit} className="mb-12" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Email-Only Account Form</h2>
          <AccountCreationForm variant="email" onSubmit={handleFormSubmit} />
        </div>
      </div> */}
      {/* <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Variant 1</h2>
        <OrderSummary data={variant1Data} type="variant1" />
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Variant 2</h2>
        <OrderSummary data={variant2Data} type="variant2" />
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Variant 3</h2>
        <OrderSummary data={variant3Data} type="variant3" />
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Variant 4</h2>
        <OrderSummary data={variant4Data} type="variant4" />
      </div> */}
      <OrderSummaryDIY />
      <BillingInfoReview />
      <BillingInformationEdit onEdit={handleEdit} />
    </div>
  );
}
