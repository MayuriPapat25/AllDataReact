import { useMemo } from "react";

  // fallback saved cards list (you already had these)
  export const existingCards = [
    { value: "1", label: "Visa Ending in 4844" },
    { value: "2", label: "Mastercard Ending in 1234" },
    { value: "3", label: "American Express Ending in 5678" },
  ];

  // fields for DynamicForm
  export const paymentTypeFields = [
    {
      name: "paymentType",
      label: "Payment Type",
      type: "radio", // ensure your fieldComponents has a 'radio' renderer
      required: true,
      options: [
        { label: "USE PAYMENT METHOD ON FILE", value: "existing" },
        { label: "ADD NEW PAYMENT TYPE", value: "new" },
      ],
      // defaultValue at form-level (via defaultValues below) is also fine
    },
    {
      name: "cardSelect",
      label: "Select saved card",
      type: "select", // ensure fieldComponents supports 'select'
      placeholder: "Select card",
      options: existingCards.map((c) => ({ label: c.label, value: c.value })),
      // only show when paymentType === 'existing'
      conditional: { field: "paymentType", equals: "existing" },
      required: true,
    },
    {
      name: "newPaymentIframe",
      label: "New Payment",
      type: "iframe", // if you don't have an 'iframe' component, replace with a custom 'html' or 'custom' type
      conditional: { field: "paymentType", equals: "new" },
      helperText: "New Payment Iframe", // fallback text if your iframe renderer uses helperText
    },
  ];