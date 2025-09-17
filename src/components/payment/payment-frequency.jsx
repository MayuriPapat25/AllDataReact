export function PaymentFrequency({ value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium" style={{ color: "var(--alldata-black-300)" }}>
        Payment Frequency
      </h3>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="monthly"
            checked={value === "monthly"}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4"
            style={{
              accentColor: "var(--alldata-orange)",
              borderColor: "var(--alldata-gray-350)",
            }}
          />
          <span className="text-sm font-medium" style={{ color: "var(--alldata-black-300)" }}>
            MONTHLY
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="annually"
            checked={value === "annually"}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4"
            style={{
              accentColor: "var(--alldata-orange)",
              borderColor: "var(--alldata-gray-350)",
            }}
          />
          <span className="text-sm font-medium" style={{ color: "var(--alldata-black-300)" }}>
            ANNUALLY
          </span>
        </label>
      </div>
    </div>
  )
}
