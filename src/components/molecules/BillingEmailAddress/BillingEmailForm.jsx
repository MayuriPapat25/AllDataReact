import React from "react"
import DynamicForm from "../../../shared/ui/DynamicForm"
import { billingEmailFields } from "./billingEmailFields"
import { translations } from "../../../shared/translations"

const BillingEmail = ({ onValidationChange }) => {
  return (
    <div className="w-full space-y-6 pb-8 border-b-2 border-gray-300">
      <h2 className="text-md">{translations?.billing_email_address}</h2>

      <DynamicForm
        fields={billingEmailFields}
        onValidationChange={onValidationChange}
      />
    </div>
  )
}

export default BillingEmail
