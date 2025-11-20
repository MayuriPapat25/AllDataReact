import { useState } from "react"
import { cn } from "../../../shared/utils/utils"
import PaymentFrequency from "../paymentFrequency"
import PricingSummary from '../PricingSummary/index'
import CartItems from "../CartItems/index"

const OrderSummary = ({ data, className, type }) => {

    return (
        <div className={cn("w-full max-w-2xl mx-auto", className)}>
            {/* Header */}
            <div className="">
                <h2 className="text-md mb-6">ORDER SUMMARY</h2>
            </div>
            {/* Payment Frequency */}
            <PaymentFrequency paymentFrequency={data?.paymentFrequency} subscriptionTerm={data?.subscriptionTerm} autoRenewalDate={data?.autoRenewalDate} />
            {/* Cart Items */}
            <CartItems data={data?.services} />
            {/* Pricing Summary */}
            <PricingSummary subscriptionSubtotal={data?.subscriptionSubtotal} totalMonthly={data?.totalMonthly} totalDueToday={data?.totalDueToday} />
        </div>
    )
}

export default OrderSummary
