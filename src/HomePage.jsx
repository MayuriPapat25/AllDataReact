import CartButtons from "./components/atoms/Buttons/cartButtons";
import { InputField } from "./components/atoms/InputField";
import { PhoneField } from "./components/atoms/PhoneNumberField";
import { SelectField } from "./components/atoms/SelectField";

export default function HomePage() {
  const handleInputChange = (field, value) => {
    console.log("field, value", field, value);
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
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
      />

      <SelectField
        label="Business Type"
        required
        options={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
        ]}
      />

      <CartButtons />
    </div>
  );
}
