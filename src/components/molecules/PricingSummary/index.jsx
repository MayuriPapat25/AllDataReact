import React from 'react'
import { PriceText } from '../../../shared/ui/Price/PriceText'
import { translations } from '../../../shared/translations'

function PricingSummary({ subscriptionSubtotal, totalMonthly, totalDueToday, discount }) {
    return (
        <div className="mb-6 bg-white shadow-sm">
            <div className="space-y-2">
                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={subscriptionSubtotal} label={translations?.subscription_subtotal} />
                    </div>
                </div>
                {
                    discount &&
                    <div className="border-b-2 border-[#faf9f9]">
                        <div className="px-5 py-6">
                            <PriceText amount={discount} label={translations?.bundle_discount || "Discount"} discount />
                        </div>
                    </div>
                }
                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={totalMonthly} label={translations?.total_monthly} />
                    </div>
                </div>

                <div className="border-b-2 border-[#faf9f9]">
                    <div className="px-6 py-8">
                        <PriceText amount={totalDueToday} label={translations?.total_due} isTotal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingSummary
