import { PlanDropdown } from "../../atoms/Dropdown/planDropdown"
import { RemoveLink } from "../../atoms/links/removeLink"

export function ProductSingleItem({ status, description, expiration, plan, price, onPlanChange, onRemove }) {
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
      <div className="md:col-span-2">
        <PlanDropdown value={plan} onValueChange={onPlanChange} />
      </div>
      <div className="md:col-span-2">
        <p className="text-sm">${price}</p>
      </div>
      <div className="md:col-span-1 flex justify-start md:justify-center w-full md:w-20">
        <RemoveLink onRemove={onRemove} />
      </div>
    </div>
  )
}
