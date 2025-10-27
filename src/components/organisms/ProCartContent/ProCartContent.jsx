import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RadioButton } from "../../../shared/ui/RadioButton/RadioButton"
import { ProductName } from "../../../shared/ui/TextIcon/ProductName"
import { CounterDropdown } from "../../../shared/ui/Dropdown/CounterDropdown"
import { PriceText } from "../../../shared/ui/Price/PriceText"
import { InputWithButton } from "../../../shared/ui/InputField/InputWithButton"
import { Message } from "../../../shared/ui/Message/Message"
import { DeleteIcon, MessageIcon } from "../../../shared/ui/Icon/Icon"
import { LinkButton } from "../../../shared/ui/links/linkButton"
import { Dropdown } from "../../../shared/ui/Dropdown/Dropdown"
import { AccessPointsModal } from "../../molecules/Modal/AccessPointsModal"
import repairIcon from "../../../assets/images/repair_color.png"
import { Button } from "../../../shared/ui/Buttons/Button"

export function ProCartContent({ fromEU }) {
  const navigate = useNavigate()
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

  const handleCheckout = () => {
    console.log('fromEU', fromEU)
    if (!fromEU) {
      navigate('/usanonycheckout')
    } else {
      navigate('/eucheckout')

    }
  }
  return (
    <div data-testid="pro-cart-container">
      {/* Messages */}
      <Message type="error" className="mb-3" data-testid="pro-cart-message-error">
        In order to purchase <strong>ALLDATA INSPECTIONS</strong>, you must also purchase{" "}
        <strong>ALLDATA REPAIR</strong> or <strong>ALLDATA COLLISION</strong>
      </Message>
      <Message type="info" className="mb-3" data-testid="pro-cart-message-info">
        <strong>ALLDATA INSPECTIONS</strong> requires <strong>ALLDATA MOBILE</strong>, and it has been added to your cart.
      </Message>
      <Message type="warning" className="mb-3" data-testid="pro-cart-message-warning">
        Your Total Due has been updated. Please review your cart before continuing with purchase.
      </Message>
      <Message type="success" className="mb-3" data-testid="pro-cart-message-success">Success text</Message>
      <Message type="default" className="mb-3" data-testid="pro-cart-message-default">Default</Message>

      {/* Payment Frequency */}
      <div className="mb-4 bg-white py-6 px-10 shadow-lg" data-testid="pro-cart-payment-frequency">
        <div className="flex items-center justify-between">
          <label className="text-md text-black" data-testid="pro-cart-label-payment-frequency">Payment Frequency</label>
          <div className="flex gap-6">
            <RadioButton
              data-testid="pro-cart-radio-monthly"
              name="paymentFrequency"
              value="MONTHLY"
              checked={paymentFrequency === "MONTHLY"}
              onChange={setPaymentFrequency}
              label="MONTHLY"
              className="accent-[#f75e00] text-sm text-black"
            />
            <RadioButton
              data-testid="pro-cart-radio-annually"
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
      <div className="mb-4 flex justify-end" data-testid="pro-cart-access-points-info">
        <LinkButton
          data-testid="pro-cart-link-access-points"
          onClick={() => setShowAccessPointsModal(true)}
          className="flex items-center text-xs"
        >
          <MessageIcon type="info" className="mr-1" data-testid="message-icon-info" />
          What are Access Points?
        </LinkButton>
      </div>

      {/* Cart Items */}
      <div className="mb-6 shadow-lg bg-white" data-testid="pro-cart-items">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            data-testid={`pro-cart-item-${item.id}`}
            className={`py-6 px-10 mb-1 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
          >
            {/* Desktop */}
            <div className="hidden sm:grid items-center gap-4" style={{ gridTemplateColumns: "1fr 144px 1fr 48px" }}>
              <div className="flex items-center gap-3 text-md">
                <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                <ProductName name={item.name} data-testid={`pro-cart-item-${item.id}-name`} />
              </div>
              <div className="text-center">
                <CounterDropdown
                  data-testid={`pro-cart-item-${item.id}-counter`}
                  value={item.accessPoints}
                  onChange={(value) => handleAccessPointChange(item.id, value)}
                  className="flex-col"
                  showLabel={true}
                />
              </div>
              <div className="text-right">
                <div className="font-normal" data-testid={`pro-cart-item-${item.id}-price`}>${item.price?.toFixed(2) ?? "0.00"}</div>
                <div className="text-sm text-gray-600">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
              <div className="flex justify-end">
                <DeleteIcon
                  data-testid={`pro-cart-item-${item.id}-delete`}
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
                  <div className="text-sm text-gray-500 font-light" data-testid={`price-label-${item.isIncluded ? "included" : "monthly"}`}>
                    {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remove Products */}
      <div className="mb-6 flex justify-end" data-testid="pro-cart-remove-products">
        <LinkButton
          size="sm"
          className="text-xs"
          onClick={() => console.log("Remove added products")}
          data-testid="pro-cart-link-remove"
        >
          Remove Added Products
        </LinkButton>
      </div>

      {/* Pricing Summary */}
      <div className="mb-6 shadow-lg bg-white" data-testid="pro-cart-pricing-summary">
        <div className="space-y-2">
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText amount={218.0} label="Subscription Subtotal" data-testid="pro-cart-price-subtotal" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText amount={-12.75} label="Bundle Discount" isDiscount data-testid="pro-cart-price-discount" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText amount={205.25} label="Total Monthly" data-testid="pro-cart-price-monthly" />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText amount={205.25} label="Total Due:" isTotal data-testid="pro-cart-price-total" />
              <p className="text-gray-600 text-right mt-1" data-testid="pro-cart-label-tax-note">Taxes Not Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6 py-6 px-10 flex items-center shadow-lg bg-white justify-between" data-testid="pro-cart-promo">
        <span className="text-md text-black whitespace-nowrap mr-4" data-testid="pro-cart-label-promo-code">
          Add Promo Code
        </span>
        <InputWithButton
          data-testid="pro-cart-input-promo"
          placeholder="ENTER CODE"
          buttonText="APPLY"
          onSubmit={handleApplyPromo}
          className=""
        />
      </div>

      {/* Subscription Term */}
      <div className="mb-4 shadow-lg bg-white" data-testid="pro-cart-subscription-term">
        <div className="flex items-center justify-between border-b-2 border-light-smoky-white py-6 px-10 w-full mb-1">
          <label className="text-md text-black" data-testid="pro-cart-label-subscription-term">Subscription Term</label>
          <Dropdown
            data-testid="pro-cart-dropdown-term"
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
        <div className="flex items-center justify-between py-6 px-10 w-full">
          <label className="text-black text-md whitespace-nowrap" data-testid="pro-cart-label-auto-renewal-date">
            Auto Renewal Date:
          </label>
          <div className="text-md ml-4 text-blck text-right" data-testid="pro-cart-auto-renewal-date">09/09/2026</div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-gray-600 mb-6">
          *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at checkout.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2" data-testid="pro-cart-actions">
        <Button
          variant="outline"
          className="btn-full cursor-pointer btn btn-primary"
          onClick={handleCheckout}
          data-testid="pro-cart-btn-checkout"
        >
          CHECKOUT
        </Button>
        <LinkButton
          variant="ghost"
          className="w-full text-center"
          data-testid="pro-cart-btn-continue"
        >
          Continue Shopping
        </LinkButton>
      </div>

      {/* Access Points Modal */}
      <AccessPointsModal
        isOpen={showAccessPointsModal}
        onClose={() => setShowAccessPointsModal(false)}
        data-testid="pro-cart-access-modal"
      />
    </div>
  )
}
