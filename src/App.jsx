
import './App.css'
import { InputField } from './components/InputField/inputField'
import { PhoneField } from './components/PhoneNumberField/phoneNumberField'
import { SelectField } from './components/SelectField/selectField'

function App() {

  const handleInputChange = (field, value) => {
    console.log('field, value', field, value)
    // setFormData((prev) => ({ ...prev, [field]: value }))

    // if (errors[field as keyof ValidationErrors]) {
    //   setErrors((prev) => ({ ...prev, [field]: undefined }))
    // }
  }
  return (
    <div>
      <InputField label="Name" required />
      <PhoneField label="Business Phone Number" required placeholder="9999889889" />
      <PhoneField
            label="Business Phone Number"
            required
            value={9999889889}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            // error={errors.phoneNumber}
          />
      <SelectField label="Business Type" required options={[{ value: '1', label: '1' }, { value: '2', label: '2' }]} />
    </div>
  )
}

export default App
