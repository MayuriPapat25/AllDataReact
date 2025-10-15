
import { Button } from "../../../shared/ui/Buttons/Button"
import InfoField from "../../../shared/ui/InfoField"
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup"



const BillingInformation = ({
    paymentType = "Credit Card",
    name = "Libena Mathew",
    address = {
        street: "Block C-25",
        city: "Ontario",
        postalCode: "NU 1234",
        country: "Canada",
    },
    onEdit,
    fromReview,
}) => {
    return (
        <div className="w-full max-w-2xl">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
                <h2 className="text-md">BILLING INFORMATION</h2>
                {
                    fromReview &&
                    <Button variant="ghost" size="sm" onClick={onEdit} className="text-primary text-sm font-medium">
                        EDIT
                    </Button>
                }

            </div>
            <div className="space-y-6">
                {
                    !fromReview &&
                    <>
                        <RadioGroup name="payment-method" value="primary" onValueChange={() => { }} className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <RadioGroupItem value="primary" />
                                <span className="text-sm text-gray-700">CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)</span>
                            </label>
                        </RadioGroup>
                        Billing information iframe
                        <iframe></iframe>
                    </>
                }
                {
                    fromReview && <InfoField label="Payment Type" value={paymentType} />
                }

                {
                    fromReview &&
                    <div className="space-y-2">
                        <label className="block">Address</label>
                        <div className="space-y-1 text-gray-500">
                            <p className="text-sm text-muted-foreground">{name}</p>
                            <p className="text-sm text-muted-foreground">{address.street}</p>
                            <p className="text-sm text-muted-foreground">
                                {address.city} {address.postalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{address.country}</p>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default BillingInformation