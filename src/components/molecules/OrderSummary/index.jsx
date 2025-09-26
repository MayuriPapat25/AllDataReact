import { cn } from "../../../../utils/utils"
import ImageTitleValue from "../../atoms/ImageTitleValue"
import TitleValue from "../../atoms/TitleValue"

const OrderSummary = ({ data, className, listClassName, type }) => {
    const showBundleDiscount =
        data?.bundleDiscount && data.bundleDiscount > 0 && (type === "variant2" || type === "variant4")
    const showDiscount = data?.discount && data.discount > 0 && (type === "variant2" || type === "variant4")
    const showSalesTax = data?.salesTax && (type === "variant1" || type === "variant3")
    const showTaxesNotIncluded = type === "variant3" || type === "variant4"
    const showPromotionalRateNotice = data?.isPromotionalRate && (type === "variant2" || type === "variant4")
    const showAllRatesSubjectToSalesTaxNotice = !showPromotionalRateNotice && (type === "variant1" || type === "variant3")

    return (
        <div className={cn("w-full max-w-2xl mx-auto", className)}>
            {/* Header */}
            <div className="">
                <h2 className="text-xl font-bold tracking-wide mb-8">ORDER SUMMARY</h2>
            </div>

            {/* Subscription Details */}
            <div className="space-y-1">
                {data?.paymentFrequency && <TitleValue title="Payment Frequency" value={data?.paymentFrequency} />}
                {data?.subscriptionTerm && <TitleValue title="Subscription Term" value={data?.subscriptionTerm} />}
                {data?.autoRenewalDate && <TitleValue title="Auto Renewal Date" value={data?.autoRenewalDate} />}
            </div>

            {/* Services List */}
            <div className={cn("space-y-1", listClassName)}>
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
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-1 mt-1">
                {data?.subscriptionSubtotal && <TitleValue title="Subscription Subtotal" value={data?.subscriptionSubtotal} />}

                {data?.bundleDiscount && <TitleValue title="Bundle Discount" value={data?.bundleDiscount} />}

                {data?.discount && <TitleValue title="Discount" value={data?.discount} />}
                {data?.totalMonthly && (
                    <TitleValue title="Total Monthly" value={data?.totalMonthly} isPromotionalRate={data?.isPromotionalRate} />
                )}
            </div>
            {data?.CurrentTotalMonthlySubtotal && (
                <TitleValue title="Current Monthly Subscription" value={data?.CurrentTotalMonthlySubtotal} />
            )}
            {data?.MonthlySubscriptionSubtotal && (
                <TitleValue title="New Monthly Subscription Subtotal" value={data?.MonthlySubscriptionSubtotal} />
            )}
            {/* sales tax */}
            {showSalesTax && <TitleValue title="Sales Tax" value={data?.salesTax} />}
            {data?.totalDueToday && (
                <ImageTitleValue
                    name="Total Due Today:"
                    monthelyPrice={data?.totalDueToday}
                    paymentFrequency={showTaxesNotIncluded ? "Taxes Not Included" : ""}
                    isPromotionalRate={data?.isPromotionalRate}
                />
            )}
            {data?.CurrentTotalMonthlySubtotal && (
                <ImageTitleValue
                    name="Next Monthly Subscription"
                    monthelyPrice={data?.CurrentTotalMonthlySubtotal}
                    promotionMsg="*Prorated balance will be applied on the next invoice."
                    isPromotionalRate={data?.isPromotionalRate}
                />
            )}
            {/* Promotional Rate Notice */}
            {showPromotionalRateNotice && (
                <p className="text-sm text-gray-600">*Promotional rate. All rates subject to applicable sales taxes.</p>
            )}
            {showAllRatesSubjectToSalesTaxNotice && (
                <p className="text-sm text-gray-600">*All rates subject to applicable sales taxes.</p>
            )}
        </div>
    )
}

export default OrderSummary
