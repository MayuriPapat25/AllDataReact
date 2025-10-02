import { LinkButton } from "../../atoms/links/linkButton"
import { DeleteIcon } from "../../atoms/Icon/Icon"
import { Dropdown } from "../../atoms/Dropdown/Dropdown"

export function ProductSingleItem({ status, description, expiration, plan, price, onPlanChange, onRemove }) {
  const planOptions = [
    { value: "1-year", label: "1 Year" },
    { value: "1-month", label: "1 Month" },
    { value: "3-years", label: "3 Years" },
  ]

  return (
    <div className="py-4 border-b border-gray-200 space-y-2 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 items-start md:items-center">
      {/* Status */}
      <div className="hidden md:block md:col-span-1">
        <strong className="inline-block text-md">{status}</strong>
      </div>

      {/* Name / Description */}
      <div className="col-span-1 md:col-span-4">
        <p className="text-md break-words">{description}</p>
      </div>

      <div className="md:col-span-2 flex items-center">
        <p className="text-md font-medium">{expiration}</p>
      </div>

      {/* Plan */}
      <div className="md:col-span-2 flex items-center">
        <div className="w-32">
          <Dropdown
            label="" // no label for inline
            value={plan}
            onValueChange={onPlanChange}
            options={planOptions}
          />
        </div>
      </div>

      {/* Row 3: Price and Remove */}
      <div className="flex justify-between items-center md:col-span-3">
        <p className="text-gray-500">${price}</p>
        <LinkButton onClick={onRemove} className="flex items-center gap-1 text-primary">
          <DeleteIcon />
          Remove
        </LinkButton>
      </div>
    </div>
  )
}
