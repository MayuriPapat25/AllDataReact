import React, { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { translations } from "../../../shared/translations";
import { useDispatch, useSelector } from "react-redux";
import { setBillingAddress, setBusinessAddressValidated, setBillingAddressValidated } from "../../../store/store";


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
  { name: 'firstName', label: 'First Name', type: 'text', rules: { required: true } },
  { name: 'lastName', label: 'Last Name', type: 'text', rules: { required: true } },
  { name: "street", label: "Street Address", type: "autocomplete", rules: { required: true } },
  { name: "unit", label: "Unit, Suite, etc.", type: "text", rules: {}, optional: true },
  { name: "city", label: "City", type: "text", rules: { required: true } },
  {
    name: "state", label: "State", type: "select", options: US_STATES, rules: { required: true }
  },
  { name: "zip", label: "Zip code", type: "text", rules: { required: true, pattern: /^[0-9\- ]{3,12}$/ } },
];

const BillingAddressValidation = ({ initialData = {}, onSave = () => { }, className = "", onEdit = () => { }, }) => {

  const dispatch = useDispatch();
  const storeBilling = useSelector((s) => s.form?.billingAddress) ?? {};

  // derive starting reactively so it updates whenever initialData or storeBilling change
  const starting = useMemo(() => {
    return (initialData && Object.keys(initialData).length) ? initialData : (storeBilling && Object.keys(storeBilling).length ? storeBilling : {});
  }, [initialData, storeBilling]);

  const [readonly, setReadonly] = useState(Boolean(Object.keys(starting).length));
  const validatedRef = useRef(Boolean(starting && Object.keys(starting).length));

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      street: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
      ...starting,
    }
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  // whenever incoming data (starting) changes, reset the form and update readonly/validatedRef
  useEffect(() => {
    if (starting && Object.keys(starting).length) {
      reset({
        street: starting.street || "",
        unit: starting.unit || "",
        city: starting.city || "",
        state: starting.state || "",
        zip: starting.zip || "",
        firstName: starting.firstName || "",
        lastName: starting.lastName || "",
      });
      validatedRef.current = true;
      setReadonly(true);
    } else {
      // no starting values: clear the form and go editable
      reset({
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
        firstName: "",
        lastName: "",
      });
      validatedRef.current = false;
      setReadonly(false);
    }
  }, [starting, reset]);

  const handleValidate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const ok = await trigger();
    if (!ok) return;
    const data = getValues();
    dispatch(setBillingAddress(data));
    dispatch(setBusinessAddressValidated(true));
    dispatch(setBillingAddressValidated(true));
    validatedRef.current = true;
    setReadonly(true);
    onSave(data);
  };

  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const ok = await trigger();
    if (!ok) return;
    const data = getValues();
    dispatch(setBillingAddress(data));
    dispatch(setBillingAddressValidated(true));
    setReadonly(true);
    onSave(data);
  };

  const handleEditClick = () => {
    setReadonly(false);
    dispatch(setBusinessAddressValidated(false));
    if (typeof onEdit === "function") onEdit();
  };

  const renderForm = () => (
    <form className={`max-w-2xl pt-6 pb-8  ${className}`} onSubmit={handleValidate}>

      <DynamicForm
        fields={addressFields}
        control={control}
        watch={watch}
        trigger={trigger}
        getValues={getValues}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />

      <div className="mt-4">
        {validatedRef.current ? (
          <button type="button" onClick={handleUpdate} className="bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700">
            UPDATE
          </button>
        ) : (
          <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700">
            Validate
          </button>
        )}
      </div>
    </form>
  );

  const renderReadonly = () => {
    const vals = {
      street: starting.street || "",
      unit: starting.unit || "",
      city: starting.city || "",
      state: starting.state || "",
      zip: starting.zip || "",
      firstName: starting.firstName || "",
      lastName: starting.lastName || "",
    };

    const line1 = (vals.firstName || vals.lastName) ? `${vals.firstName || ""} ${vals.lastName || ""}`.trim() + (vals.street ? ` — ${vals.street}` : "") : (vals.street || "");
    const line2 = [vals.city, vals.state, vals.zip].filter(Boolean).join(", ");

    return (
      <div className={`max-w-2xl bg-card pb-8 ${className}`}>
        <div className="flex justify-between items-start">
          <div></div>
          <button onClick={handleEditClick} className="text-sm font-medium text-gray-600 hover:underline">{translations?.edit}</button>
        </div>

        <div className="text-gray-700 text-lg leading-7">
          <div>{line1 || <span className="text-gray-400">—</span>}</div>
          <div>{line2 || <span className="text-gray-400">—</span>}</div>
        </div>
      </div>
    );
  };

  return readonly ? renderReadonly() : renderForm();
};

export default BillingAddressValidation;
