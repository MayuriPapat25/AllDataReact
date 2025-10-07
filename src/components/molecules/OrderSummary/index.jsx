import { useState } from "react"
import { cn } from "../../../../utils/utils"
import ImageTitleValue from "../../atoms/ImageTitleValue"
import TitleValue from "../../atoms/TitleValue"
import PaymentFrequency from "../paymentFrequency"
import repairIcon from "../../../assets/images/repair_color.png"
import { ProductName } from "../../atoms/TextIcon/ProductName"
import { PriceText } from "../../atoms/Price/PriceText"

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
            {/* Subscription Details */}
            {/* <div className="space-y-1">
                {data?.paymentFrequency && <TitleValue title="Payment Frequency" value={data?.paymentFrequency} />}
                {data?.subscriptionTerm && <TitleValue title="Subscription Term" value={data?.subscriptionTerm} />}
                {data?.autoRenewalDate && <TitleValue title="Auto Renewal Date" value={data?.autoRenewalDate} />}
            </div> */}

            {/* Cart Items */}
            <div className="mb-6 bg-white shadow-lg">
                {cartItems.map((item, index) => (
                <div
                    key={item.id}
                    className={`p-4 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
                >
                    {/* Desktop */}
                    <div
                    className="hidden sm:grid items-center gap-4"
                    style={{ gridTemplateColumns: "1fr 144px 1fr" }} // removed delete column
                    >
                    {/* Product Info */}
                    <div className="flex items-center gap-3">
                        <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                        <ProductName name={item.name} />
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
                        <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                        <ProductName name={item.name} />
                    </div>

                    </div>
                </div>
                ))}
            </div>
            {/* Services List */}
            {/* <div className={cn("space-y-1", listClassName)}>
                {data?.services?.length > 0 &&
                    data.services.map((service, index) => {
                        return (
                            <ImageTitleValue
                                key={index}
                                name={service?.name}
                                accessPoints={service?.accessPoints}
                                monthelyPrice={service.monthlyPrice}
                                icon={service.icon}
                                paymentFrequency="Monthly"
                            />
                        )
                    })}
            </div> */}

            {/* Pricing Summary */}
            <div className="mb-6 bg-white shadow-lg">
                <div className="space-y-2">
                <div className="border-b-2 border-light-smoky-white">
                    <div className="p-4">
                    <PriceText amount={218.0} label="Subscription Subtotal" />
                    </div>
                </div>
                <div className="border-b-2 border-light-smoky-white">
                    <div className="p-4">
                    <PriceText amount={205.25} label="Total Monthly" />
                    </div>
                </div>
                <div className="border-b-2 border-light-smoky-white">
                    <div className="p-4">
                    <PriceText amount={-12.75} label="Sales Tax" isDiscount />
                    </div>
                </div>
                <div className="border-b-2 border-light-smoky-white">
                    <div className="p-4">
                    <PriceText amount={205.25} label="Total Due:" isTotal />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
