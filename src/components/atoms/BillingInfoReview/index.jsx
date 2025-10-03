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
        <div className="border-b-4 border-gray-300 pb-8 max-w-2xl" >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">BILLING INFORMATION</h2>
                <button variant="ghost" size="sm" onClick={onEdit} className="text-gray-500 hover:text-gray-700 font-medium">
                    EDIT
                </button>
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