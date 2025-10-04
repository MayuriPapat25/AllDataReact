import InputField from "./components/atoms/InputField";
import PhoneField from "./components/atoms/PhoneNumberField";
import SelectField from "./components/atoms/SelectField";

import FormFileUpload from './components/atoms/FileUpload'
import { Icon } from './components/atoms/Icon/Icon'
import AccountCreationForm from "./components/molecules/AccountCreationForm";

import OrderSummaryDIY from "./components/molecules/OrderSummaryDIY";
import BillingInfoReview from "./components/atoms/BillingInfoReview";
import BillingInformationEdit from "./components/molecules/BillingInformationEdit";
import OrderSummary from "./components/molecules/OrderSummary";




export default function HomePage() {
  const handleInputChange = (field, value) => {
    console.log("field, value", field, value);
  };

  const variant1Data = {
    paymentFrequency: "MONTHLY",
    subscriptionTerm: "12 MONTHS",
    autoRenewalDate: "09/12/2026",
    services: [
      { name: "ALLDATA COLLISION", accessPoints: 1, monthlyPrice: "$229.00", icon: "/car-icon.png" },
      { name: "ALLDATA COMMUNITY", accessPoints: 1, monthlyPrice: "$0.00", icon: "/community-icon.png" },
      { name: "ALLDATA FIND A FIX", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
      { name: "ESTIMATOR", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
    ],
    subscriptionSubtotal: "$229.00",
    totalMonthly: "$229.00",
    salesTax: "+$0.00",
    totalDueToday: "$229.00",
    isPromotionalRate: false,
  }

  const variant2Data = {
    paymentFrequency: "MONTHLY",
    subscriptionTerm: "12 MONTHS",
    autoRenewalDate: "09/10/2026",
    services: [
      { name: "ALLDATA REPAIR", accessPoints: 5, monthlyPrice: "$209.00", icon: "/repair-icon.png" },
      { name: "ALLDATA MOBILE", accessPoints: 2, monthlyPrice: "$39.00", icon: "/generic-mobile-icon.png" },
      { name: "ESTIMATOR", accessPoints: 5, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
      { name: "ALLDATA COMMUNITY", accessPoints: 5, monthlyPrice: "$0.00", icon: "/community-icon.png" },
      { name: "ALLDATA FIND A FIX", accessPoints: 5, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
      { name: "BASIC DIAGNOSTICS", accessPoints: 2, monthlyPrice: "$0.00", icon: "/diagnostics-icon.png" },
    ],
    subscriptionSubtotal: "$248.00",
    bundleDiscount: "-$12.40",
    discount: "-$9.93",
    totalMonthly: "$225.67",
    totalDueToday: "$225.67",
    isPromotionalRate: true,
  }

  const variant3Data = {
    paymentFrequency: "MONTHLY",
    subscriptionTerm: "12 MONTHS",
    autoRenewalDate: "09/10/2026",
    services: [
      { name: "ALLDATA COLLISION", accessPoints: 1, monthlyPrice: "$229.00", icon: "/car-icon.png" },
      { name: "ALLDATA COMMUNITY", accessPoints: 1, monthlyPrice: "$0.00", icon: "/community-icon.png" },
      { name: "ALLDATA FIND A FIX", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
      { name: "ESTIMATOR", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
    ],
    subscriptionSubtotal: "$229.00",
    totalMonthly: "$229.00",
    salesTax: "+$0.00",
    totalDueToday: "$229.00",
    isPromotionalRate: false,
  }

  const variant4Data = {
    paymentFrequency: "MONTHLY",
    subscriptionTerm: "12 MONTHS",
    autoRenewalDate: "10.09.2026",
    services: [{ name: "ALLDATA REPAIR", accessPoints: 1, monthlyPrice: "€145,00", icon: "/repair-icon.png" }],
    subscriptionSubtotal: "€145,00",
    totalMonthly: "€145,00",
    totalDueToday: "€145,00",
    isPromotionalRate: true,
  }
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

      {/* File Upload */}
      <FormFileUpload
        label="Please Upload Your Tax Exempt Certificate Here"
        onChange={(file) => handleInputChange("certificate", file)}
        accept=".pdf,.jpg,.jpeg,.png"
        helperText="Warning: Reseller Certificate does not qualify for tax exemption."
      />

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
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
      </div>
      <OrderSummaryDIY />
      <BillingInfoReview />
      <BillingInformationEdit onEdit={handleEdit} />
      <h3>Gray color variation</h3>
      <div className="flex">
        <div>
          <div className="bold"><b>Exising color code</b></div>
          <div style={{ background: "#f8f9fa" }}>$gray-100: #f8f9fa </div>
          <div style={{ background: "#f9f9f9" }}>$gray-cool: #f9f9f9</div>
          <div style={{ background: "#fefefe" }}>$smoky-gray: #fefefe</div>
          <div style={{ background: "#f0f0f0" }}>$gray-120: #f0f0f0 </div>
          <div style={{ background: "#e9ecef" }}>$gray-200: #e9ecef </div>
          <div style={{ background: "#d8d8d8" }}>$dark-gray: #d8d8d8 </div>
          <div style={{ background: "#dee2e6" }}>$gray-300: #dee2e6 </div>
          <div style={{ background: "#d2d9e2" }}>$gray-350: #d2d9e2 </div>
          <div style={{ background: "#ced4da" }}>$gray-400: #ced4da </div>
          <div style={{ background: "#adb5bd" }}>$gray-500: #adb5bd </div>
          <div style={{ background: "#76777c" }}>$gray-550: #76777c </div>
          <div style={{ background: "#535459" }}>$light-gray: #535459 </div>
          <div style={{ background: "#6c757d" }}>$gray-600: #6c757d </div>
          <div style={{ background: "#54565a" }}>$gray-650: #54565a </div>
          <div style={{ background: "#495057" }}>$gray-700: #495057 </div>
          <div style={{ background: "#343a40" }}>$gray-800: #343a40 </div>
          <div style={{ background: "#35363a" }}>$gray-850: #35363a </div>
          <div style={{ background: "#212529" }}>$gray-900: #212529 </div>
        </div>
        <div>
          <div className="bold"><b>Tailwind color code</b></div>
          <div className="bg-gray-50">$gray-50 #f9fafb</div>
          <div className="bg-gray-100">$gray-100 #f3f4f6</div>
          <div className="bg-gray-200">$gray-200 #e5e7eb</div>
          <div className="bg-gray-300">$gray-300 #d1d5db</div>
          <div className="bg-gray-400">$gray-400 #9ca3af</div>
          <div className="bg-gray-500 text-white">$gray-500 #6b7280</div>
          <div className="bg-gray-600 text-white">$gray-600 #4b5563</div>
          <div className="bg-gray-700 text-white">$gray-700 #374151</div>
          <div className="bg-gray-800 text-white">$gray-800 #1f2937</div>
          <div className="bg-gray-900 text-white">$gray-900 #111827</div>
          <div className="bg-gray-950 text-white">$gray-950 #030712</div>
        </div>
      </div>
    </div>
  );
}
