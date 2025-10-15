import { Button } from "../Buttons/Button"

const BillingInfoReview = ({
    name = 'Hinal Modi',
    street = "403 Enterprise St",
    city = "Florence",
    state = "AL",
    zipCode = "35630-5013",
    country = "United States",
    onEdit,
}) => {
    return (
        <div className="border-b-2 border-gray-300 pb-8 max-w-2xl" >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-md">BILLING INFORMATION</h2>
                <Button variant="ghost" onClick={onEdit} className="text-primary text-sm font-medium">
                    EDIT
                </Button>
            </div>

            <div className="space-y-1 text-gray-500">
                <p className="text-sm">{name}</p>
                <p className="text-sm">{street}</p>
                <p className="text-sm">
                    {city}, {state} {zipCode}
                </p>
                <p className="text-sm">{country}</p>
            </div>

        </div>
    )
}

export default BillingInfoReview