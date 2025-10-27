import { useState } from "react"
import { cn } from "../../../shared/utils/utils"
import PaymentFrequency from "../paymentFrequency"
import PricingSummary from '../PricingSummary/index'
import CartItems from "../CartItems/index"

const OrderSummary = ({ data, className, listClassName, type }) => {
    const showBundleDiscount =
        data?.bundleDiscount && data.bundleDiscount > 0 && (type === "variant2" || type === "variant4")
    const showDiscount = data?.discount && data.discount > 0 && (type === "variant2" || type === "variant4")
    const showSalesTax = data?.salesTax && (type === "variant1" || type === "variant3")
    const showTaxesNotIncluded = type === "variant3" || type === "variant4"
    const showPromotionalRateNotice = data?.isPromotionalRate && (type === "variant2" || type === "variant4")
    const showAllRatesSubjectToSalesTaxNotice = !showPromotionalRateNotice && (type === "variant1" || type === "variant3")

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

    return (
        <div className={cn("w-full max-w-2xl mx-auto", className)}>
            {/* Header */}
            <div className="">
                <h2 className="text-md mb-6">ORDER SUMMARY</h2>
            </div>
            {/* Payment Frequency */}
            <PaymentFrequency />
            {/* Cart Items */}
            <CartItems data={cartItems} />
            {/* Pricing Summary */}
            <PricingSummary />
        </div>
    )
}

export default OrderSummary
