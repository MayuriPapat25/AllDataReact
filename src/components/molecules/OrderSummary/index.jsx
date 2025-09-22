import { cn } from "../../../../utils/utils"

const OrderSummary = ({ data, className }) => {
    const {
        paymentFrequency,
        subscriptionTerm,
        autoRenewalDate,
        services,
        subscriptionSubtotal,
        bundleDiscount,
        discount,
        totalMonthly,
        totalDueToday,
        isPromotionalRate = true,
    } = data

    return (
        <div className={cn("w-full max-w-2xl mx-auto p-6 space-y-6", className)}>
            {/* Header */}
            <div className="text-center">
                <h2 className="text-xl font-bold tracking-wide text-foreground">ORDER SUMMARY</h2>
            </div>

            {/* Subscription Details */}
            <div className="space-y-4 border-b border-border pb-6">
                <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Payment Frequency</span>
                    <span className="text-muted-foreground font-medium">{paymentFrequency}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Subscription Term</span>
                    <span className="text-muted-foreground font-medium">{subscriptionTerm}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Auto Renewal Date</span>
                    <span className="text-muted-foreground font-medium">{autoRenewalDate}</span>
                </div>
            </div>

            {/* Services List */}
            <div className="space-y-4">
                {services.map((service) => {
                    // const IconComponent = iconMap[service.icon]
                    // const iconStyles = iconColorMap[service.icon]

                    return (
                        <div key={service.id} className="flex items-center gap-4 py-2">
                            <div
                            // className={cn("w-12 h-12 rounded-full flex items-center justify-center", iconStyles)}
                            >
                                {/* <IconComponent className="w-6 h-6" /> */}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-foreground text-sm sm:text-base">{service.name}</h3>
                                <p className="text-muted-foreground text-sm">Access Points: {service.accessPoints}</p>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-foreground">${service.monthlyPrice.toFixed(2)}</div>
                                <div className="text-muted-foreground text-sm">Monthly</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Subscription Subtotal</span>
                    <span className="text-foreground font-medium">${subscriptionSubtotal.toFixed(2)}</span>
                </div>

                {bundleDiscount > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Bundle Discount</span>
                        <span className="text-foreground font-medium">-${bundleDiscount.toFixed(2)}</span>
                    </div>
                )}

                {discount > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Discount</span>
                        <span className="text-foreground font-medium">-${discount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between items-center border-t border-border pt-3">
                    <span className="text-foreground font-medium">Total Monthly</span>
                    <span className="text-foreground font-medium">
                        ${totalMonthly.toFixed(2)}
                        {isPromotionalRate && "*"}
                    </span>
                </div>
            </div>

            {/* Total Due Today */}
            <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Total Due Today:</span>
                    <span className="text-lg font-bold text-foreground">
                        ${totalDueToday.toFixed(2)}
                        {isPromotionalRate && "*"}
                    </span>
                </div>
            </div>

            {/* Promotional Rate Notice */}
            {isPromotionalRate && (
                <div className="text-center">
                    <p className="text-sm text-red-600">*Promotional rate. All rates subject to applicable sales taxes.</p>
                </div>
            )}
        </div>
    )
}

export default OrderSummary