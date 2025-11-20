// billingEmailFields.js

export const billingEmailFields = [
  {
    id: "usePrimaryEmail",
    name: "usePrimaryEmail",
    type: "radio",
    label: "Use my primary email address for billing statements.",
    options: [{ label: "", value: "primary" }],
    defaultValue: null,
  },
  {
    id: "billingEmail",
    name: "billingEmail",
    type: "email",
    placeholder: "EMAIL ADDRESS FOR BILLING STATEMENTS",
    rules: { required: false },
    className: "text-lg",
  },
]
