import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessInformationFields } from "../../../shared/constants/businessInformationFields";
import { handleWatchEffect } from "../../../shared/utils/formUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../../../shared/translations";
import { setBusinessInfo } from "../../../store/store"; // <-- use dedicated action

// dropdown defaults (outside component so they’re stable)
const dropdownDefaults = {
  titleOfAuthorizedSigner: "manager", // matches options in businessInformationFields
  shopType: "general-repair",
  ownershipType: "sole-proprietor",
};

// simple debounce helper
const useDebounce = (fn, delay = 300) => {
  const t = useRef(null);
  const debounced = (...args) => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => {
      t.current = null;
      try {
        fn(...args);
      } catch (e) {
        console.error(e);
      }
    }, delay);
  };
  debounced.cancel = () => {
    if (t.current) {
      clearTimeout(t.current);
      t.current = null;
    }
  };
  return debounced;
};

// helper to convert File -> base64 (returns Promise<string | null>)
const fileToBase64 = (file) =>
  new Promise((res, rej) => {
    if (!file) return res(null);
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });

const BusinessInformation = forwardRef(
  ({ onValidationChange, initialData = {}, readonly = false }, ref) => {
    const dispatch = useDispatch();

    // read persisted values from store (fallback)
    const storeData = useSelector((state) => state.form?.businessInfo) ?? {};

    const initialUsedRef = useRef(false); // tracks if we've initialized/reset already
    const prevInitialJSON = useRef(null); // track last initialData JSON to detect real changes

    const startingValues = {
      ...dropdownDefaults,
      ...(storeData || {}),
      ...(initialData && Object.keys(initialData).length ? initialData : {}),
      // normalize certificate from either key so the form has a predictable field
      taxExemptCertificate:
        (initialData && (initialData.taxExemptCertificate || initialData.taxCertificate)) ||
        storeData?.taxExemptCertificate ||
        storeData?.taxCertificate ||
        null,
      // keep the legacy key present too (helps reducers that expect taxCertificate)
      taxCertificate:
        (initialData && (initialData.taxCertificate || initialData.taxExemptCertificate)) ||
        storeData?.taxCertificate ||
        storeData?.taxExemptCertificate ||
        null,
    };

    // single source of truth for the form
    const form = useForm({
      mode: "onChange",
      defaultValues: startingValues,
    });

    const { control, watch, trigger, getValues, setValue, handleSubmit, reset } =
      form;

    useEffect(() => {
      let mounted = true;
      let ran = false;

      const check = async () => {
        if (!mounted || ran) return;

        if (!initialUsedRef.current) {
          // wait shortly and try again (gives reset effect a tick)
          setTimeout(() => { if (mounted) check(); }, 20);
          return;
        }

        try {
          // run react-hook-form validation (this uses your field rules)
          const ok = await trigger();
          if (!mounted) return;

          // debug logs to inspect why validation failed
          // eslint-disable-next-line no-console
          console.debug("[BusinessInformation] initial trigger ->", { ok, values: getValues() });

          // always notify parent of the trigger result
          onValidationChange(Boolean(ok));

          // If trigger failed, attempt a "store snapshot" validation using computeIsValid (optional)
          // This helps detect mismatches between trigger() and the schema used by computeIsValid
          if (!ok && typeof computeIsValid === "function") {
            try {
              const storeSnapshot = (storeData && Object.keys(storeData).length) ? storeData : getValues();
              const altOk = computeIsValid(storeSnapshot, "businessInfo");
              // eslint-disable-next-line no-console
              console.debug("[BusinessInformation] fallback computeIsValid ->", { altOk, storeSnapshot });
              if (altOk) {
                onValidationChange(true);
              }
            } catch (e) {
              // silent
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("[BusinessInformation] validation check error", e);
          if (mounted) onValidationChange(false);
        } finally {
          ran = true;
        }
      };

      // run immediately on mount
      check();

      // return cleanup
      return () => { mounted = false; };
      // include trigger/getValues/storeData/onValidationChange in deps
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, getValues, onValidationChange, storeData]);

    // keep form in sync when initialData or storeData changes (but avoid loops)
    useEffect(() => {
      const currentInitial =
        initialData && Object.keys(initialData).length
          ? {
            ...dropdownDefaults,
            ...storeData,
            ...initialData,
          }
          : {
            ...dropdownDefaults,
            ...storeData,
          };
      const currentJSON = JSON.stringify(currentInitial);

      if (!initialUsedRef.current) {
        if (currentInitial && Object.keys(currentInitial).length) {
          reset(currentInitial);
        }
        initialUsedRef.current = true;
        prevInitialJSON.current = currentJSON;
        return;
      }

      if (currentJSON !== prevInitialJSON.current) {
        reset(currentInitial);
        prevInitialJSON.current = currentJSON;
      }
    }, [initialData, storeData, reset]);

    // preserve your existing validation watcher
    useEffect(() => {
      const cleanup = handleWatchEffect(
        watch,
        trigger,
        getValues,
        onValidationChange,
        setValue
      );
      return cleanup;
    }, [watch, trigger, getValues, onValidationChange, setValue]);

    // Keep autosave behavior: update store on every change (debounced) EXCEPT taxExemptStatus
    const debouncedDispatch = useDebounce((values) => {
      if (!values || typeof values !== "object") return;
      const payload = {
        authorizedSignerTitle:
          values.authorizedSignerTitle ?? dropdownDefaults.titleOfAuthorizedSigner,
        shopType: values.shopType ?? dropdownDefaults.shopType,
        ownershipType: values.ownershipType ?? dropdownDefaults.ownershipType,
        ...values,
      };
      // Mirror certificate to the legacy key for reducer compatibility
      if (payload.taxExemptCertificate && !payload.taxCertificate) {
        payload.taxCertificate = payload.taxExemptCertificate;
      } else if (payload.taxCertificate && !payload.taxExemptCertificate) {
        payload.taxExemptCertificate = payload.taxCertificate;
      }
      dispatch(setBusinessInfo(payload));
    }, 250);

    useEffect(() => {
      const subscription = watch((values, { name } = {}) => {
        if (name === "taxExemptStatus") return; // tax logic handled in separate effect
        if (!values || typeof values !== "object") return;
        debouncedDispatch(values);
      });

      return () => {
        if (typeof subscription === "function") subscription();
      };
    }, [watch, debouncedDispatch]);

    // ----------- On taxExemptStatus change: clear tax fields AND save full business info -----------
    useEffect(() => {
      const subscription = watch((values, { name } = {}) => {
        if (name !== "taxExemptStatus") return;

        const newStatus = values?.taxExemptStatus;

        // stop any pending autosave that might re-introduce old tax data
        if (typeof debouncedDispatch?.cancel === "function") {
          debouncedDispatch.cancel();
        }

        // 1) Explicitly clear tax-related fields in the form
        const cleanedFormValues = {
          ...(values || {}),
          taxExemptStatus: newStatus,
          taxIdNumber: "",
          taxId: "",
          taxExemptCertificate: null,
          taxCertificate: null,
        };

        // reset so the inputs re-render with blank tax fields
        reset(cleanedFormValues);

        // 2) Save the *entire* Business Information snapshot (with blank tax fields)
        //    — these explicit blanks will overwrite old values even if reducer merges.
        const payload = {
          authorizedSignerTitle:
            cleanedFormValues.authorizedSignerTitle ??
            dropdownDefaults.titleOfAuthorizedSigner,
          shopType: cleanedFormValues.shopType ?? dropdownDefaults.shopType,
          ownershipType:
            cleanedFormValues.ownershipType ?? dropdownDefaults.ownershipType,
          ...cleanedFormValues,
        };

        dispatch(setBusinessInfo(payload));
      });

      return () => {
        if (typeof subscription === "function") subscription();
      };
    }, [watch, reset, dispatch, debouncedDispatch]);

    useEffect(() => {
      // simple presence/trigger check for the fields that must be present
      const check = async () => {
        try {
          // list required keys (adjust to your schema)
          const ok = await trigger(); // runs full form validation (onBlur/onSubmit rules apply)
          onValidationChange(Boolean(ok));
        } catch (e) {
          onValidationChange(false);
        }
      };

      // call once on mount to reflect default state
      check();

      // optionally watch specific fields and re-check
      const sub = watch((vals, { name } = {}) => {
        // only re-run check for relevant fields to avoid noisy triggers
        if (!name) return;
        // list of keys you care about
        const keys = ["businessName", "authorizedSignerTitle", "ownershipType"];
        if (keys.includes(name)) {
          check();
        }
      });

      return () => { if (typeof sub === "function") sub(); };
    }, [watch, trigger, onValidationChange]);

    // ---------- helpers ----------
    const getCertData = (cert) => {
      if (!cert) return null;
      if (typeof cert === "string") {
        return {
          name: cert.split("/").pop() || "certificate",
          url: cert,
          type: cert.startsWith("data:")
            ? cert.split(":")[1].split(";")[0]
            : undefined,
          size: undefined,
        };
      }
      const name = cert.name || cert.fileName || "certificate";
      const url = cert.dataUrl || cert.url || null;
      const type = cert.type || undefined;
      const size = cert.size || cert.fileSize || undefined;
      return { name, url, type, size };
    };

    const storedCertObj =
      storeData?.taxExemptCertificate ?? storeData?.taxCertificate ?? null;

    const cert = getCertData(storeData);
    const taxExemptStatus = storeData?.taxExemptStatus || "";
    const taxIdNumber = storeData?.taxIdNumber || storeData?.taxId || "";

    const formatBytes = (bytes) => {
      if (!bytes && bytes !== 0) return "";
      const sizes = ["Bytes", "KB", "MB", "GB"];
      if (bytes === 0) return "0 Bytes";
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]
        }`;
    };

    const handleRemoveCertificate = () => {
      const ok =
        window.confirm(
          translations?.confirm_delete_certificate ||
          "Remove uploaded certificate?"
        );
      if (!ok) return;
      const updated = { ...storeData };
      updated.taxExemptCertificate = null;
      updated.taxCertificate = null;
      dispatch(setBusinessInfo(updated));
      // Also reset the form field so UI updates (if your reducer does not change immediately)
      setValue("taxExemptCertificate", null);
    };

    const saveBusinessInfo = async (data) => {
      const fileFieldName = "taxExemptCertificate";
      const prepared = { ...data };

      const maybeFile = data[fileFieldName];
      const file =
        maybeFile instanceof File
          ? maybeFile
          : maybeFile instanceof FileList
            ? maybeFile[0]
            : Array.isArray(maybeFile) && maybeFile[0] instanceof File
              ? maybeFile[0]
              : null;

      if (file) {
        try {
          const b64 = await fileToBase64(file);
          prepared[fileFieldName] = {
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl: b64,
          };
        } catch (err) {
          prepared[fileFieldName] = {
            name: file.name,
            size: file.size,
            type: file.type,
            error: true,
          };
        }
      }

      const payload = {
        authorizedSignerTitle:
          prepared.authorizedSignerTitle ??
          dropdownDefaults.titleOfAuthorizedSigner,
        shopType: prepared.shopType ?? dropdownDefaults.shopType,
        ownershipType:
          prepared.ownershipType ?? dropdownDefaults.ownershipType,
        ...prepared,
      };
      // Mirror certificate to the legacy key
      if (payload.taxExemptCertificate && !payload.taxCertificate) {
        payload.taxCertificate = payload.taxExemptCertificate;
      } else if (payload.taxCertificate && !payload.taxExemptCertificate) {
        payload.taxExemptCertificate = payload.taxCertificate;
      }
      dispatch(setBusinessInfo(payload));
    };

    useImperativeHandle(ref, () => ({
      saveNow: async () => {
        const currentValues = getValues();
        await saveBusinessInfo(currentValues);
      },
    }));

    // Otherwise always show the editable DynamicForm (pre-filled from storeData via reset/defaults)
    return (
      <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300 p-6">
        <div className="mb-6 flex justify-between text-center">
          <h2 className="mb-1 text-md">
            {translations?.business_information}
          </h2>
          {/* <p className="text-sm text-muted-foreground">
            | = `{translations?.fields_are_required}`
          </p> */}
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
          onSave={saveBusinessInfo}
        />
      </div>
    );
  }
);

export default BusinessInformation;
