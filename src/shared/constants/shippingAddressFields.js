import { US_STATES } from "./US_STATES";
import { translations } from "../translations";

export const shippingAddressFields = [
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
//  {
//     name: "zipCode",
//     label: translations?.zip_code,
//     type: "text",
//     required: true,
//     inputMode: "numeric",
//     maxLength: 5,
//     onKeyPress: (e) => {
//       if (!/[0-9]/.test(e.key)) {
//         e.preventDefault();
//       }
//     },
//     validation: {
//       required: translations?.zip_code_required,
//       pattern: {
//         value: /^[0-9]{5}$/,
//         message: translations?.enter_valid_zip_code,
//       },
//     },
//   }
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
