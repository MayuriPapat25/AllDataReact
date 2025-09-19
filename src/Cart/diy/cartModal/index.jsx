import { useState } from "react"
import { Dropdown } from "../../../components/atoms/Dropdown/Dropdown"
import { ProductSingleItem } from "../../../components/molecules/productItem/diyProductItem" // matches your path
import { InputWithButton } from "../../../components/atoms/InputField/InputWithButton" // updated path
import { Button } from "../../../components/atoms/Buttons/Button"
import CheckoutSteps from "../../../components/atoms/CheckoutSteps"

export default function CartPage() {
  const [region, setRegion] = useState("usa")
  const regionOptions = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "eu", label: "European Union" },
  ]
  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode)
  }
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
    <div className="mx-auto">
      <CheckoutSteps currentStep={3} />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">CART</h1>
        <div className="flex justify-center">
          <Dropdown
            label="Region"
            options={regionOptions}
            value={region}
            onValueChange={setRegion}
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <h2 className="text-lg font-semibold mb-6 text-center">
            REVIEW ALLDATA DIY SUBSCRIPTIONS
          </h2>

          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm text-gray-500">
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

        <div className="bg-gray-50">
          <div className="flex justify-end">
            <div className="w-full md:w-80">
              {/* Promo Code */}
              <div className="mb-6 items-center">
                <div className="text-sm mb-2 font-medium text-gray-700 whitespace-nowrap">
                  Add Promo Code
                </div>
                <InputWithButton
                  placeholder="ENTER CODE"
                  buttonText="APPLY"
                  onSubmit={handleApplyPromo}
                  className="flex-1 min-w-0"
                />
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex sm:flex-row gap-4 mt-6 justify-between">
                <Button
                  onClick={handleAddMoreVehicles}
                  variant="outline"
                  size="md"
                >
                  ADD MORE VEHICLES
                </Button>
                <Button
                  onClick={handleCheckout}
                  variant="outline"
                  size="md"
                >
                  CHECKOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
