// BusinessAddressValidation.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessAddress } from "../../../store/store"; // adjust path
import { translations } from "../../../shared/translations";
import { businessAddressFields } from "../../../shared/constants/businessAddressFields";
import { US_STATES } from '../../../shared/constants/US_STATES';

const BusinessAddressValidation = ({
  initialData = {},
  className = "",
  onSave = () => { },
  onValidationChange = () => { }
}) => {
  const dispatch = useDispatch();
  const storeAddress = useSelector((s) => s.form?.businessAddress) ?? {};
  const startingValues = (initialData && Object.keys(initialData).length) ? initialData : storeAddress;

  const [readonly, setReadonly] = useState(false);
  const validatedRef = useRef(false);

  // react-hook-form setup
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      streetAddress: "",
      unit: "",
      city: "",
      state: "",
      zipCode: "",
      // country: "United States",
      ...startingValues,
    },
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  const watched = watch(["streetAddress", "city", "state", "zipCode"]);
  const isAllRequiredPresent = (() => {
    const [streetAddress, city, state, zipCode] = watched || [];
    const okStreetAddress = streetAddress && String(streetAddress).trim() !== "";
    const okCity = city && String(city).trim() !== "";
    const okState = state && String(state).trim() !== "";
    const okZipCode = zipCode && String(zipCode).trim() !== "";
    return okStreetAddress && okCity && okState && okZipCode;
  })();

  useEffect(() => {
    const incoming = (initialData && Object.keys(initialData).length) ? initialData : storeAddress;
    if (incoming && Object.keys(incoming).length) {
      reset({
        streetAddress: incoming.streetAddress ?? incoming.street ?? "",
        unit: incoming.unit || "",
        city: incoming.city ?? incoming.cityName ?? "",
        state: incoming.state ?? incoming.stateCode ?? "",
        zipCode: incoming.zipCode ?? incoming.zip ?? "",
      });

      if (incoming && (incoming.street || incoming.streetAddress)) {
        validatedRef.current = true;
        setReadonly(true);
        onValidationChange(true);
      }
    } else {
      validatedRef.current = false;
      setReadonly(false);
    }
  }, [initialData, storeAddress, reset, onValidationChange]);

  const getStateLabel = (code) => {
    if (!code) return "";
    const found = US_STATES.find((s) => s.value === code);
    return found ? found.label : "";
  };

  // centralize dispatch so we always save both code and label
  const saveAddressToStore = (data) => {
    const stateLabel = getStateLabel(data.state);
    const payload = {
      streetAddress: data.streetAddress || "",
      unit: data.unit || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      stateName: stateLabel,
    };
    dispatch(setBusinessAddress(payload));
    return payload;
  };

  // Validate + save handler for "Validate" button (used on first save)
  const handleValidate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const ok = await trigger();
    if (!ok) {
      onValidationChange(false);
      return;
    }

    const data = getValues();
    const payload = saveAddressToStore(data);

    validatedRef.current = true;
    setReadonly(true);
    onValidationChange(true);
    onSave(payload);
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
    const payload = saveAddressToStore(data);
    setReadonly(true);
    onValidationChange(true);
    onSave(payload);
  };

  const handleEditClick = () => {
    // go back to edit mode; keep current values in form intact
    setReadonly(false);
  };

  // RENDERING
  const renderForm = () => {
    return (
      <form className={`max-w-2xl pt-6 pb-8 border-b-2 border-gray-300 ${className}`} onSubmit={handleValidate}>
        <h2 className="text-md mb-4">{translations?.business_address}</h2>

        <DynamicForm
          fields={businessAddressFields}
          control={control}
          watch={watch}
          trigger={trigger}
          getValues={getValues}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onValidationChange={onValidationChange}
        />

        <div className="mt-4">
          {validatedRef.current ? (
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isAllRequiredPresent}
              className={`px-5 py-3 rounded-md ${isAllRequiredPresent ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-600 text-white opacity-50 cursor-not-allowed"}`}
            >
              UPDATE
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isAllRequiredPresent}
              className={`px-5 py-3 rounded-md ${isAllRequiredPresent ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white opacity-50 cursor-not-allowed"}`}
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
      streetAddress: currentValues.streetAddress || currentValues.street || "",
      unit: currentValues.unit || "",
      city: currentValues.city || "",
      state: currentValues.state || "",
      zipCode: currentValues.zipCode || currentValues.zip || "",
      // country: currentValues.country || "United States",
    };

    const storeStateName = storeAddress?.stateName;
    const stateLabel = storeStateName || getStateLabel(vals.state);

    const line1 = vals.streetAddress + (vals.unit ? `, ${vals.unit}` : "");
    const line2 = [vals.city, stateLabel, vals.zipCode].filter(Boolean).join(", ");

    return (
      <div className={`max-w-2xl bg-card pb-8 border-b-2 border-gray-300 ${className}`}>
        <div className="flex justify-between items-start">
          <h2 className="text-md mb-4">{translations?.business_address}</h2>
          <button onClick={handleEditClick} className="text-sm font-medium text-gray-600 hover:underline">
            {translations?.edit}
          </button>
        </div>

        <div className="text-gray-700 text-lg leading-7">
          <div>{line1 || <span className="text-gray-400">—</span>}</div>
          <div>{line2 || <span className="text-gray-400">—</span>}</div>
          <div>{translations?.country_name || vals.country || "United States"}</div>
        </div>
      </div>
    );
  };

  return readonly ? renderReadonly() : renderForm();
};

export default BusinessAddressValidation;
