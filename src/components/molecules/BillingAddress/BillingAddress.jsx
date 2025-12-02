import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import { setBillingAddress } from "../../../store/store";
import { translations } from "../../../shared/translations";
import { billingAddressFields } from "../../../shared/constants/billingAddressFields";

const BillingAddress = ({
  initialSameAsBusiness = true,
  forceEditOnMount = false,
  initialBillingData = null,
  onValidationChange = () => { },
  fakeDelayMs = 1500,
}) => {
  const dispatch = useDispatch();

  const businessAddress = useSelector((s) =>
    s.form?.businessAddress ?? s.business?.businessAddress ?? s.billing?.businessAddress ?? null
  );

  const persistedFromSlices = useSelector((s) =>
    s.billing?.billingAddress ?? s.form?.billingAddress ?? s.form?.billing?.billingAddress ?? null
  );

  const [billingData, setBillingData] = useState(persistedFromSlices ?? initialBillingData ?? null);

  const [mode, setMode] = useState(() => {
    if (initialSameAsBusiness) return "same";
    if (persistedFromSlices || initialBillingData) return "readonly";
    return "editing";
  });

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: persistedFromSlices || initialBillingData || {
      firstName: "",
      lastName: "",
      streetAddress: "",
      unit: "",
      city: "",
      state: "",
      zipCode: "",
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

  const REQUIRED_FIELDS = useMemo(() => ["firstName", "lastName", "streetAddress", "city", "state", "zipCode"], []);


  const normalizeBusinessToBilling = useCallback((b) => {
    if (!b) return null;

    const firstName =
      b.firstName ??
      b.contactFirstName ??
      b.contact_name_first ??
      (typeof b.contactName === "string" ? b.contactName.split(" ")[0] : "") ??
      "";
    const lastName =
      b.lastName ??
      b.contactLastName ??
      b.contact_name_last ??
      (typeof b.contactName === "string" ? b.contactName.split(" ").slice(1).join(" ") : "") ??
      "";

    const streetAddress =
      b.streetAddress ?? b.street ?? b.address ?? b.deliveryAddress ?? b.deliveryAddress1 ?? "";
    const unit = b.unit ?? b.addressLine2 ?? b.address2 ?? b.deliveryAddress2 ?? "";
    const city = b.city ?? b.town ?? b.locality ?? "";
    const state = b.state ?? b.region ?? b.stateCode ?? "";
    const zipCode = b.zipCode ?? b.zip ?? b.postalCode ?? b.postcode ?? "";

    return {
      firstName: firstName || "",
      lastName: lastName || "",
      streetAddress,
      unit,
      city,
      state,
      zipCode,
    };
  }, []);

  const normalizeBillingShape = (b) => {
    if (!b) return null;
    return {
      firstName: (b.firstName ?? b.contactFirstName ?? b.contact_name_first ?? (typeof b.contactName === "string" ? b.contactName.split(" ")[0] : "") ?? "") || "",
      lastName: (b.lastName ?? b.contactLastName ?? b.contact_name_last ?? (typeof b.contactName === "string" ? b.contactName.split(" ").slice(1).join(" ") : "") ?? "") || "",
      streetAddress: b.streetAddress ?? b.street ?? b.address ?? b.deliveryAddress ?? b.deliveryAddress1 ?? "",
      unit: b.unit ?? b.addressLine2 ?? b.address2 ?? b.deliveryAddress2 ?? "",
      city: b.city ?? b.town ?? b.locality ?? "",
      state: b.state ?? b.region ?? b.stateCode ?? "",
      zipCode: b.zipCode ?? b.zip ?? b.postalCode ?? b.postcode ?? "",
    };
  };

  const shallowEq = (a, b) => {
    if (!a || !b) return false;
    return (
      (a.firstName ?? "") === (b.firstName ?? "") &&
      (a.lastName ?? "") === (b.lastName ?? "") &&
      (a.streetAddress ?? "") === (b.streetAddress ?? "") &&
      (a.unit ?? "") === (b.unit ?? "") &&
      (a.city ?? "") === (b.city ?? "") &&
      (a.state ?? "") === (b.state ?? "") &&
      (a.zipCode ?? "") === (b.zipCode ?? "")
    );
  };

  useEffect(() => {
    // Prefer persistedFromSlices (redux) if present
    const persisted = persistedFromSlices ?? null;
    // compute normalized business mapping
    const mappedBusiness = normalizeBusinessToBilling(businessAddress);
    const normalizedBusiness = normalizeBillingShape(mappedBusiness);
    const normalizedPersisted = normalizeBillingShape(persisted);
    // 1) If persisted matches business -> treat as "same"
    if (persisted) {
      if (normalizedBusiness && normalizedPersisted && shallowEq(normalizedBusiness, normalizedPersisted)) {
        setBillingData(normalizedBusiness);
        // ensure the form state also reflects the mapped business
        try { reset(normalizedBusiness); } catch (e) {/* ignore if not ready */ }
        setMode("same");
        if (typeof onValidationChange === "function") onValidationChange(true);
        return;
      }

      // 2) If we have a persisted billing (but not same as business) -> readonly

      setBillingData(persisted);
      try { reset(persisted); } catch (e) { }
      setMode("readonly");
      if (typeof onValidationChange === "function") onValidationChange(true);
      return;
    }

    // 3) No persisted billing -> if business exists and initialSameAsBusiness was true then set same
    if (businessAddress && initialSameAsBusiness) {
      const mapped = normalizeBusinessToBilling(businessAddress);
      setBillingData(mapped);
      try { reset(mapped); } catch (e) { }
      setMode("same");
      if (typeof onValidationChange === "function") onValidationChange(true);
      return;
    }

    // 4) fallback -> editing
    setMode("editing");
    if (typeof onValidationChange === "function") onValidationChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessAddress, persistedFromSlices, initialSameAsBusiness]);


  // ensure businessAddress is copied to billing when the section is "same" on mount/visit
  useEffect(() => {
    if (forceEditOnMount) return;
    // Only act when mode is 'same' (checkbox selected)
    if (mode !== "same") return;

    // Nothing to copy if we don't have a business address
    if (!businessAddress) return;

    // Map businessAddress to billing shape (reuse your normalizer)
    const mapped = normalizeBusinessToBilling(businessAddress);
    if (!mapped) return;

    // If persisted billing (from store) already exists, check if it matches mapped;
    // If it does, no-op. If not present or different, persist mapped.
    const alreadyPersisted = persistedFromSlices;
    const equalish = (a, b) => {
      if (!a || !b) return false;
      // shallow compare relevant keys we care about
      return (
        (a.firstName ?? "") === (b.firstName ?? "") &&
        (a.lastName ?? "") === (b.lastName ?? "") &&
        (a.streetAddress ?? a.street ?? "") === (b.streetAddress ?? b.street ?? "") &&
        (a.city ?? "") === (b.city ?? "") &&
        (a.state ?? "") === (b.state ?? "") &&
        (a.zipCode ?? a.zip ?? "") === (b.zipCode ?? b.zip ?? "")
      );
    };

    if (alreadyPersisted && equalish(alreadyPersisted, mapped)) {
      // already stored — but ensure local state reflects it
      if (!billingData) {
        setBillingData(alreadyPersisted);
      }
      return;
    }

    const mappedWithNames = {
      firstName: mapped.firstName ?? "",
      lastName: mapped.lastName ?? "",
      streetAddress: mapped.streetAddress ?? "",
      unit: mapped.unit ?? "",
      city: mapped.city ?? "",
      state: mapped.state ?? "",
      zipCode: mapped.zipCode ?? "",
    };

    // Persist mapped billing address and update local state
    dispatch(setBillingAddress(mappedWithNames));
    setBillingData(mappedWithNames);

    // Keep the mode as 'same' and notify parent it's valid
    setMode("same");
    if (typeof onValidationChange === "function") onValidationChange(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, businessAddress, persistedFromSlices, forceEditOnMount, normalizeBusinessToBilling, billingData, dispatch, onValidationChange]);

  // Compute validity only for required fields (ignores "unit").
  const computeRequiredFieldsValid = useCallback(() => {
    try {
      const vals = typeof getValues === "function" ? getValues() : {};
      const allFilled = REQUIRED_FIELDS.every((k) => {
        const v = vals?.[k];
        if (v === null || v === undefined) return false;
        if (typeof v === "string") return v.trim().length > 0;
        return Boolean(v);
      });
      setIsFormValid(Boolean(allFilled));
      return Promise.resolve(Boolean(allFilled));
    } catch (err) {
      setIsFormValid(false);
      return Promise.resolve(false);
    }
  }, [getValues, REQUIRED_FIELDS]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setBillingData(persistedFromSlices ?? initialBillingData ?? null);
  }, [persistedFromSlices, initialBillingData]);

  const fields = useMemo(() => billingAddressFields, []);

  useEffect(() => {
    const sub = watch(() => {
      computeRequiredFieldsValid();
    });
    return () => sub.unsubscribe();
  }, [watch, computeRequiredFieldsValid])

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      // If one of required fields changed, recompute
      if (!name) {
        computeRequiredFieldsValid();
        return;
      }
      if (REQUIRED_FIELDS.includes(name)) {
        computeRequiredFieldsValid();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, computeRequiredFieldsValid, REQUIRED_FIELDS]);

  const startEditing = useCallback(
    (useExisting = true) => {
      const source = useExisting ? (billingData || persistedFromSlices || initialBillingData) : null;
      if (source) {
        reset(source);
      } else {
        // ensure form has a blank structure
        reset({
          firstName: "",
          lastName: "",
          streetAddress: "",
          unit: "",
          city: "",
          state: "",
          zipCode: "",
        });
      }
      setMode("editing");
      if (typeof onValidationChange === "function") onValidationChange(false);

      Promise.resolve().then(() => {
        computeRequiredFieldsValid();
      });
    }, [billingData, persistedFromSlices, initialBillingData, reset, computeRequiredFieldsValid, onValidationChange]);

  useEffect(() => {
    if (!forceEditOnMount) return;

    if (mode === "same") {
      // console.log('forceEditOnMount: preserving mode "same"');
      return;
    }

    const dataToPrefill = initialBillingData ?? persistedFromSlices ?? billingData ?? null;

    if (dataToPrefill) {
      setBillingData(dataToPrefill);
      reset(dataToPrefill);

      // ✅ Show readonly block (with Edit button) instead of the Update form
      setMode("readonly");
      setIsFormValid(true);

      if (typeof onValidationChange === "function") {
        onValidationChange(true);
      }
    } else {
      // Fallback: no data, keep previous behavior (empty editing form)
      reset({
        firstName: "",
        lastName: "",
        streetAddress: "",
        unit: "",
        city: "",
        state: "",
        zipCode: "",
      });
      setMode("editing");

      Promise.resolve()
        .then(() => computeRequiredFieldsValid())
        .then((valid) => setIsFormValid(Boolean(valid)))
        .catch(() => setIsFormValid(false));
    }
  }, [forceEditOnMount, persistedFromSlices, initialBillingData, reset, computeRequiredFieldsValid, billingData, onValidationChange]);

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
      try {
        const result = computeRequiredFieldsValid();

        // If result is a Promise, await it; otherwise use it directly
        if (result && typeof result.then === "function") {
          result
            .then((valid) => {
              if (typeof onValidationChange === "function") onValidationChange(Boolean(valid));
            })
            .catch(() => {
              if (typeof onValidationChange === "function") onValidationChange(false);
            });
        } else {
          if (typeof onValidationChange === "function") onValidationChange(Boolean(result));
        }
      } catch (err) {
        if (typeof onValidationChange === "function") onValidationChange(false);
      }
    }
  }, [mode, billingData, persistedFromSlices, initialBillingData, onValidationChange, computeRequiredFieldsValid]);


  const onCheckboxChange = (checked) => {
    if (checked) {
      if (businessAddress) {
        const mapped = normalizeBusinessToBilling(businessAddress);
        dispatch(setBillingAddress(mapped));
        setBillingData(mapped);
        setMode("same");
        if (typeof onValidationChange === "function") onValidationChange(true);
      } else {
        startEditing(false);
      }
    } else {
      // user unchecked => start editing using existing data if present
      startEditing(true);
      const keysToCompare = [
        "streetAddress",
        "city",
        "state",
        "zip",
        "country",
      ];

      const isShippingSameAsBusiness =
        businessAddress &&
        persistedFromSlices &&
        keysToCompare.every(
          (key) =>
            (businessAddress?.[key] || "") ===
            (persistedFromSlices?.[key] || "")
        );

      if (isShippingSameAsBusiness) {
        reset({
          firstName: "",
          lastName: "",
          streetAddress: "",
          unit: "",
          city: "",
          state: "",
          zipCode: "",
        });
        dispatch(clearShippingAddress(null));
      }
    }
  };

  const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

  const onValidate = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        streetAddress: data.streetAddress ?? "",
        unit: data.unit ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        zipCode: data.zipCode ?? "",
      };
      await maybeDelay(fakeDelayMs);
      dispatch(setBillingAddress(payload));
      setBillingData(payload);
      setMode("readonly");
      if (typeof onValidationChange === "function") onValidationChange(true);
    } finally {
      setIsLoading(false);
    }
  };

  const submitUpdateSafely = async () => {
    setIsLoading(true);
    try {
      try {
        const valid = await computeRequiredFieldsValid();
        setIsFormValid(Boolean(valid));
        await maybeDelay(fakeDelayMs);
      } catch (err) {
        setIsFormValid(false);
      }

      // small debounce to allow form state to settle
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

        if (values && Object.keys(values).length > 0) {
          const payload = {
            firstName: values.firstName ?? "",
            lastName: values.lastName ?? "",
            streetAddress: values.streetAddress ?? values.street ?? "",
            unit: values.unit ?? "",
            city: values.city ?? "",
            state: values.state ?? "",
            zipCode: values.zipCode ?? values.zip ?? "",
          };
          try {
            reset(payload);
          } catch (e) {
            /* ignore */
          }

          // persist to redux
          dispatch(setBillingAddress(values));
          setBillingData(values);
          setMode("readonly");

          if (typeof onValidationChange === "function") onValidationChange(true);

          return;
        }
      }
    } catch (err) {
      console.error("submitUpdateSafely: unexpected error", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update action when editing an already validated form
  const onUpdate = (data) => {
    const payload = {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      streetAddress: data.streetAddress ?? "",
      unit: data.unit ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      zipCode: data.zipCode ?? "",
    };
    reset(payload);
    dispatch(setBillingAddress(payload));
    setBillingData(payload);
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
    if (data.streetAddress) parts.push(data.streetAddress);
    if (data.unit) parts.push(data.unit);
    const cityLine = [data.city, data.state, data.zipCode].filter(Boolean).join(", ");
    if (cityLine) parts.push(cityLine);
    return parts.join("\n");
  };

  // useEffect(() => {
  //   console.debug("BillingAddress debug:", {
  //     persistedFromSlices,
  //     initialBillingData,
  //     billingData,
  //     forceEditOnMount,
  //     mode,
  //     businessAddress,
  //   });
  // }, [persistedFromSlices, initialBillingData, billingData, forceEditOnMount, mode, businessAddress]);

  // Render different UIs by mode
  return (
    <div className="max-w-2xl pb-8">
      <h2 className="text-md mb-4">{translations?.billing_address}</h2>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-black animate-spin" />
            <div className="text-black text-lg font-medium">Saving...</div>
          </div>
        </div>
      )}

      {/* CASE: mode === 'same' (selected checkbox) */}
      {mode === "same" && (
        <div>
          <label className="inline-flex items-center space-x-3">
            <input
              type="checkbox"
              checked={mode === "same"}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              className="w-5 h-5 accent-orange-600 border-gray-400"
            />
            <span className="text-lg text-gray-600">{translations?.billing_address_same_business_address}</span>
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
              checked={mode === "same"}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              className="w-5 h-5 accent-orange-600 border-gray-400"
            />
            <span className="text-lg text-gray-600">{translations?.billing_address_same_business_address}</span>
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
              computeRequiredFieldsValid().then((valid) => {
                if (typeof onValidationChange === "function") onValidationChange(Boolean(valid));
              }).catch(() => {
                if (typeof onValidationChange === "function") onValidationChange(false);
              });
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
              {translations?.edit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
