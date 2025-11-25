import { translations } from "../translations";
import { US_STATES } from "./US_STATES";

export const billingAddressFields = [
  // 1. First Name & Last Name in one row
  {
    name: "firstName",
    label: translations?.first_name,
    type: "text",
  },
  {
    name: "lastName",
    label: translations?.last_name,
    type: "text",
  },

  // 2. Street Address
  {
    name: "streetAddress",
    label: translations?.street_address,
    type: "autocomplete",
    minLength: 4,
  },

  // 3. Unit / Suite
  {
    name: "unit",
    label: translations?.unit_suite_apartment,
    type: "text",
    optional: true,
  },

  // 4. City
  {
    name: "city",
    label: translations?.city,
    type: "text",
    minLength: 3,
  },

  // 5. State (Dropdown)
  {
    name: "state",
    label: translations?.state,
    type: "select",
    options: US_STATES,
  },

  // 6. ZIP Code
  {
    name: "zipCode",
    label: translations?.zip_code,
    type: "text",
    minLength: 5,
    helperText: translations?.zip_code_helper_text,
  },
];
