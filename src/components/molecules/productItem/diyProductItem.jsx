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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-gray-200 items-start md:items-center">
      <div className="md:col-span-1">
        <span className="inline-block text-[#1b3d6e] text-xs font-medium">{status}</span>
      </div>
      <div className="md:col-span-4">
        <p className="text-sm font-medium text-gray-900">{description}</p>
      </div>
      <div className="md:col-span-2">
        <p className="text-sm text-gray-600 font-semibold">{expiration}</p>
      </div>
      {/* Plan */}
      <div className="md:col-span-2">
        <Dropdown
          label="" // no label here, already handled in layout if needed
          value={plan}
          onValueChange={onPlanChange}
          options={planOptions}
        />
      </div>
      <div className="md:col-span-2 text-gray-500">
        <p className="text-sm">${price}</p>
      </div>
      <div className="md:col-span-1 flex justify-start md:justify-center w-full no-underline md:w-20">
        <LinkButton onClick={onRemove} className="flex items-center gap-1">
          <DeleteIcon />
          Remove
        </LinkButton>
      </div>
    </div>
  )
}
