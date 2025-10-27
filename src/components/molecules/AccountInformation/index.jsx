import InfoField from "../../../shared/ui/InfoField"

const AccountInformation = ({ email, phoneNumber, subscriptionLength }) => {

    return (
        <div className="w-full max-w-2xl border-b-2 border-gray-300 pb-8">
            <h2 className="text-md mb-4">ACCOUNT INFORMATION</h2>

            <div className="space-y-6">
                <InfoField label="Primary Email Address" value={email} />

                <InfoField label="Business/Shop Phone Number" value={phoneNumber} />

                <InfoField label="Subscription Length" value={subscriptionLength} />
            </div>
        </div>
    )
}
export default AccountInformation