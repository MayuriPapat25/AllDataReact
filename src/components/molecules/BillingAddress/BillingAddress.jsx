import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import DynamicForm from "../../../shared/ui/DynamicForm"; // adjust path if your file lives elsewhere
import { useDispatch, useSelector } from "react-redux";
import { setBillingAddress, clearBillingAddress } from "../../../store/store";
import { translations } from "../../../shared/translations";

const BillingAddress = ({
  initialSameAsBusiness = true,
  forceEditOnMount = false,
  initialBillingData = null,
  onValidationChange = () => { },
}) => {
  const dispatch = useDispatch();

  const persistedFromSlices = useSelector((s) =>
    s.billing?.billingAddress ?? s.form?.billingAddress ?? s.form?.billing?.billingAddress ?? null
  );

  const [billingData, setBillingData] = useState(persistedFromSlices ?? initialBillingData ?? null);

  const [mode, setMode] = useState(() => {
    if (initialSameAsBusiness) return "same";
    if (persistedFromSlices || initialBillingData) return "readonly";
    return "editing";
  });

  // create a controlled react-hook-form instance in the parent
  const methods = useForm({
    mode: "onChange",          // run validation on change
    reValidateMode: "onChange",
    defaultValues: persistedFromSlices || initialBillingData || {
      firstName: "",
      lastName: "",
      street: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    getValues,
    setValue,
    formState,
  } = methods;

  const [isFormValid, setIsFormValid] = useState(Boolean(formState.isValid));

  useEffect(() => {
    setBillingData(persistedFromSlices ?? initialBillingData ?? null);
  }, [persistedFromSlices, initialBillingData]);

  const fields = useMemo(() => [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "street", label: "Street Address", type: "autocomplete", helperText: "Please enter at least 4 characters." },
    { name: "unit", label: "Unit, Suite, Apartment, etc.", type: "text", optional: true },
    { name: "city", label: "City", type: "text", helperText: "Please enter at least 3 characters." },
    {
      name: "state", label: "State", type: "select", options: [
        { value: "", label: "Select" },
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
      ]
    },
    { name: "zip", label: "ZIP Code", type: "text", helperText: "Please enter at least 5 characters." },
  ], []);

  useEffect(() => {
    setIsFormValid(Boolean(formState.isValid));
  }, [formState.isValid]);

  const startEditing = useCallback(
    (useExisting = true) => {
      const source = useExisting ? (billingData || persistedFromSlices || initialBillingData) : null;
      if (source) {
        reset(source);
      }
      setMode("editing");
      if (typeof onValidationChange === "function") onValidationChange(false);

      // re-run validation in next microtask so RHF has applied reset values
      Promise.resolve().then(() => {
        if (typeof trigger === "function") trigger();
      });
    }, [billingData, persistedFromSlices, initialBillingData, reset, trigger, onValidationChange]);

  useEffect(() => {
    if (!forceEditOnMount) return;

    // Choose the best available data to prefill
    const dataToPrefill = initialBillingData ?? persistedFromSlices ?? billingData ?? null;

    if (dataToPrefill) {
      setBillingData(dataToPrefill);
      reset(dataToPrefill);
      setMode("editing");

      Promise.resolve()
        .then(() => {
          if (typeof trigger === "function") {
            return trigger(); // returns boolean: true if valid
          }
          return false;
        })
        .then((valid) => {
          setIsFormValid(Boolean(valid));
        })
        .catch(() => {
          setIsFormValid(false);
        });
    } else {
      reset({
        firstName: "",
        lastName: "",
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
      });
    }

    setMode("editing");

    Promise.resolve().then(() => {
      if (typeof trigger === "function") {
        trigger().then((valid) => setIsFormValid(Boolean(valid))).catch(() => setIsFormValid(false));
      }
    });
  }, [forceEditOnMount, persistedFromSlices, initialBillingData, reset, trigger, billingData]);

  // Notify parent when this section becomes effectively valid/invalid
  useEffect(() => {
    if (mode === "same") {
      if (typeof onValidationChange === "function") onValidationChange(true);
      return;
    }
    if (mode === "readonly" && (billingData || persistedFromSlices || initialBillingData)) {
      if (typeof onValidationChange === "function") onValidationChange(true);
      return;
    }
    if (mode === "editing") {
      if (typeof onValidationChange === "function") onValidationChange(false);
    }
  }, [mode, billingData, persistedFromSlices, initialBillingData, onValidationChange]);

  // Handler when user toggles the checkbox
  const onCheckboxChange = (checked) => {
    if (checked) {
      setMode("same");
      if (typeof onValidationChange === "function") onValidationChange(true);
    } else {
      startEditing(true);
    }
  };

  const onValidate = (data) => {
    dispatch(setBillingAddress(data));
    setBillingData(data);
    setMode("readonly");
    if (typeof onValidationChange === "function") onValidationChange(true);
  };

  const submitUpdateSafely = async () => {
    try {
      const valid = await (typeof trigger === "function" ? trigger() : Promise.resolve(false));
      setIsFormValid(Boolean(valid));

      await new Promise((r) => setTimeout(r, 30));

      try {
        await handleSubmit(onUpdate)();
      } catch (err) {
        // swallow — fallback below
      }

      if (mode === "editing") {
        let values = null;
        try {
          values = typeof getValues === "function" ? getValues() : null;
        } catch (err) {
          values = null;
        }

        // If we have something useful, persist it as fallback
        if (values && Object.keys(values).length > 0) {
          // make sure the RHF instance reflects these values too
          try { reset(values); } catch (e) { /* ignore */ }

          // persist to redux
          dispatch(setBillingAddress(values));
          setBillingData(values);
          setMode("readonly");

          // notify parent
          if (typeof onValidationChange === "function") onValidationChange(true);

          return;
        }
      }
    } catch (err) {
      console.error("submitUpdateSafely: unexpected error", err);
    }
  };

  // Update action when editing an already validated form
  const onUpdate = (data) => {
    reset(data);
    dispatch(setBillingAddress(data));
    setBillingData(data);
    setMode("readonly");
    if (typeof onValidationChange === "function") {
      onValidationChange(true);
    }
  };

  // small helper to format readonly address for display
  const formatAddress = (data) => {
    if (!data) return "";
    const parts = [];
    const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
    if (name) parts.push(name);
    if (data.street) parts.push(data.street);
    if (data.unit) parts.push(data.unit);
    const cityLine = [data.city, data.state, data.zip].filter(Boolean).join(", ");
    if (cityLine) parts.push(cityLine);
    return parts.join("\n");
  };

  useEffect(() => {
    console.debug("BillingAddress debug:", {
      persistedFromSlices,
      initialBillingData,
      billingData,
      forceEditOnMount,
      mode,
    });
  }, [persistedFromSlices, initialBillingData, billingData, forceEditOnMount, mode]);


  console.log('billingData', billingData)
  console.log('persistedFromSlices', persistedFromSlices)
  // Render different UIs by mode
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{translations?.billing_address}</h2>

      {/* CASE: mode === 'same' (selected checkbox) */}
      {mode === "same" && (
        <div>
          <label className="inline-flex items-center space-x-3">
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              className="w-5 h-5 accent-orange-600 border-gray-400"
            />
            <span className="text-lg text-gray-600">My billing address is the same as my business address.</span>
          </label>

          <hr className="mt-6 border-t-2 border-gray-300" />
        </div>
      )}

      {/* CASE: mode === 'editing' (show form with Validate or Update) */}
      {mode === "editing" && (
        <div>
          <label className="inline-flex items-center space-x-3 mb-6">
            <input
              type="checkbox"
              checked={false}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              className="w-5 h-5 accent-orange-600 border-gray-400"
            />
            <span className="text-lg text-gray-600">My billing address is the same as my business address.</span>
          </label>

          {/* DynamicForm receives parent-controlled form methods so we can submit / validate */}
          <DynamicForm
            fields={fields}
            control={control}
            watch={watch}
            trigger={trigger}
            getValues={getValues}
            setValue={setValue}
            handleSubmit={handleSubmit}
            onValidationChange={(v) => {
              const valid = typeof v === "boolean" ? v : Boolean(formState.isValid);
              onValidationChange(Boolean(valid));
              setIsFormValid(Boolean(valid));
            }}
            onSave={(data) => {
              dispatch(setBillingAddress(data));
              setBillingData(data);
              setMode("readonly");
              if (typeof onValidationChange === "function") onValidationChange(true);
            }}
            initialData={billingData ?? persistedFromSlices ?? initialBillingData ?? undefined}
            showValidateButton={false}
          />

          <div className="mt-4 pb-6 border-b-2 border-gray-300">
            {/* Use handleSubmit to validate and submit programmatically */}
            {!billingData && !persistedFromSlices && (
              <button
                type="button"
                onClick={handleSubmit(onValidate)}
                disabled={!isFormValid}
                className={`px-5 py-3 rounded-md ${isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Validate
              </button>
            )}

            {/* If we already had billingData (editing an existing validated address), show Update instead */}
            {(billingData || persistedFromSlices) && (
              <button
                type="button"
                onClick={submitUpdateSafely}
                disabled={!isFormValid}
                className={`ml-3 px-4 py-3 rounded-md ${isFormValid ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
              >
                Update
              </button>
            )}
          </div>
        </div>
      )}

      {/* CASE: mode === 'readonly' (show formatted readonly address with Edit button) */}
      {mode === "readonly" && (
        <div className="flex justify-between items-start border-b-2 border-gray-300 pb-6">
          <div className="whitespace-pre-line text-gray-700 text-lg">
            {formatAddress(billingData ?? persistedFromSlices ?? initialBillingData)}
          </div>

          <div>
            <button
              type="button"
              onClick={() => startEditing(true)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BillingAddress;
