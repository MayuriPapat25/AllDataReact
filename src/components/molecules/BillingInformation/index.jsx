// BillingInformation.jsx
import { useState } from "react";
import { Button } from "../../../shared/ui/Buttons/Button";
import InfoField from "../../../shared/ui/InfoField";
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup";
import { translations } from '../../../shared/translations';
import billingForm from '../../../assets/images/billingform.png'

const BillingInformation = ({
  paymentType = "Credit Card",
  name = "Mayuri Papat",
  address = {
    street: "LA",
    city: "LA",
    postalCode: "12532",
    country: "United State",
  },
  onValidationChange
}) => {
  const [mode, setMode] = useState("initial");
  const [paymentMethod, setPaymentMethod] = useState("primary");

  const handleValidate = () => {
    if (typeof onValidationChange === "function") {
      onValidationChange(true);
    }
    setMode("readonly");
  };

  const handleEdit = () => {
    setMode("editing");
  };

  const handleUpdate = () => {
    // if needed later: emit updated info to parent
    setMode("readonly");
  };


  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-md">{translations?.billing_information}</h2>
        {mode === "readonly" && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            {translations?.edit}
          </Button>
        )}
      </div>

      <div className="space-y-6">

        {/* Payment Method - always visible */}
        {mode !== "readonly" && (
          <RadioGroup
            name="payment-method"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-3"
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="primary" />
              <span className="text-sm text-gray-700">
                {translations?.credit_debit_card} ({translations?.automatic_payment})
              </span>
            </label>
          </RadioGroup>
        )}

        {/* ---------------- INITIAL MODE ---------------- */}
        {mode === "initial" && (
          <div className="space-y-4">
            <div className="rounded p-4 bg-white">
              <img src={billingForm} alt="Billing information preview" className="w-full max-w-xl object-contain" />
            </div>

            <Button
              type="button"
              onClick={handleValidate}
              className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Validate
            </Button>
          </div>
        )}


        {/* ---------------- EDITING MODE ---------------- */}
        {mode === "editing" && (
          <div className="space-y-4">
            <div className="rounded p-4 bg-white">
              <img src={billingForm} alt="Editing billing info" className="w-full max-w-xl object-contain" />
            </div>

            <Button
              type="button"
              onClick={handleUpdate}
              className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </Button>
          </div>
        )}


        {/* ---------------- READONLY MODE ---------------- */}
        {mode === "readonly" && (
          <div >
            <InfoField label="Payment Type" value={paymentType} />
            <label className="block">{translations?.address}</label>

            <div className="space-y-1 text-gray-500">
              <p className="text-sm">{name}</p>
              <p className="text-sm">{address.street}</p>
              <p className="text-sm">
                {address.city}, {address.postalCode}
              </p>
              <p className="text-sm">{address.country}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BillingInformation;
