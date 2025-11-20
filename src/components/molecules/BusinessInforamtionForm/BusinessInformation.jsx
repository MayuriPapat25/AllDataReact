import React, { useEffect, useRef } from "react";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessInformationFields } from "./businessInformationFields";
import { handleWatchEffect } from "../../../shared/utils/formUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../../../shared/translations";
import { setBusinessInfo } from "../../../store/store"; // <-- use dedicated action

// simple debounce helper
const useDebounce = (fn, delay = 300) => {
  const t = useRef(null);
  return (...args) => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => fn(...args), delay);
  };
};

const BusinessInformation = ({ onValidationChange, initialData = {} }) => {
  const dispatch = useDispatch();

  // If StepContent passes nothing, try to read from store as fallback
  const storeData = useSelector((state) => state.form?.businessInfo) ?? {};

  const initialUsedRef = useRef(false); // tracks if we've initialized/reset already
  const prevInitialJSON = useRef(null); // track last initialData JSON to detect real changes

  const startingValues = (initialData && Object.keys(initialData).length) ? initialData : storeData;

  // single source of truth for the form
  const form = useForm({
    mode: "onBlur",
    defaultValues: startingValues,
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  // ⬅️ update form when parent provides initialData or on coming back
  useEffect(() => {
    const currentInitial = initialData && Object.keys(initialData).length ? initialData : {};
    const currentJSON = JSON.stringify(currentInitial);

    // On first mount: initialize (if startingValues provided)
    if (!initialUsedRef.current) {
      // Only reset if there is something meaningful in startingValues
      if (startingValues && Object.keys(startingValues).length) {
        reset(startingValues);
      }
      initialUsedRef.current = true;
      prevInitialJSON.current = currentJSON;
      return;
    }

    // On subsequent renders: only reset when incoming initialData prop actually changed
    if (currentJSON !== prevInitialJSON.current) {
      // Avoid overwriting if the form currently has different values (optional check)
      // If you want to be very defensive, you could compare getValues() with currentInitial
      reset(currentInitial);
      prevInitialJSON.current = currentJSON;
    }
    // Note: intentionally do NOT watch storeData here to avoid feedback loop
  }, [initialData, reset /* no storeData dependency */]);

  // preserve your existing validation watcher
  useEffect(() => {
    const cleanup = handleWatchEffect(watch, trigger, getValues, onValidationChange, setValue);
    return cleanup;
  }, [watch, trigger, getValues, onValidationChange, setValue]);

  // Keep autosave behavior: update store on every change (debounced)
  const debouncedDispatch = useDebounce((values) => {
    if (!values || typeof values !== "object") return;
    dispatch(setBusinessInfo(values));
  }, 250);

  useEffect(() => {
    const subscription = watch(() => {
      const snapshot = getValues();
      debouncedDispatch(snapshot);
    });
    return () => {
      if (typeof subscription === "function") subscription();
    };
  }, [watch, getValues, debouncedDispatch]);

  return (
    <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300">
      <div className="mb-6 flex justify-between text-center">
        <h2 className="mb-1 text-md">{translations?.business_information}</h2>
        <p className="text-sm text-muted-foreground">| = `${translations?.fields_are_required}`</p>
      </div>
      <DynamicForm
        fields={businessInformationFields}
        onValidationChange={onValidationChange}
        control={control}
        watch={watch}
        trigger={trigger}
        getValues={getValues}
        setValue={setValue}
        handleSubmit={handleSubmit}
        // optional: onSave will be called on submit (DynamicForm calls it on submit)
        onSave={(data) => dispatch(setBusinessInfo(data))}
      />
    </div>
  );
};

export default BusinessInformation;
