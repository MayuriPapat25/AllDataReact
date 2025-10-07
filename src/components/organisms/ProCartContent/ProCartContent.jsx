import { useState } from "react"
import { RadioButton } from "../../atoms/RadioButton/RadioButton"
import { ProductIcon } from "../../atoms/Icon/Icon"
import { ProductName } from "../../atoms/TextIcon/ProductName"
import { CounterDropdown } from "../../atoms/Dropdown/CounterDropdown"
import { PriceText } from "../../atoms/Price/PriceText"
import { InputWithButton } from "../../atoms/InputField/InputWithButton"
import { Message } from "../../atoms/Message/Message"
import { DeleteIcon, MessageIcon } from "../../atoms/Icon/Icon"
import { LinkButton } from "../../atoms/links/linkButton"
import { Dropdown } from "../../atoms/Dropdown/Dropdown"
import { AccessPointsModal } from "../../molecules/Modal/AccessPointsModal"
import { Button } from "../../atoms/Buttons/Button"
import repairIcon from "../../../assets/images/repair_color.png"

export function ProCartContent() {
  const [paymentFrequency, setPaymentFrequency] = useState("MONTHLY")
  const [subscriptionTerm, setSubscriptionTerm] = useState("12 Months")
  const [promoCode, setPromoCode] = useState("")
  const [showAccessPointsModal, setShowAccessPointsModal] = useState(false)

  const [cartItems, setCartItems] = useState([
    { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 1 },
    { id: "basic-diagnostics", name: "Basic Diagnostics", type: "diagnostics", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Mobile" },
    { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 1 },
    { id: "community", name: "Community", type: "community", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
    { id: "estimator", name: "Estimator", type: "estimator", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
  ])

  const handleAccessPointChange = (itemId, newValue) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, accessPoints: newValue } : item))
  }

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode)
  }

  return (
    <div>
      {/* Messages */}
      <Message type="error" className="mb-3">
        In order to purchase <strong>ALLDATA INSPECTIONS</strong>, you must also purchase{" "}
        <strong>ALLDATA REPAIR</strong> or <strong>ALLDATA COLLISION</strong>
      </Message>
      <Message type="info" className="mb-3">
        <strong>ALLDATA INSPECTIONS</strong> requires <strong>ALLDATA MOBILE</strong>, and it has been added to your cart.
      </Message>
      <Message type="warning" className="mb-3">
        Your Total Due has been updated. Please review your cart before continuing with purchase.
      </Message>
      <Message type="success" className="mb-3">Success text</Message>
      <Message type="default" className="mb-3">Default</Message>

      {/* Payment Frequency */}
      <div className="mb-6 bg-white py-4 px-8 shadow-lg bg-white">
        <div className="flex items-center justify-between">
          <label className="text-md text-black">Payment Frequency</label>
          <div className="flex gap-6">
            <RadioButton
              name="paymentFrequency"
              value="MONTHLY"
              checked={paymentFrequency === "MONTHLY"}
              onChange={setPaymentFrequency}
              label="MONTHLY"
              className="accent-[#f75e00] text-sm text-black"
            />
            <RadioButton
              name="paymentFrequency"
              value="ANNUALLY"
              checked={paymentFrequency === "ANNUALLY"}
              onChange={setPaymentFrequency}
              label="ANNUALLY"
              className="accent-[#f75e00] text-sm text-black"
            />
          </div>
        </div>
      </div>

      {/* Access Points Info */}
      <div className="mb-4 flex justify-end">
        <LinkButton
          onClick={() => setShowAccessPointsModal(true)}
          className="flex items-center text-xs"
        >
          <MessageIcon type="info" className="mr-1" />
          What are Access Points?
        </LinkButton>
      </div>

      {/* Cart Items */}
      <div className="mb-6 shadow-lg bg-white">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className={`py-4 px-8 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
          >
            {/* Desktop */}
            <div className="hidden sm:grid items-center gap-4" style={{ gridTemplateColumns: "1fr 144px 1fr 48px" }}>
              <div className="flex items-center gap-3 text-md">
                <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                <ProductName name={item.name} />
              </div>
              <div className="text-center">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                  className="flex-col"
                  showLabel={true}
                />
              </div>
              <div className="text-right">
                <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
                <div className="text-sm text-gray-600">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
              <div className="flex justify-end">
                <DeleteIcon
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-primary hover:text-error cursor-pointer"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={repairIcon} alt="Repair Color" className="w-[30px]" />
                  <ProductName name={item.name} />
                </div>
                <DeleteIcon
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-400 hover:text-error cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                  className="flex-col"
                  showLabel={true}
                />
                <div className="text-right">
                  <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
                  <div className="text-sm text-gray-500 font-light">
                    {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remove Products */}
      <div className="mb-6 flex justify-end">
        <LinkButton size="sm" className="text-xs" onClick={() => console.log("Remove added products")}>
          Remove Added Products
        </LinkButton>
      </div>

      {/* Pricing Summary */}
      <div className="mb-6 shadow-lg bg-white">
        <div className="space-y-2">
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-4 px-8">
              <PriceText amount={218.0} label="Subscription Subtotal" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-4 px-8">
              <PriceText amount={-12.75} label="Bundle Discount" isDiscount />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-4 px-8">
              <PriceText amount={205.25} label="Total Monthly" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-4 px-8">
              <PriceText amount={205.25} label="Total Due:" isTotal />
              <p className="text-gray-600 text-right mt-1">Taxes Not Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6 bg-white py-4 px-8 flex items-center shadow-lg bg-white">
        <span className="text-md text-black whitespace-nowrap mr-4">
          Add Promo Code
        </span>
        <InputWithButton
          placeholder="ENTER CODE"
          buttonText="APPLY"
          onSubmit={handleApplyPromo}
          className="flex-1 min-w-0"
        />
      </div>

      {/* Subscription Term */}
      <div className="mb-4 shadow-lg bg-white">
        <div className="flex items-center justify-between border-b-2 border-light-smoky-white py-4 px-8 w-full">
          <label className="text-md text-black">Subscription Term</label>
          <Dropdown
            value={subscriptionTerm}
            onValueChange={setSubscriptionTerm}
            options={[
              { value: "3 Months", label: "3 Months" },
              { value: "6 Months", label: "6 Months" },
              { value: "12 Months", label: "12 Months" },
            ]}
            className="max-w-[300px] ml-auto mx-0 mr-0"
          />
        </div>
        <div className="flex items-center justify-between py-4 px-8 w-full">
          <label className="text-black text-md whitespace-nowrap">
            Auto Renewal Date:
          </label>
          <div className="text-md ml-4 text-blck text-right">09/09/2026</div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-gray-600 mb-6">
          *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at checkout.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="btn-full cursor-pointer btn btn-primary"
        >
          CHECKOUT
        </Button>
        <LinkButton variant="ghost" className="w-full text-center">
          Continue Shopping
        </LinkButton>
      </div>

      {/* Access Points Modal */}
      <AccessPointsModal
        isOpen={showAccessPointsModal}
        onClose={() => setShowAccessPointsModal(false)}
      />
    </div>
  )
}
