import { useState } from "react"
import { RadioButton } from "../atoms/RadioButton/RadioButton"
import { ProductIcon } from "../atoms/Icon/Icon"
import { ProductName } from "../atoms/TextIcon/ProductName"
import { AccessPointDropdown } from "../atoms/Dropdown/AccessPointDropdown"
import { PriceText } from "../atoms/Price/PriceText"
import { TextField } from "../atoms/InputField/TextField"
import { Button } from "../atoms/Buttons/Button"
import { DropdownSelect } from "../atoms/Dropdown/DropdownSelect"
import { AccessPointsModal } from "../molecules/Modal/AccessPointsModal"

export function CartDropdown({ isOpen, onClose }) {
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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-[480px] bg-white shadow-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-orange-500 flex-shrink-0">
              <h2 className="text-lg font-semibold text-blue-600">Cart Subscription Preview</h2>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                aria-label="Close cart"
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-0"
              >
                ×
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {/* Warning */}
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md flex items-start gap-2">
                  <div className="text-orange-500 mt-0.5">⚠️</div>
                  <p className="text-sm text-orange-800">
                    Your Total Due has been updated. Please review your cart before continuing with purchase.
                  </p>
                </div>

                {/* Payment Frequency */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Frequency</label>
                  <div className="flex gap-6">
                    <RadioButton name="paymentFrequency" value="MONTHLY" checked={paymentFrequency === "MONTHLY"} onChange={setPaymentFrequency} label="MONTHLY" />
                    <RadioButton name="paymentFrequency" value="ANNUALLY" checked={paymentFrequency === "ANNUALLY"} onChange={setPaymentFrequency} label="ANNUALLY" />
                  </div>
                </div>

                {/* Access Points Info */}
                <div className="mb-4 flex justify-end">
                  <Button
                    onClick={() => setShowAccessPointsModal(true)}
                    variant="link"
                    size="sm"
                  >
                    What are Access Points?
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-3">
                        <ProductIcon type={item.type} />
                        <div className="flex flex-col">
                          <ProductName name={item.name} />
                          <AccessPointDropdown value={item.accessPoints} onChange={value => handleAccessPointChange(item.id, value)} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">{item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}</div>
                        </div>
                        <Button
                          onClick={() => handleRemoveItem(item.id)}
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove ${item.name}`}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 flex justify-end">
                  <Button variant="link" size="sm" onClick={() => console.log("Remove added products")}>
                    Remove Added Products
                  </Button>
                </div>

                {/* Pricing Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                  <PriceText amount={218.0} label="Subscription Subtotal" />
                  <PriceText amount={-12.75} label="Bundle Discount" isDiscount />
                  <div className="border-t border-gray-200 pt-2">
                    <PriceText amount={205.25} label="Total Monthly" />
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3">
                    <PriceText amount={205.25} label="Total Due:" isTotal />
                    <p className="text-xs text-gray-500 text-right mt-1">Taxes Not Included</p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add Promo Code</label>
                      <TextField placeholder="ENTER CODE" value={promoCode} onChange={setPromoCode} className="w-full" />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleApplyPromo} variant="outline" size="sm">
                        APPLY
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Subscription Term */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Term</label>
                  <DropdownSelect
                    value={subscriptionTerm}
                    onChange={setSubscriptionTerm}
                    options={[
                      { value: "3 Months", label: "3 Months" },
                      { value: "6 Months", label: "6 Months" },
                      { value: "12 Months", label: "12 Months" },
                    ]}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 space-y-3 flex-shrink-0 bg-white">
              <p className="text-xs text-gray-500">Auto Renewal Date: 09/09/2026</p>
              <p className="text-xs text-gray-500">
                *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at checkout.
              </p>
              <Button variant="primary" size="lg" className="w-full">
                CHECKOUT
              </Button>
              <Button variant="link" size="sm" onClick={onClose} className="block w-full text-center">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AccessPointsModal isOpen={showAccessPointsModal} onClose={() => setShowAccessPointsModal(false)} />
    </>
  )
}
