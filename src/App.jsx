
import './App.css'
import { BusinessInformationForm } from './components/molecules/BusinessInformationForm'
import { InputField } from './components/atoms/InputField'
import { PhoneField } from './components/atoms/PhoneNumberField'
import { SelectField } from './components/atoms/SelectField'
import { VatField } from './components/atoms/VatField'
// import { InputField } from './components/InputField/inputField'
// import { PhoneField } from './components/PhoneNumberField/phoneNumberField'
// import { SelectField } from './components/SelectField/selectField'
import { SubscriptionCard } from './components/molecules/SubscriptionCard'
function App() {


  const jobTitleOptions = [
    { value: "manager", label: "Manager" },
    { value: "director", label: "Director" },
    { value: "owner", label: "Owner" },
    { value: "employee", label: "Employee" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <InputField label="Business/Shop Name" required value="" onChange={() => { }} error="" />
      <PhoneField label="Business Phone Number" required value="" onChange={() => { }} error="" />
      <VatField label="VAT Number" value="" onChange={() => { }} error="" />
      <SelectField label="Job Title" required options={jobTitleOptions} value="" onChange={() => { }} error="" />
      <BusinessInformationForm />
      <div className="container mx-auto max-w-md">
        <SubscriptionCard
          title="ALLDATA DIY"
          description="2018 Audi A3 Sportback e-tron (8VA) L4-1.4L Turbo (CXUA) Plugin Hybrid"
          accessDuration="1 Month Access"
          price="$19.99"
          priceNote="one time charge"
        />
      </div>
    </div>
  )
}

export default App
