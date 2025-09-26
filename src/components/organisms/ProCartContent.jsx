import { useState } from "react"
import { RadioButton } from "../atoms/RadioButton/RadioButton"
import { ProductIcon } from "../atoms/Icon/Icon"
import { ProductName } from "../atoms/TextIcon/ProductName"
import { CounterDropdown } from "../atoms/Dropdown/CounterDropdown"
import { PriceText } from "../atoms/Price/PriceText"
import { InputWithButton } from "../atoms/InputField/InputWithButton"
import { Message } from "../atoms/Message/Message"
import { DeleteIcon, MessageIcon } from "../atoms/Icon/Icon"
import { LinkButton } from "../atoms/links/linkButton"
import { Dropdown } from "../atoms/Dropdown/Dropdown"
import { AccessPointsModal } from "../molecules/Modal/AccessPointsModal"
import { Button } from "../atoms/Buttons/Button"

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

      {/* Payment Frequency */}
      <div className="mb-6 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Payment Frequency</label>
          <div className="flex gap-6">
            <RadioButton
              name="paymentFrequency"
              value="MONTHLY"
              checked={paymentFrequency === "MONTHLY"}
              onChange={setPaymentFrequency}
              label="MONTHLY"
              className="accent-[#f75e00]"
            />
            <RadioButton
              name="paymentFrequency"
              value="ANNUALLY"
              checked={paymentFrequency === "ANNUALLY"}
              onChange={setPaymentFrequency}
              label="ANNUALLY"
              className="accent-[#f75e00]"
            />
          </div>
        </div>
      </div>

      {/* Access Points Info */}
      <div className="mb-4 flex justify-end">
        <LinkButton
          size="sm"
          onClick={() => setShowAccessPointsModal(true)}
          className="flex items-center gap-1 font-normal text-[#282970]"
        >
          <MessageIcon type="info" className="w-4 h-4 text-[#282970]" />
          What are Access Points?
        </LinkButton>
      </div>

      {/* Cart Items */}
      <div className="mb-6 bg-white shadow-sm">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className={`p-4 ${index !== cartItems.length - 1 ? "border-b border-[#faf9f9]" : ""}`}
          >
            {/* Desktop */}
            <div className="hidden sm:grid items-center gap-4"
                 style={{ gridTemplateColumns: "1fr 144px 1fr 48px" }}>
              <div className="flex items-center gap-3">
                <ProductIcon type={item.type} />
                <ProductName name={item.name} />
              </div>
              <div className="text-center">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                />
              </div>
              <div className="text-right">
                <div className="font-normal">${item.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500 font-light">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
              <div className="flex justify-end">
                <DeleteIcon
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ProductIcon type={item.type} />
                  <ProductName name={item.name} />
                </div>
                <DeleteIcon
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                />
                <div className="text-right">
                  <div className="font-normal">${item.price.toFixed(2)}</div>
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
        <LinkButton size="sm" onClick={() => console.log("Remove added products")}>
          Remove Added Products
        </LinkButton>
      </div>

      {/* Pricing Summary */}
      <div className="mb-6 bg-white shadow-sm">
        <div className="space-y-2">
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <PriceText amount={218.0} label="Subscription Subtotal" />
            </div>
          </div>
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <PriceText amount={-12.75} label="Bundle Discount" isDiscount />
            </div>
          </div>
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <PriceText amount={205.25} label="Total Monthly" />
            </div>
          </div>
          <div className="border-b-2 border-[#faf9f9]">
            <div className="p-4">
              <PriceText amount={205.25} label="Total Due:" isTotal />
              <p className="text-xs text-gray-500 text-right mt-1">Taxes Not Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6 bg-white p-4 flex items-center shadow-sm">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap mr-4">
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
      <div className="mb-4 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b-2 border-[#faf9f9] p-4 w-full">
          <label className="text-sm font-medium text-gray-700">Subscription Term</label>
          <div className="ml-4">
            <Dropdown
              value={subscriptionTerm}
              onValueChange={setSubscriptionTerm}
              options={[
                { value: "3 Months", label: "3 Months" },
                { value: "6 Months", label: "6 Months" },
                { value: "12 Months", label: "12 Months" },
              ]}
              className="w-32"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 w-full">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Auto Renewal Date:
          </label>
          <div className="flex-1 ml-4 text-gray-900 text-right">09/09/2026</div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-xs text-gray-500 mb-6">
          *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at checkout.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          style={{ borderColor: "#f75e00", color: "#f75e00" }}
          className="w-full cursor-pointer"
        >
          CHECKOUT
        </Button>
        <LinkButton className="w-full text-center">
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
