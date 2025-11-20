import { translations } from "../../../shared/translations";

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
    options: [
      { value: "alabama", label: "Alabama" },
      { value: "alaska", label: "Alaska" },
      { value: "arizona", label: "Arizona" },
      { value: "arkansas", label: "Arkansas" },
      { value: "california", label: "California" },
      { value: "colorado", label: "Colorado" },
      { value: "connecticut", label: "Connecticut" },
      { value: "florida", label: "Florida" },
      { value: "georgia", label: "Georgia" },
      // ...add more states as needed
    ],
    validation: { required: translations?.state_required },
  },
  {
    name: "zipCode",
    label: translations?.zip_code,
    type: "text",
    required: true,
    validation: {
      required: translations?.zip_code_required,
      pattern: {
        value: /^\d{5}(-\d{4})?$/,
        message: translations?.enter_valid_zip_code,
      },
    },
  },
];
