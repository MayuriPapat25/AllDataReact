import { translations } from "../../../shared/translations";

// businessInformationFields.js
export const businessInformationFields = [
  {
    name: "businessName",
    label: translations?.business_shop_name,
    type: "text",
    required: true,
    // validation: { required: translations?.business_shop_name_required },
  },
  {
    name: "authorizedSignerFirstName",
    label: translations?.authorize_signer_first_name,
    type: "text",
    required: true,
    // validation: { required: translations?.first_name_required },
  },
  {
    name: "authorizedSignerlastName",
    label: translations?.authorized_signer_last_name,
    type: "text",
    required: true,
    // validation: { required: translations?.last_name_required },
  },
  {
    name: "titleOfAuthorizedSigner",
    label: translations?.title_authorized_signer,
    type: "select",
    required: true,
    options: [
      { value: "manager", label: translations?.manager },
      { value: "serviceManager", label: translations?.service_manager },
      { value: "other", label: translations?.other },
    ],
  },
  {
    name: "authorizedSignerEmailAddress",
    label: translations?.authorized_signer_email_address,
    type: "email",
    required: true,
    validation: {
      required: translations?.email_address_required,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: translations?.enter_valid_email_address,
      },
    },
  },
  {
    name: "shopType",
    label: translations?.shop_type,
    type: "select",
    required: true,
    options: [
      { value: "general-repair", label: "General Repair" },
      { value: "collision", label: "Collision" },
      { value: "dealership", label: "Dealership" },
      { value: "education", label: "Education" },
      { value: "government", label: "Government" },
      {value: "tire-dealer", label: "Tire Dealer"},
      { value: "experss-services", label: "Express Services" },
      { value: "insurance", label: "Insurance" },
      { value: "other", label: "other" },
    ],
  },
  {
    name: "ownershipType",
    label: translations?.ownership_type,
    type: "select",
    required: true,
    options: [
      { value: "corporation", label: "Corporation" },
      { value: "sole-proprietor", label: "Sole Proprietor" },
      { value: "partner", label: "Partner" },
      { value: "llc", label: "LLC" },
      { value: "personal-use", label: "Personal Use" },
      { value: "other", label: "other" },
    ],
  },
  {
    name: "taxExemptStatus",
    label: translations?.tax_exempt_status,
    type: "radio",
    required: true,
    options: [
      { value: "not-exempt", label: "MY BUSINESS IS NOT TAX EXEMPT" },
      { value: "exempt", label: "MY BUSINESS IS TAX EXEMPT" },
    ],
    validation: { required: translations?.select_tax_exampt_status },
  },
  {
    name: "taxIdNumber",
    label: translations?.tax_id_number,
    type: "text",
    conditional: { field: "taxExemptStatus", equals: "exempt" },
    validation: {
      validate: (value, { taxExemptStatus }) =>
        taxExemptStatus !== "exempt" || value?.trim()
          ? true
          : translations?.tax_id_number_required_for_tax_exempt_businesses,
    },
  },
  {
    name: "taxExemptCertificate",
    label: translations?.upload_tax_exempt_certificate,
    type: "file",
    conditional: { field: "taxExemptStatus", equals: "exempt" },
  },
];
