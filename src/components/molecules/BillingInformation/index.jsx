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
  onEdit,
  onValidate,
  onUpdate,
  fromReview,
  fromAuth
}) => {
  // mode: 'initial' => show image + Validate button
  //       'readonly' => show readonly info + Edit button
  //       'editing' => show image + Update button (after user clicked Edit)
  const [mode, setMode] = useState(fromReview ? "readonly" : "initial");
  const [paymentMethod, setPaymentMethod] = useState("saved");
  const [autoPayChecked, setAutoPayChecked] = useState(true);


  const handleValidate = () => {
    // external hook
    if (typeof onValidate === "function") onValidate();
    setMode("readonly");
  };

  const handleEdit = () => {
    // If parent wants to handle edit (e.g., navigating to another step), call onEdit.
    if (typeof onEdit === "function" && fromReview) {
      onEdit();
      return;
    }
    // otherwise switch to editing mode locally
    setMode("editing");
  };

  const handleUpdate = () => {
    if (typeof onUpdate === "function") onUpdate();
    setMode("readonly");
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-md">{translations?.billing_information}</h2>
        {
          // When parent provided fromReview, keep the Edit button that calls parent onEdit
          fromReview &&
          <Button variant="ghost" size="sm" onClick={onEdit} className="text-primary text-sm font-medium">
            {translations?.edit}
          </Button>
        }
      </div>

      <div className="space-y-6">

        {/* Payment method selection area (unchanged) */}
        {
          !fromReview &&
          <>
            {
              fromAuth ? (
                <div className="w-full max-w-2xl">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} name="payment-method" className="space-y-4">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="saved" id="saved-payment" />
                      <label htmlFor="saved-payment" className="flex items-center gap-3 cursor-pointer">
                        <span className="text-gray-400 uppercase text-sm font-medium tracking-wide">{translations?.saved_payment_methods}</span>
                        <div className="flex items-center gap-2 bg-blue-700 px-2 py-1 rounded">
                          <span className="text-white font-bold text-xs">VISA</span>
                        </div>
                        <span className="text-gray-400 text-sm tracking-wider">••••4448</span>
                      </label>
                    </div>

                    {mode === "initial" &&
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card-payment" />
                        <label
                          htmlFor="card-payment"
                          className="text-gray-400 uppercase text-sm font-medium tracking-wide cursor-pointer"
                        >
                          {translations?.credit_debit_card}({translations?.automatic_payment})
                        </label>
                      </div>
                    }

                  </RadioGroup>
                </div>
              ) : (
                <>
                  {mode === "initial" &&
                    <RadioGroup name="payment-method" value="primary" onValueChange={() => { }} className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="primary" />
                        <span className="text-sm text-gray-700">{translations?.credit_debit_card}({translations?.automatic_payment})</span>
                      </label>
                    </RadioGroup>
                  }
                </>
              )
            }
          </>
        }
        {
          !fromReview && (
            <>
              {mode === "initial" && (
                <div className="space-y-4">
                  <div className="rounded p-4 bg-white">
                    {/* screenshot preview */}
                    <img
                      src={billingForm}
                      alt="Billing information preview"
                      className="w-full max-w-xl object-contain"
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={handleValidate}
                      className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Validate
                    </Button>
                  </div>
                </div>
              )}

              {mode === "editing" && (
                <div className="space-y-4">
                  <div className=" rounded p-4 bg-white">
                    <RadioGroup name="payment-method" value="primary" onValueChange={() => { }} className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="primary" />
                        <span className="text-sm text-gray-700">{translations?.credit_debit_card}({translations?.automatic_payment})</span>
                      </label>
                    </RadioGroup>
                    <img
                      src={billingForm}
                      alt="Editing billing info"
                      className="w-full max-w-xl object-contain"
                    />
                    {/* In a real integration you might render the interactive iframe/form here */}
                  </div>

                  <div>
                    <Button
                      type="button"
                      onClick={handleUpdate}
                      className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}

              {mode === "readonly" && (
                <div className="space-y-4 flex justify-between">
                  <div>
                    <InfoField label="Payment Type" value={paymentType} />
                    <div className="space-y-2">
                      <label className="block">{translations?.address || "Address"}</label>
                      <div className="space-y-1 text-gray-500">
                        {/* This matches the "readonly info as" layout you requested */}
                        <p className="text-sm text-muted-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground">{address.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.postalCode}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.country}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" onClick={handleEdit}>
                      {translations?.edit || "Edit"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )
        }

        {/* If fromReview is true, show the readonly block (same as you had before) */}
        {
          fromReview && (
            <div className="space-y-2">
              <InfoField label="Payment Type" value={paymentType} />
              <label className="block">{translations?.address}</label>
              <div className="space-y-1 text-gray-500">
                <p className="text-sm text-muted-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{address.street}</p>
                <p className="text-sm text-muted-foreground">
                  {address.city} {address.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">{address.country}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default BillingInformation;
