import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductSingleItem } from "../../../components/molecules/productItem/diyProductItem"
import CheckoutSteps from "../../../components/molecules/CheckoutSteps"
import { Dropdown } from "../../../shared/ui/Dropdown/Dropdown"
import { InputWithButton } from "../../../shared/ui/InputField/InputWithButton"
import { Button } from "../../../shared/ui/Buttons/Button"
import { translations } from "../../../shared/translations"

export default function DiyCartPage({ initialCartItems = null, onContinue }) {
  const navigate = useNavigate()
  const [region, setRegion] = useState("usa")
  const regionOptions = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "eu", label: "European Union" },
  ]

  const [cartItems, setCartItems] = useState(initialCartItems ?? [
    // For testing empty cart, set this array to []
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

  const [value, setValue] = useState("")

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
    navigate("/findvehicle")
    // console.log("Add more vehicles");
    // if (onContinue) {
    //   onContinue(1); // Go back to Step 1 ("Find your vehicle")
    // }
  }

  const handleCheckout = () => {
    navigate('/diycheckout')
  }

  const handleGoHome = () => {
    console.log("Go to ALLDATA DIY Home")
  }

  const steps = [
    { number: 1, label: "Find your vehicle" },
    { number: 2, label: "Pick your plan" },
    { number: 3, label: "Place your order" }
  ]

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode)
  }


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleApplyPromo()
    }
  }


  const handlePromoCodeField = (val) => {
    setValue(val)   // `val` is already the string
    // Show warning message when user starts typing something new
    if (val.trim().length > 0 && !promoCode) {
      setError("Clear or Apply Promo Code before continuing.")
    } else if (val.trim().length === 0) {
      setError("") // Clear when input is cleared
    }
  }
  return (
    <div className=" bg-white px-10 pb-2.5 mx-auto mt-11">
      <div className="text-center mb-8">
        <h1 className="mb-10">{translations?.cart}</h1>
      </div>
      <div className="w-96 mb-5 mx-auto">
        <Dropdown
          label="Region" // no label for inline
          value={region}
          onValueChange={setRegion}
          options={regionOptions}
        />
      </div>
      {cartItems.length === 0 ? (
        // ✅ Empty cart UI
        <div className="text-center pt-2 pb-6">
          <h5 className="mb-12 text-center text-md text-gray-600">
            {translations?.review_diy_subsc}
          </h5>
          <p className="text-gray-600 mb-8">
            {translations?.no_items_in_cart}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleGoHome} variant="outline" size="md">
              `${translations?.alldata_diy}${translations?.home}`
            </Button>
            <Button onClick={handleAddMoreVehicles} variant="outline" size="md">
              {translations?.add_more_vehicles}
            </Button>
          </div>
        </div>
      ) : (
        // ✅ Cart items UI
        <div className="">
          <h5 className="text-md mb-12 text-center text-gray-600">
            {translations?.review_diy_subsc}
          </h5>

          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-4 border-gray-200 text-sm text-gray-500">
            <div className="col-span-1">{translations?.status}</div>
            <div className="col-span-4">{translations?.description}</div>
            <div className="col-span-2">{translations?.expiration}</div>
            <div className="col-span-2">{translations?.plan}</div>
            <div className="col-span-2">{translations?.price}</div>
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
            `${translations?.status_change_account_login}4{translations?.tax_applied_checkout_process}`
          </div>

          {/* Totals + Checkout */}
          <div className="mt-6">
            <div className="flex justify-end">
              <div className="w-full md:w-88">
                <div className="mb-6 py-4 items-center  ">
                  <span className="text-md text-black whitespace-nowrap mr-4">
                    {translations?.add_promo_code}
                  </span>
                  <InputWithButton
                    placeholder={translations?.enter_code}
                    buttonText={translations?.apply}
                    onSubmit={handleApplyPromo}
                    value={value}
                    className="flex-1 min-w-0"
                    handlePromoCodeField={handlePromoCodeField}
                    handleKeyDown={handleKeyDown}
                  />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{translations?.subtotal}:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-h4 font-medium text-primary pt-2">
                    <span>{translations?.total}:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex sm:flex-row mt-6 justify-between">
                  <Button
                    onClick={handleAddMoreVehicles}
                    variant="outline"
                    className="btn btn-secondary text-sm"
                  >
                    {translations?.add_more_vehicles}
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    variant="outline"
                    className="btn btn-secondary text-sm w-[10rem]"
                  >
                    {translations?.checkout}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
