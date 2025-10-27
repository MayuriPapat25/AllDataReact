import { useState } from "react"
import { ProductName } from "../../../shared/ui/TextIcon/ProductName"
import { CounterDropdown } from "../../../shared/ui/Dropdown/CounterDropdown"
import { PriceText } from "../../../shared/ui/Price/PriceText"
import { MessageIcon } from "../../../shared/ui/Icon/Icon"
import { LinkButton } from "../../../shared/ui/links/linkButton"
import { AccessPointsModal } from "../../molecules/Modal/AccessPointsModal"
import repairIcon from "../../../assets/images/repair_color.png"
import PaymentFrequency from "../../molecules/paymentFrequency"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../shared/ui/Buttons/Button"

export function RepCartContent() {
  const navigate = useNavigate()
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

  const handleCheckout = () => {
    navigate('/repinitiatedcheckout')
  }

  return (
    <div>
      {/* Payment Frequency */}
      <PaymentFrequency />

      {/* Access Points Info */}
      <div className="mb-4 flex justify-end">
        <LinkButton
          size="sm"
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
            className={`${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
          >
            {/* Desktop */}
            <div
              className="hidden sm:grid items-center gap-4 p-6"
              style={{ gridTemplateColumns: "1fr 144px 144px" }} // removed delete column
            >
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                <ProductName name={item.name} className="text-base" />
              </div>

              {/* Counter */}
              <div className="text-center">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                  showLabel={false}
                />
              </div>

              {/* Price + Info */}
              <div className="text-right">
                <div className="font-medium">${item.price?.toFixed(2) ?? "0.00"}</div>
                <div className="text-sm text-gray-500">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-2">
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                <ProductName name={item.name} />
              </div>

              {/* Counter + Price */}
              <div className="flex items-center justify-between">
                <CounterDropdown
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                  showLabel={false}
                />
                <div className="text-right">
                  <div className="font-medium">${item.price?.toFixed(2) ?? "0.00"}</div>
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
      <div className="mb-6 shadow-lg bg-white">
        <div className="space-y-2">
          <div className="border-b-2 border-light-smoky-white">
            <div className="px-6 py-8">
              <PriceText amount={218.0} label="Subscription Subtotal" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="px-6 py-8">
              <PriceText amount={-12.75} label="Bundle Discount" isDiscount />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="px-6 py-8">
              <PriceText amount={205.25} label="Total Monthly" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="px-6 py-8">
              <PriceText amount={205.25} label="Total Due Today:" isTotal />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-gray-600 mb-6">
          *All rates subject to applicable sales taxes
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pb-5">
        <Button
          variant="outline"
          className="btn btn-primary text-sm"
          onClick={handleCheckout}
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
