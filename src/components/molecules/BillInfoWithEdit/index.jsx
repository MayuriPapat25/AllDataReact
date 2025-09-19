
export default function BillingInformationWithEdit({
    paymentType = "Credit Card",
    name = "Listina Mathew",
    address = {
        line1: "Block E-23",
        city: "Ontario",
        postalCode: "NU 1234",
        country: "Canada",
    },
    onEdit,
}) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-wide text-muted-foreground uppercase">Billing Information</h2>
                    <button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                        className="self-start sm:self-auto text-sm font-medium bg-transparent"
                    >
                        EDIT
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Payment Type Section */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Payment Type</h3>
                    <p className="text-base text-foreground">{paymentType}</p>
                </div>

                {/* Address Section */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <div className="space-y-1 text-base text-foreground">
                        <p>{name}</p>
                        <p>{address.line1}</p>
                        {address.line2 && <p>{address.line2}</p>}
                        <p>
                            {address.city} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
