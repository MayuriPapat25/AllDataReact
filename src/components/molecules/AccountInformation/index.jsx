import InfoField from "../../atoms/InfoField"

const AccountInformation = ({ email, phoneNumber, subscriptionLength }) => {

    return (
        <div className="w-full max-w-2xl border-b-4 border-gray-300 pb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-wide">ACCOUNT INFORMATION</h2>

            <div className="space-y-6">
                <InfoField label="Primary Email Address" value={email} />

                <InfoField label="Business/Shop Phone Number" value={phoneNumber} />

                <InfoField label="Subscription Length" value={subscriptionLength} />
            </div>
        </div>
    )
}
export default AccountInformation