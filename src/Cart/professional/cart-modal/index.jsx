"use client"

import { useState, useMemo } from "react"
import { X } from "lucide-react"
import { PaymentFrequency } from "../../../components/payment/payment-frequency"
import { ProductItemList } from "../../../components/productItem/product-item-list"
import { PriceLine } from "../../../components/payment/price-line"
import { PromoCode } from "../../../components/promoCode/promo-code"
import { TermDropdown } from "../../../components/Dropdown/term-dropdown"
import { CheckoutButton } from "../../../components/Buttons/checkout-button"
import { PriceWithTax } from "../../../components/payment/price-with-tax"
import { AccessPointModal } from "../../../components/modal/access-point-modal"
import { RemoveProductsLink } from "../../../components/links/remove-products-link"
import { WhatAreAccessPointsLink } from "../../../components/links/what-are-access-points-link"
import { ErrorAlert } from "../../../components/alert/error-alert"

export function CartSubscriptionPreview({ onClose }) {
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")
  const [showAccessPointModal, setShowAccessPointModal] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [cartUpdated, setCartUpdated] = useState(false)

  const [products, setProducts] = useState([
    {
      id: "inspections",
      name: "Inspections",
      icon: "🔍",
      accessPoints: 1,
      price: 69.0,
      frequency: "Monthly",
      requiresProduct: ["mobile", "repair", "collision"],
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: "📱",
      accessPoints: 1,
      price: 39.0,
      frequency: "Monthly",
      requiresProduct: ["repair", "collision"],
    },
    {
      id: "basic-diagnostics",
      name: "Basic Diagnostics",
      icon: "⚡",
      accessPoints: 1,
      price: 0.0,
      frequency: "Included with Mobile",
      isIncluded: true,
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

    if (productIds.includes("inspections") && !productIds.includes("repair") && !productIds.includes("collision")) {
      errors.push({
        type: "warning",
        message:
          "In order to purchase ALLDATA INSPECTIONS, you must also purchase ALLDATA REPAIR or ALLDATA COLLISION",
      })
    }

    if (productIds.includes("inspections") && productIds.includes("mobile")) {
      errors.push({
        type: "info",
        message: "ALLDATA INSPECTIONS requires ALLDATA MOBILE, and it has been added to your cart.",
      })
    }

    if (cartUpdated) {
      errors.push({
        type: "warning",
        message:
          "Your Total Due has been updated. Please review your cart before continuing with purchase.",
      })
    }

    return errors
  }, [products, cartUpdated])

  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-xl">
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="p-4 space-y-5">
          <div className="flex items-center justify-between">
            <h1
              className="text-xl font-medium"
              style={{
                color: "var(--alldata-blue)",
                fontFamily: "var(--font-gotham)",
                fontSize: "20px",
              }}
            >
              Cart Subscription Preview
            </h1>
            <button
              onClick={onClose}
              style={{ color: "var(--alldata-gray-500)" }}
              className="hover:opacity-70"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {conditionalErrors.length > 0 && (
            <div className="space-y-3">
              {conditionalErrors.map((error, index) => (
                <ErrorAlert key={index} type={error.type} message={error.message} />
              ))}
            </div>
          )}

          {/* Payment Frequency */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <PaymentFrequency value={paymentFrequency} onChange={setPaymentFrequency} />
          </div>

          <WhatAreAccessPointsLink onClick={() => setShowAccessPointModal(true)} />

          {/* Product List */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <ProductItemList products={products} />
          </div>

          <RemoveProductsLink onRemoveAll={handleRemoveAllProducts} />

          {/* Price Block */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <div className="space-y-4">
              <PriceLine label="Subscription Subtotal" amount={108.0} />
              <div style={{ borderTop: `1px solid var(--alldata-border)` }} className="pt-4">
                <PriceLine label="Bundle Discount" amount={-5.4} />
              </div>
              <div style={{ borderTop: `1px solid var(--alldata-border)` }} className="pt-4">
                <PriceLine label="Total Monthly" amount={102.6} />
              </div>
              <div style={{ borderTop: `1px solid var(--alldata-border)` }} className="pt-4">
                <PriceWithTax totalAmount={102.6} />
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <PromoCode value={promoCode} onChange={setPromoCode} />
          </div>

          {/* Term + Renewal */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <div className="space-y-4">
              <TermDropdown />
              <div className="flex justify-between items-center text-sm">
                <span
                  style={{
                    color: "var(--alldata-cart-item-title)",
                    fontFamily: "var(--font-gotham)",
                    fontSize: "14px",
                  }}
                >
                  Auto Renewal Date
                </span>
                <span
                  style={{
                    color: "var(--alldata-black-300)",
                    fontFamily: "var(--font-gotham)",
                    fontSize: "14px",
                  }}
                >
                  09/10/2026
                </span>
              </div>
            </div>
          </div>

          <p
            className="text-xs text-center"
            style={{
              color: "var(--alldata-gray-500)",
              fontFamily: "var(--font-gotham)",
              fontSize: "12px",
            }}
          >
            *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at check out.
          </p>

          <CheckoutButton />

          <div className="text-center">
            <button
              onClick={onClose}
              style={{
                color: "var(--alldata-cart-item-description)",
                fontFamily: "var(--font-gotham)",
                fontSize: "14px",
              }}
              className="hover:opacity-80 font-medium"
            >
              Continue Shopping
            </button>
          </div>

          {/* Access Point Modal */}
          <AccessPointModal isOpen={showAccessPointModal} onClose={() => setShowAccessPointModal(false)} />
        </div>
      </div>
    </div>
  )
}
export default CartSubscriptionPreview