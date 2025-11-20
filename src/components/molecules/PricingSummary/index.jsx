import React from 'react'
import { PriceText } from '../../../shared/ui/Price/PriceText'

function PricingSummary({ subscriptionSubtotal, totalMonthly, totalDueToday }) {
    return (
        <div className="mb-6 bg-white shadow-sm">
            <div className="space-y-2">
                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={subscriptionSubtotal} label="Subscription Subtotal" />
                    </div>
                </div>
                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={totalMonthly} label="Total Monthly" />
                    </div>
                </div>
                {/* <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-5 py-6">
                        <PriceText amount={-12.75} label="Sales Tax" isDiscount />
                    </div>
                </div> */}
                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={totalDueToday} label="Total Due:" isTotal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingSummary
