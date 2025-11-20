import { translations } from "../../../shared/translations";

export const shippingAddressFields = [
  // 1. First Name & Last Name in one row
  {
    name: "firstName",
    label: translations?.first_name,
    type: "text",
    required: true,
    grid: "half", // 👈 controls layout
  },
  {
    name: "lastName",
    label: translations?.last_name,
    type: "text",
    required: true,
    grid: "half",
  },

  // 2. Street Address
  {
    name: "streetAddress",
    label: translations?.street_address,
    type: "text",
    required: true,
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
    required: true,
    minLength: 3,
  },

  // 5. State (Dropdown)
  {
    name: "state",
    label: translations?.state,
    type: "select",
    options: [
      "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
      "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
      "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
      "Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
      "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
      "New Mexico","New York","North Carolina","North Dakota","Ohio",
      "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
      "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
      "Washington","West Virginia","Wisconsin","Wyoming",
    ],
  },

  // 6. ZIP Code
  {
    name: "zipCode",
    label: translations?.zip_code,
    type: "text",
    required: true,
    minLength: 5,
    helperText: translations?.zip_code_helper_text,
  },
];
