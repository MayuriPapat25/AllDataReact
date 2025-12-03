// BillingInformation.jsx
import { useState } from "react";
import { Button } from "../../../shared/ui/Buttons/Button";
import InfoField from "../../../shared/ui/InfoField";
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup";
import { translations } from '../../../shared/translations';
import billingForm from '../../../assets/images/billingform.png'
import { useEffect } from "react";

const BillingInformation = ({
  paymentType = "Credit Card",
  name = "Mayuri Papat",
  address = {
    street: "LA",
    city: "LA",
    postalCode: "12532",
    country: "United State",
  },
  onValidationChange,
  fakeDelayMs = 1500,
}) => {
  const [mode, setMode] = useState("initial");
  const [paymentMethod, setPaymentMethod] = useState("primary");
  const [isLoading, setIsLoading] = useState(false);

  const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

  useEffect(() => {
    // treat initial/read-only as valid, editing as invalid
    const isValid = mode === "initial" || mode === "readonly";
    onValidationChange?.(Boolean(isValid));
  }, [mode, onValidationChange]);

  const handleValidate = async () => {
    setIsLoading(true);
    try {
      if (typeof onValidationChange === "function") {
        onValidationChange(true);
        await maybeDelay(fakeDelayMs);
      }
      setMode("readonly");
    } finally {
      setIsLoading(false);
    }

  };

  const handleEdit = () => {
    setMode("editing");
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      // if needed later: emit updated info to parent
      setMode("readonly");
      await maybeDelay(fakeDelayMs);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-2xl">

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-black animate-spin" />
            <div className="text-black text-lg font-medium">Saving...</div>
          </div>
        </div>
      )}

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
