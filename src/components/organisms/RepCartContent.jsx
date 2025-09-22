import { useState } from "react"
import { RadioButton } from "../atoms/RadioButton/RadioButton"
import { ProductIcon } from "../atoms/Icon/Icon"
import { ProductName } from "../atoms/TextIcon/ProductName"
import { CounterDropdown } from "../atoms/Dropdown/CounterDropdown"
import { PriceText } from "../atoms/Price/PriceText"
import { InfoText } from "../atoms/Info/InfoText"
import { InputWithButton } from "../atoms/InputField/InputWithButton"
import { Message } from "../atoms/Message/Message"
import { DeleteIcon, MessageIcon } from "../atoms/Icon/Icon"
import { LinkButton } from "../atoms/links/linkButton"
import { Dropdown } from "../atoms/Dropdown/Dropdown"
import { AccessPointsModal } from "../molecules/Modal/AccessPointsModal"
import { Button } from "../atoms/Buttons/Button"

export function RepCartContent() {
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
      {/* Payment Frequency */}
      <div className="mb-6 bg-white shadow-sm">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText label="Payment Frequency" value="Monthly" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText label="Subscription Term" value="12 Months" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText label="Auto Renewal Date" value="09/10/2026" />
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
            <div
              className="hidden sm:grid items-center gap-4"
              style={{ gridTemplateColumns: "1fr 144px 1fr" }} // removed delete column
            >
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <ProductIcon type={item.type} />
                <ProductName name={item.name} />
              </div>

              {/* Counter */}
              <div className="text-center">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                />
              </div>

              {/* Price + Info */}
              <div className="text-right">
                <div className="font-medium">${item.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-2">
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <ProductIcon type={item.type} />
                <ProductName name={item.name} />
              </div>

              {/* Counter + Price */}
              <div className="flex items-center justify-between">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                />
                <div className="text-right">
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">
                    {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
            </div>
          </div>
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
      </div>

      {/* Access Points Modal */}
      <AccessPointsModal
        isOpen={showAccessPointsModal}
        onClose={() => setShowAccessPointsModal(false)}
      />
    </div>
  )
}
