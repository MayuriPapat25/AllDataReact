import { translations } from '../translations';
import { US_STATES } from './US_STATES';

// businessAddressFields.js
export const businessAddressFields = [
  {
    name: "streetAddress",
    label: translations?.street_address,
    type: "autocomplete",
    required: true,
    validation: { required: translations?.street_address_required },
  },
  {
    name: "unit",
    label: translations?.unit_suite_apartment,
    type: "text",
    required: false,
    helperText: `${translations?.enter}${translations?.unit_suite_apartment}`,
    optional:true
  },
  {
    name: "city",
    label: translations?.city,
    type: "text",
    required: true,
    validation: { required: translations?.city_required },
  },
  {
    name: "state",
    label: "State",
    type: "select",
    required: true,
    options: US_STATES,
    validation: { required: translations?.state_required },
  },
  {
  name: "zipCode",
  label: translations?.zip_code,
  type: "text",
  required: true,

  // REMOVE numeric-only restriction
  // REMOVE maxLength: 5
  // REMOVE inputMode numeric (optional)
  inputMode: "text",

  validation: {
    required: translations?.zip_code_required,

    // REMOVE 5-digit regex pattern
    // (optional) allow any characters
    // If you want minimal validation, use a simple non-empty check:
    pattern: {
      value: /^.{1,50}$/,   // 1 to 50 chars (optional upper bound)
      message: translations?.enter_valid_zip_code,
    },
  },
}
];
