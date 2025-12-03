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
  onValidationChange = () => { },
  fakeDelayMs = 1500,
}) => {
  const dispatch = useDispatch();
  const storeAddress = useSelector((s) => s.form?.businessAddress) ?? {};
  const startingValues = (initialData && Object.keys(initialData).length) ? initialData : storeAddress;

  const [readonly, setReadonly] = useState(false);
  const validatedRef = useRef(false);
  const [loading, setLoading] = useState(false);

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

  const findStateValue = (token) => {
    if (!token) return "";
    const t = String(token).trim().toLowerCase();

    // Try exact code match first (e.g. "CA", "ca")
    const byValue = US_STATES.find(s => String(s.value || "").toLowerCase() === t);
    if (byValue) return byValue.value;

    // Try matching label (case-insensitive, allow partial)
    const byLabel = US_STATES.find(s => String(s.label || "").toLowerCase() === t);
    if (byLabel) return byLabel.value;

    // try loose contains match (e.g. "new york" matches "New York")
    const byContains = US_STATES.find(s => String(s.label || "").toLowerCase().includes(t) || t.includes(String(s.label || "").toLowerCase()));
    if (byContains) return byContains.value;

    return "";
  };

  useEffect(() => {
    // inform parent when required fields are present (so the Continue button can enable)
    // we don't auto-mark as "validatedRef.current = true" — keep Validate / Update UX intact.
    onValidationChange(Boolean(isAllRequiredPresent));
  }, [isAllRequiredPresent, onValidationChange]);

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
      } else {
        validatedRef.current = false;
        setReadonly(false);
      }
    } else {
      validatedRef.current = false;
      setReadonly(false);
      // reflect initial empty state to parent
      onValidationChange(false);
    }
  }, [initialData, storeAddress, reset]);

  const validateRequiredFields = useRef(null);

  useEffect(() => {
    if (validateRequiredFields.current) {
      clearTimeout(validateRequiredFields.current);
    }
    validateRequiredFields.current = setTimeout(async () => {
      // Only validate the required fields to speed up checks
      const ok = await trigger(["streetAddress", "city", "state", "zipCode"]);
      // Do not change validatedRef or readonly here — validatedRef tracks persisted readonly state.
      onValidationChange(Boolean(ok));
    }, 180); // 180ms debounce

    return () => {
      if (validateRequiredFields.current) clearTimeout(validateRequiredFields.current);
    };
    // trigger when any watched field changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watched?.[0], watched?.[1], watched?.[2], watched?.[3], trigger, onValidationChange]);

  const getStateLabel = (code) => {
    if (!code) return "";
    const found = US_STATES.find((s) => s.value === code);
    return found ? found.label : "";
  };

  // centralize dispatch so we always save both code and label
  const saveAddressToStore = (data) => {
    const normalizedState = data.state ? (findStateValue(data.state) || data.state) : "";

    const payload = {
      streetAddress: data.streetAddress || "",
      unit: data.unit || "",
      city: data.city || "",
      state: normalizedState,
      zipCode: data.zipCode || "",
      stateName: getStateLabel(normalizedState),
    };

    // debug: log what we're about to dispatch
    // eslint-disable-next-line no-console

    const result = dispatch(setBusinessAddress(payload));
    return { payload, result };
  };

  // Parse freeform string like:
  // "Amel, Hepscheid, Heppenbach, Amel, Verviers, Liège, Wallonia, 4771, Belgium"
  const parseFromFreeformString = (str) => {
    if (!str || typeof str !== "string") return null;
    const parts = str.split(",").map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) return null;

    // If last token is likely a country (alphabetic and not a short code), drop it.
    const isLikelyCountry = (token) => {
      // heuristics: pure letters and length > 2 (e.g., "Belgium", "United States")
      return /^[A-Za-z\s]+$/.test(token) && token.length > 2;
    };

    let tokens = [...parts];
    if (tokens.length > 1 && isLikelyCountry(tokens[tokens.length - 1])) {
      tokens.pop();
    }

    // find a token from end that looks like a zip (has digits)
    let zipIndex = -1;
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (/\d/.test(tokens[i])) {
        zipIndex = i;
        break;
      }
    }

    let zip = "";
    let stateToken = "";
    let city = "";

    if (zipIndex !== -1) {
      zip = tokens[zipIndex];
      // state is token before zipIndex
      if (zipIndex - 1 >= 0) stateToken = tokens[zipIndex - 1];
      // city is token before state
      if (zipIndex - 2 >= 0) city = tokens[zipIndex - 2];
    } else {
      // No numeric zip found — fallback: use last tokens as city/state/zip placeholders
      if (tokens.length >= 3) {
        city = tokens[tokens.length - 3];
        stateToken = tokens[tokens.length - 2];
        zip = tokens[tokens.length - 1];
      } else if (tokens.length === 2) {
        city = tokens[0];
        stateToken = tokens[1];
      } else if (tokens.length === 1) {
        // can't extract much
        city = tokens[0];
      }
    }
    const stateValue = findStateValue(stateToken);

    // return empty strings instead of undefined
    return {
      city: city || "",
      state: stateValue || stateToken || "",
      zipCode: zip || ""
    };
  };

  const parseAddressComponents = (placeResult) => {
    // Accept either:
    //  - a place result with .address_components (Google)
    //  - an object { city, state, zipCode }
    //  - a simple object with keys like locality, administrative_area_level_1, postal_code
    //  - a plain freeform string
    if (!placeResult) return null;

    // If it's a plain string — attempt freeform parsing
    if (typeof placeResult === "string") {
      return parseFromFreeformString(placeResult);
    }

    // If user supplied direct fields:
    if ("city" in placeResult || "state" in placeResult || "zipCode" in placeResult) {
      return {
        city: placeResult.city || placeResult.locality || "",
        state: placeResult.state || placeResult.stateCode || placeResult.administrative_area_level_1 || "",
        zipCode: placeResult.zipCode || placeResult.postal_code || ""
      };
    }

    // If Google-like address_components:
    if (Array.isArray(placeResult.address_components)) {
      const comps = {};
      placeResult.address_components.forEach((c) => {
        if (c.types.includes("locality")) comps.city = c.long_name;
        if (c.types.includes("postal_town") && !comps.city) comps.city = c.long_name;
        if (c.types.includes("administrative_area_level_1")) comps.state = c.short_name || c.long_name;
        if (c.types.includes("postal_code")) comps.zipCode = c.long_name;
        // some addresses have postal_code_suffix; ignore for now
      });
      return {
        city: comps.city || "",
        state: comps.state || "",
        zipCode: comps.zipCode || ""
      };
    }

    // Unknown shape
    return null;
  }

  const geocodePlaceId = (placeId) => {
    return new Promise((resolve, reject) => {
      if (!window?.google?.maps?.Geocoder) {
        reject(new Error("Google Maps JS API not loaded (window.google.maps.Geocoder missing)."));
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          resolve(results[0]);
        } else {
          reject(new Error(`Geocode failed: ${status}`));
        }
      });
    });
  };

  useEffect(() => {
    // watch returns current value; index 0 is streetAddress
    const currentStreet = getValues("streetAddress");
    // If nothing selected -> do nothing
    if (!currentStreet) return;

    (async () => {
      try {
        // Case A: if the autocomplete returns an object (Google place result or custom object)
        if (typeof currentStreet === "object") {
          // If this object exposes place_id, try to geocode to get full address components
          if (currentStreet.place_id || currentStreet.placeId) {
            try {
              const placeId = currentStreet.place_id || currentStreet.placeId;
              const placeResult = await geocodePlaceId(placeId);
              const parsed = parseAddressComponents(placeResult);
              if (parsed) {
                if (parsed.city) setValue("city", parsed.city, { shouldDirty: true });
                if (parsed.state) setValue("state", parsed.state, { shouldDirty: true });
                if (parsed.zipCode) setValue("zipCode", parsed.zipCode, { shouldDirty: true });
              }
              // Also set streetAddress text if available
              const streetText = placeResult.formatted_address || currentStreet.description || currentStreet.formatted_address;
              if (streetText) setValue("streetAddress", streetText, { shouldDirty: true });
            } catch (err) {
              // geocode failed — try to parse existing object
              const parsed = parseAddressComponents(currentStreet);
              if (parsed) {
                if (parsed.city) setValue("city", parsed.city, { shouldDirty: true });
                if (parsed.state) setValue("state", parsed.state, { shouldDirty: true });
                if (parsed.zipCode) setValue("zipCode", parsed.zipCode, { shouldDirty: true });
              }
            }
            return;
          }

          // If object already contains address_components-like data or plain fields, parse directly:
          const parsedDirect = parseAddressComponents(currentStreet);
          if (parsedDirect) {
            if (parsedDirect.city) setValue("city", parsedDirect.city, { shouldDirty: true });
            if (parsedDirect.state) setValue("state", parsedDirect.state, { shouldDirty: true });
            if (parsedDirect.zipCode) setValue("zipCode", parsedDirect.zipCode, { shouldDirty: true });
          } else {
            // Fallback: if object has a formatted string, set street text only
            if (currentStreet.description || currentStreet.formatted_address) {
              setValue("streetAddress", currentStreet.description || currentStreet.formatted_address, { shouldDirty: true });
            }
          }
        } else if (typeof currentStreet === "string") {
          // Case B: the autocomplete returns a placeId string (some implementations do that) or plain text.
          // Try to detect a placeId pattern (place ids usually start with "ChI" for google but not guaranteed).
          // We attempt geocode if window.google present and string looks like an id (or if it's safe to call).
          const maybePlaceId = currentStreet;
          let didAutofill = false;
          if (window?.google?.maps && maybePlaceId.length > 5 && !/\s/.test(maybePlaceId)) {
            // attempt geocode by placeId
            try {
              const placeResult = await geocodePlaceId(maybePlaceId);
              const parsed = parseAddressComponents(placeResult);
              if (parsed) {
                if (parsed.city) setValue("city", parsed.city, { shouldDirty: true });
                if (parsed.state) setValue("state", parsed.state, { shouldDirty: true });
                if (parsed.zipCode) setValue("zipCode", parsed.zipCode, { shouldDirty: true });
                didAutofill = true;
              }
              const streetText = placeResult.formatted_address;
              if (streetText) setValue("streetAddress", streetText, { shouldDirty: true });
            } catch (err) {
              // If geocode failed (or currentStreet is just typed text), we'll fall back below
            }
          }

          // If not a placeId / geocode not done, try to parse freeform string
          if (!didAutofill) {
            const parsedFromString = parseFromFreeformString(currentStreet);
            if (parsedFromString) {
              if (parsedFromString.city) setValue("city", parsedFromString.city, { shouldDirty: true });
              if (parsedFromString.state) setValue("state", parsedFromString.state, { shouldDirty: true });
              if (parsedFromString.zipCode) setValue("zipCode", parsedFromString.zipCode, { shouldDirty: true });
            }
          }
        }
      } catch (err) {
        // swallow — autofill is best-effort
        // console.debug("autofill error", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("streetAddress")]); // re-run when streetAddress changes

  const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

  // Validate + save handler for "Validate" button (used on first save)
  const handleValidate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const ok = await trigger(["streetAddress", "city", "state", "zipCode"]);
    if (!ok) {
      onValidationChange(false);
      return;
    }
    setLoading(true);
    try {
      // perform any actual saving
      const data = getValues();
      const payload = saveAddressToStore(data);

      // optional artificial wait so user sees loader
      await maybeDelay(fakeDelayMs);

      validatedRef.current = true;
      setReadonly(true);
      onValidationChange(true);
      onSave(payload);
    } catch (err) {
      // handle/report errors if needed
      onValidationChange(false);
      // optionally rethrow or log
    } finally {
      setLoading(false);
    }
  };

  // Update handler for the "UPDATE" button (when editing a validated address)
  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // explicitly validate the address fields
    const ok = await trigger(["streetAddress", "city", "state", "zipCode"]);
    if (!ok) {
      onValidationChange(false);
      return;
    }

    setLoading(true);
    try {
      const data = getValues();

      // save to store (normalizes state)
      const { payload, result } = saveAddressToStore(data);

      // if the action returned a promise (redux-thunk), await it
      if (result && typeof result.then === "function") {
        await result;
      }

      // optional delay for UX
      await maybeDelay(fakeDelayMs);

      // sync react-hook-form to the saved payload so UI reflects store
      reset({
        streetAddress: payload.streetAddress || "",
        unit: payload.unit || "",
        city: payload.city || "",
        state: payload.state || "",
        zipCode: payload.zipCode || "",
      });

      validatedRef.current = true;
      setReadonly(true);

      onValidationChange(true);
      onSave(payload);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Address update failed:", err);
      onValidationChange(false);
    } finally {
      setLoading(false);
    }
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
      <div className={`max-w-2xl bg-card pb-8 border-b-2 border-gray-300 pt-6 ${className}`}>
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


  return (
    <>
      {readonly ? renderReadonly() : renderForm()}

      {/* Full-page loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-black animate-spin" />
            <div className="text-white text-lg font-medium">Saving...</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessAddressValidation;
