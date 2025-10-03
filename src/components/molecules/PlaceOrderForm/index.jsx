import InfoField from "../../atoms/InfoField"

const PlaceOrderForm = () => {
    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-black mb-2">PLACE ORDER</h1>
                <h2 className="text-lg font-semibold text-gray-700 mb-6">ACCOUNT INFORMATION</h2>

                <div className="space-y-6">
                    <InfoField label="Email Address" value="cidameb2019.knilok.com" />
                    <InfoField label="Phone Number" value="9174287232" />
                </div>
                <hr className="mt-8 border-gray-200" />
            </div>
        </div>
    )
}

export default PlaceOrderForm
