import { InfoText } from "../../../shared/ui/Info/InfoText"

const PaymentFrequency = ({ paymentFrequency, subscriptionTerm, autoRenewalDate }) => {
  return (
    <div className="mb-6 shadow-lg bg-white">
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Payment Frequency" value={paymentFrequency} />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Subscription Term" value={subscriptionTerm} />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Auto Renewal Date" value={autoRenewalDate} />
        </div>
      </div>
    </div>
  )
}


export default PaymentFrequency;