import { translations } from "../../../shared/translations"
import InfoField from "../../../shared/ui/InfoField"

const AccountInformation = ({ accountData, subscriptionTerm }) => {
    console.log('accountData', accountData)
    return (
        <div className="w-full max-w-2xl border-b-2 border-gray-300 pb-8">
            <h2 className="text-md mb-4">{translations?.account_information}</h2>

            <div className="space-y-6">
                <InfoField label={translations?.primary_email_address} value={accountData?.email} />

                <InfoField label={translations?.business_shop_phone_number} value={accountData?.phone} />

                <InfoField label={translations?.subscription_length} value={subscriptionTerm} />
            </div>
        </div>
    )
}
export default AccountInformation