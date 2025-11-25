import { translations } from "../../../shared/translations";
import { InfoText } from "../../../shared/ui/Info/InfoText"

const PaymentFrequency = ({ paymentFrequency, subscriptionTerm, autoRenewalDate }) => {
  return (
    <div className="mb-6 shadow-lg bg-white">
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label={translations?.payment_frequency} value={paymentFrequency} />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label={translations?.subsc_term} value={subscriptionTerm} />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label={translations?.auto_renewal_date} value={autoRenewalDate} />
        </div>
      </div>
    </div>
  )
}


export default PaymentFrequency;