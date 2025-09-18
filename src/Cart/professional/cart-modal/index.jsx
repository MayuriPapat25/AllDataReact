"use client"

import { useState, useMemo } from "react"
import { X } from "lucide-react"
import { PaymentFrequency } from "../../../components/molecules/payment/payment-frequency"
import { ProductItemList } from "../../../components/molecules/productItem/proProductItem"
import { PriceLine } from "../../../components/atoms/titlePrice/price-line"
import { TermDropdown } from "../../../components/atoms/Dropdown/term-dropdown"
import { CheckoutButton } from "../../../components/atoms/Buttons/checkout-button"
import { PriceWithTax } from "../../../components/atoms/titlePriceTax/price-with-tax"
import { AccessPointModal } from "../../../components/molecules/modal/access-point-modal"
import { RemoveProductsLink } from "../../../components/atoms/links/remove-products-link"
import { WhatAreAccessPointsLink } from "../../../components/atoms/links/what-are-access-points-link"
import { ErrorAlert } from "../../../components/atoms/alert/error-alert"
import { InputWithButton } from "../../../components/atoms/inputWithButton/inputWithButton"

export default function CartSubscriptionPreview({ onClose }) {
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")
  const [showAccessPointModal, setShowAccessPointModal] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [cartUpdated, setCartUpdated] = useState(false)

  const [products, setProducts] = useState([
    {
      id: "inspections",
      name: "Inspections",
      price: 69.0,
      frequency: "Monthly",
    },
    {
      id: "mobile",
      name: "Mobile",
      price: 39.0,
      frequency: "Monthly",
    },
  ])

  const handleRemoveAllProducts = () => {
    setProducts([])
    setCartUpdated(true)
  }

  const conditionalErrors = useMemo(() => {
    const errors = []
    const productIds = products.map((p) => p.id)

    if (productIds.includes("mobile") && !productIds.includes("repair") && !productIds.includes("collision")) {
      errors.push({
        type: "warning",
        message: "In order to purchase ALLDATA MOBILE, you must also purchase ALLDATA REPAIR or ALLDATA COLLISION",
      })
    }

    if (cartUpdated) {
      errors.push({
        type: "warning",
        message: "Your Total Due has been updated. Please review your cart before continuing with purchase.",
      })
    }

    return errors
  }, [products, cartUpdated])

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold text-blue-600">Cart Subscription Preview</h1>
        <button onClick={onClose} className="hover:opacity-70">
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {conditionalErrors.length > 0 && (
          <div className="space-y-3">
            {conditionalErrors.map((error, index) => (
              <ErrorAlert key={index} type={error.type} message={error.message} />
            ))}
          </div>
        )}

        {/* Payment Frequency */}
        <div className="bg-white rounded-lg p-4 shadow">
          <PaymentFrequency value={paymentFrequency} onChange={setPaymentFrequency} />
        </div>

        <WhatAreAccessPointsLink onClick={() => setShowAccessPointModal(true)} />

        {/* Products */}
        <div className="bg-white rounded-lg p-4 shadow">
          <ProductItemList products={products} />
        </div>

        <RemoveProductsLink onRemoveAll={handleRemoveAllProducts} />

        {/* Pricing */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <PriceLine label="Subtotal" amount={108.0} />
          <PriceLine label="Discount" amount={-5.4} />
          <PriceLine label="Total Monthly" amount={102.6} />
          <PriceWithTax totalAmount={102.6} />
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-lg p-4 shadow">
          <InputWithButton value={promoCode} onChange={setPromoCode} />
        </div>

        {/* Term */}
        <div className="bg-white rounded-lg p-4 shadow space-y-2">
          <TermDropdown />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Auto Renewal Date</span>
            <span>09/10/2026</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          *Promotional rate. All rates subject to sales taxes.
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <CheckoutButton />
        <div className="mt-2 text-center">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Access Point Modal */}
      <AccessPointModal isOpen={showAccessPointModal} onClose={() => setShowAccessPointModal(false)} />
    </div>
  )
}
