
import { Button } from "../../atoms/Buttons/Button"
import InfoField from "../../atoms/InfoField"



const BillingInformationEdit = ({
    paymentType = "Credit Card",
    name = "Libena Mathew",
    address = {
        street: "Block C-25",
        city: "Ontario",
        postalCode: "NU 1234",
        country: "Canada",
    },
    onEdit,
}) => {
    return (
        <div className="w-full max-w-2xl">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
                <h2 className="text-md">BILLING INFORMATION</h2>
                <Button variant="ghost" size="sm" onClick={onEdit} className="text-primary text-sm font-medium">
                    EDIT
                </Button>
            </div>
            <div className="space-y-6">
                <InfoField label="Payment Type" value={paymentType} />

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
            </div>
        </div>
    )
}

export default BillingInformationEdit