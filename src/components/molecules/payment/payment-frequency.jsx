import { HorizontalRadio } from "../../atoms/horizontalRadio/horRadio"

export function PaymentFrequency({ value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <h3
        className="text-sm font-medium"
        style={{ color: "var(--alldata-black-300)" }}
      >
        Payment Frequency
      </h3>
      <HorizontalRadio value={value} onChange={onChange} />
    </div>
  )
}
