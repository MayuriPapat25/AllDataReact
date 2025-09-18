
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
import { BillingForm } from './components/molecules/BillingForm'
import BillingInformationWithEdit from './components/molecules/BillInfoWithEdit'

function App() {
  const handleEdit = () => {
    console.log("Edit billing information clicked")
    // Add your edit logic here
  }


  return (
    <div >
      {/* <BillingInformationWithEdit /> */}
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl py-8 bg-[#fafafa] px-20">
          <BillingInformationWithEdit onEdit={handleEdit} />
        </div>
      </div>
    </div>
  )
}

export default App
