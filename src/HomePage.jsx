import InputField from "./shared/ui/InputField/index";
import PhoneField from "./shared/ui/PhoneNumberField";
import SelectField from "./shared/ui/SelectField";

import FormFileUpload from './shared/ui/FileUpload'

export default function HomePage() {
  const handleInputChange = (field, value) => {
  };

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

      <h3>Color variables</h3>
      <div>
        <div className="bg-primary">--color-primary: #1b3d6e;</div>
        <div className="bg-primary-dark">--color-primary-dark: #1d3359;</div>
        <div className="bg-primary-light">--color-primary-light: #004987;</div>
        <div className="bg-secondary">--color-secondary: #f16824;</div>
        <div className="bg-success">--color-success: #28a745;</div>
        <div className="bg-info">--color-info: #17a2b8;</div>
        <div className="bg-warning">--color-warning: #ffc107;</div>
        <div className="bg-danger">--color-danger: #dc3545;</div>
        <div className="bg-black">--color-black: #000000;</div>
        <div className="bg-white">--color-white: #ffffff;</div>
        <div className="bg-light-smoky-white">--color-light-smoky-white: #faf9f9;</div>
        <div className="bg-dark-smoky-white">--color-dark-smoky-white: #eeebeb;</div>
        <div className="bg-transparent">--color-transparent: transparent;</div>
        <div className="bg-error">--color-error: #c80e0b;</div>
        <div className="bg-gray">--color-gray: #c8c8c8;</div>
      </div>

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
