"use client"

import { useState } from "react"
import { Steps } from "../../components/molecules/steps/cartSteps" // relative path correct
import { AccessPointDropdown } from "../../components/atoms/Dropdown/AccessPointDropdown" // use AccessPointDropdown as RegionDropdown
import { ProductSingleItem } from "../../components/molecules/productItem/diyProductItem" // matches your path
import CartButtons from "../../components/atoms/Buttons/cartButtons" // assuming CartButtons is implemented in LinkButton
import { InputWithButton } from "../../components/atoms/InputField/InputWithButton" // updated path

export default function CartPage() {
  const [region, setRegion] = useState("usa")
  const [promoCode, setPromoCode] = useState("")
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      status: "NEW",
      description: "2022 Audi A5 Quattro Coupe 45 (F5P) L4-2.0L Turbo (DPAA) MHEV",
      expiration: "09/11/2028",
      plan: "1-year",
      price: 29.99,
    },
    {
      id: "2",
      status: "NEW",
      description: "2014 Porsche 911 Carrera 4S Cabriolet (991) F6-3.8L",
      expiration: "09/11/2028",
      plan: "1-year",
      price: 29.99,
    },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)

  const handlePlanChange = (itemId, newPlan) => {
    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, plan: newPlan } : item))
    )
  }

  const handleRemoveItem = (itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
  }

  const handleAddMoreVehicles = () => {
    console.log("Add more vehicles")
  }

  const handleCheckout = () => {
    console.log("Proceed to checkout")
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Steps currentStep={2} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">CART</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <AccessPointDropdown value={region} onValueChange={setRegion} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-6 text-center">
            REVIEW ALLDATA DIY SUBSCRIPTIONS
          </h2>

          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div className="col-span-1">Status</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Expiration</div>
            <div className="col-span-2">Plan</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-1"></div>
          </div>

          {cartItems.map((item) => (
            <ProductSingleItem
              key={item.id}
              status={item.status}
              description={item.description}
              expiration={item.expiration}
              plan={item.plan}
              price={item.price.toFixed(2)}
              onPlanChange={(plan) => handlePlanChange(item.id, plan)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}

          <div className="mt-4 text-xs text-gray-500">
            Status may change upon account login. Taxes will be applied during the checkout process.
          </div>
        </div>

        <div className="bg-gray-50 p-4 md:p-6 border-t">
          <div className="flex justify-end">
            <div className="w-full md:w-80">
              {/* Promo Code */}
              <div className="border-t pt-4 mt-4">
                <div className="text-sm font-medium mb-2">Add Promo Code</div>
                <InputWithButton value={promoCode} onChange={setPromoCode} />
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <CartButtons
                onAddMoreVehicles={handleAddMoreVehicles}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
