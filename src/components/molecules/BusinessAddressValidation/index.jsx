
// BusinessAddressValidation.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessAddress } from "../../../store/store"; // adjust path

// US States list in the format SelectField expects
const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const addressFields = [
  // If you already have fields defined elsewhere, import them and use.
  // This is an example shape that DynamicForm should understand.
  { name: "street", label: "Street Address", type: "autocomplete", placeholder: "Enter street address", rules: { required: true } },
  { name: "unit", label: "Unit, Suite, etc.", type: "text", rules: {}, optional: true },
  { name: "city", label: "City", type: "text", rules: { required: true } },
  {
    name: "state", label: "State", type: "select", options: US_STATES, rules: { required: true }
  },
  { name: "zip", label: "Zip code", type: "text", rules: { required: true, pattern: /^[0-9\- ]{3,12}$/ } },
  // { name: "country", label: "Country", type: "text", rules: {}, defaultValue: "United States" },
];

const BusinessAddressValidation = ({ initialData = {}, className = "", onSave = () => { }, onValidationChange = () => { } }) => {
  const dispatch = useDispatch();

  // fallback to store if parent didn't provide initialData
  const storeAddress = useSelector((s) => s.form?.businessAddress) ?? {};
  const startingValues = (initialData && Object.keys(initialData).length) ? initialData : storeAddress;

  // readonly toggles between validated view and edit form
  // Always start with form (not readonly) - user must click Validate to show readonly
  const [readonly, setReadonly] = useState(false);
  // track whether the address was previously validated
  const validatedRef = useRef(false);

  // react-hook-form setup
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      street: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
      // country: "United States",
      ...startingValues,
    },
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  // If parent initialData changes meaningfully, reset the form (but avoid feedback loop)
  // Note: We reset form values but keep readonly=false so user can edit
  useEffect(() => {
    const incoming = (initialData && Object.keys(initialData).length) ? initialData : storeAddress;
    if (incoming && Object.keys(incoming).length) {
      reset({
        street: incoming.street || "",
        unit: incoming.unit || "",
        city: incoming.city || "",
        state: incoming.state || "",
        zip: incoming.zip || "",
        // country: incoming.country || "United States",
      });
      // Pre-fill form but don't auto-set readonly - user must validate manually
      // The form will always start in edit mode, regardless of whether initialData exists
    } else {
      // no incoming data -> ensure we are in edit mode
      validatedRef.current = false;
      setReadonly(false);
    }
  }, [initialData, storeAddress, reset]);

  // Validate + save handler for "Validate" button (used on first save)
  const handleValidate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // trigger validation for all fields
    const ok = await trigger();
    if (!ok) {
      onValidationChange(false);
      return;
    }

    const data = getValues();
    // dispatch to store
    dispatch(setBusinessAddress(data));
    // mark validated and show readonly
    validatedRef.current = true;
    setReadonly(true);
    // callbacks to parent
    onValidationChange(true);
    onSave(data);
  };

  // Update handler for the "UPDATE" button (when editing a validated address)
  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const ok = await trigger();
    if (!ok) {
      onValidationChange(false);
      return;
    }
    const data = getValues();
    dispatch(setBusinessAddress(data));
    setReadonly(true);
    onValidationChange(true);
    onSave(data);
  };

  const handleEditClick = () => {
    // go back to edit mode; keep current values in form intact
    setReadonly(false);
  };

  // RENDERING
  const renderForm = () => {
    return (
      <form className={`max-w-2xl pt-6 pb-8 border-b-2 border-gray-300 ${className}`} onSubmit={handleValidate}>
        <h2 className="text-md mb-4">Business Address</h2>

        <DynamicForm
          fields={addressFields}
          control={control}
          watch={watch}
          trigger={trigger}
          getValues={getValues}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onValidationChange={onValidationChange}
        // onSave not used here because we control save via Validate/Update buttons
        />

        <div className="mt-4">
          {validatedRef.current ? (
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700"
            >
              UPDATE
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700"
            >
              Validate
            </button>
          )}
        </div>
      </form>
    );
  };

  const renderReadonly = () => {
    // Get current form values instead of startingValues for readonly display
    const currentValues = getValues();
    const vals = {
      street: currentValues.street || "",
      unit: currentValues.unit || "",
      city: currentValues.city || "",
      state: currentValues.state || "",
      zip: currentValues.zip || "",
      // country: currentValues.country || "United States",
    };

    const line1 = vals.street + (vals.unit ? `, ${vals.unit}` : "");
    const line2 = [vals.city, vals.state, vals.zip].filter(Boolean).join(", ");

    return (
      <div className={`max-w-2xl bg-card pb-8 border-b-2 border-gray-300 ${className}`}>
        <div className="flex justify-between items-start">
          <h2 className="text-md mb-4">Business Address</h2>
          <button onClick={handleEditClick} className="text-sm font-medium text-gray-600 hover:underline">
            EDIT
          </button>
        </div>

        <div className="text-gray-700 text-lg leading-7">
          <div>{line1 || <span className="text-gray-400">—</span>}</div>
          <div>{line2 || <span className="text-gray-400">—</span>}</div>
          {/* <div>{vals.country}</div> */}
        </div>
      </div>
    );
  };

  return readonly ? renderReadonly() : renderForm();
};

export default BusinessAddressValidation;
