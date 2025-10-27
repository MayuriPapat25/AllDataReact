import { InfoText } from "../../../shared/ui/Info/InfoText"

const PaymentFrequency = () => {
  return (
    <div className="mb-6 shadow-lg bg-white">
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Payment Frequency" value="Monthly" />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Subscription Term" value="12 Months" />
        </div>
      </div>
      <div className="border-b-2 border-light-smoky-white">
        <div className="px-6 py-8">
          <InfoText label="Auto Renewal Date" value="09/10/2026" />
        </div>
      </div>
    </div>
  )
}


export default PaymentFrequency;