import React, { useEffect, useRef } from "react";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessInformationFields } from "../../../shared/constants/businessInformationFields";
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

  const dropdownDefaults = {
    titleOfAuthorizedSigner: "manager", // matches options in businessInformationFields
    shopType: "general-repair",
    ownershipType: "sole-proprietor",
  };
  // Add tax-related defaults so form has the keys initialized
  const taxDefaults = {
    taxExempt: false, // boolean flag when "MY BUSINESS IS TAX EXEMPT" is chosen
    taxIdNumber: "",
    taxCertificate: null, // could be a File object or a string (uploaded URL) depending on your DynamicForm
  };

  const storeDataRef = useRef(storeData);
  useEffect(() => {
    storeDataRef.current = storeData;
  }, [storeData]);


  const startingValues = {
    ...dropdownDefaults,
    ...taxDefaults,
    ...(storeData || {}),
    ...(initialData && Object.keys(initialData).length ? initialData : {}),
  };

  // single source of truth for the form
  const form = useForm({
    mode: "onBlur",
    defaultValues: startingValues,
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  const initialUsedRef = useRef(false); // tracks if we've initialized/reset already
  const prevInitialJSON = useRef(null); // track last initialData JSON to detect real changes


  // ⬅️ update form when parent provides initialData or on coming back
  useEffect(() => {
    const baseStore = storeDataRef.current || {};

    const currentInitial = (
      initialData && Object.keys(initialData).length)
      ? {
        ...dropdownDefaults,
        ...taxDefaults,
        ...baseStore,
        ...initialData
      } : {
        ...dropdownDefaults,
        ...taxDefaults,
        ...baseStore
      };
    const currentJSON = JSON.stringify(currentInitial);

    // On first mount: initialize (if startingValues provided)
    if (!initialUsedRef.current) {
      if (currentInitial && Object.keys(currentInitial).length) reset(currentInitial);
      initialUsedRef.current = true;
      prevInitialJSON.current = currentJSON;
      return;
    }

    // On subsequent renders: only reset when incoming initialData prop actually changed
    if (currentJSON !== prevInitialJSON.current) {
      reset(currentInitial);
      prevInitialJSON.current = currentJSON;
    }
    // Note: intentionally do NOT watch storeData here to avoid feedback loop
  }, [initialData, reset]);

  // preserve your existing validation watcher
  useEffect(() => {
    const cleanup = handleWatchEffect(watch, trigger, getValues, onValidationChange, setValue);
    return cleanup;
  }, [watch, trigger, getValues, onValidationChange, setValue]);

  const normalizeCertificate = (cert) => {
    if (!cert) return null;

    // If DynamicForm already gave you an uploaded URL or an object with url
    if (typeof cert === "string") return cert; // e.g. uploaded URL or id token
    if (cert && typeof cert === "object") {
      // If we already stored metadata object (name + url + id), keep it
      if (cert.url || cert.id) {
        return cert;
      }
      // If it's a FileList, pick first file
      if (typeof FileList !== "undefined" && cert instanceof FileList) {
        cert = cert.length ? cert[0] : null;
      }
      // If it's a File object, return metadata — but be aware: this can't repopulate input
      if (typeof File !== "undefined" && cert instanceof File) {
        return { name: cert.name, size: cert.size, type: cert.type, _needsUpload: true };
      }
      // Otherwise return object as-is
      return cert;
    }
    return null;
  };

  // Keep autosave behavior: update store on every change (debounced)
  const debouncedDispatch = useDebounce((values) => {
    if (!values || typeof values !== "object") return;

    // Normalize taxExempt from "true"/"false"/boolean → boolean
    const maybeTaxExempt = values.taxExempt;

    const taxExempt =
      typeof maybeTaxExempt === "string"
        ? maybeTaxExempt === "true"
        : !!maybeTaxExempt;

    const taxIdValue =
      values.taxIdNumber ??
      values.tax_id_number ??
      values.tax_id ??
      values.taxId ??
      undefined;

    const cert = values.taxCertificate ?? values.tax_certificate ?? null;
    const normalizedCert = normalizeCertificate(cert);

    const merged = {
      ...(storeDataRef.current || {}),
      ...values,
    };

    if (taxIdValue !== undefined) {
      merged.taxIdNumber = taxIdValue;
      delete merged.tax_id_number;
      delete merged.tax_id;
    }

    if (normalizedCert !== null) {
      merged.taxCertificate = normalizedCert;
      delete merged.tax_certificate;
    } else if (storeDataRef.current && storeDataRef.current.taxCertificate) {
      // keep the existing persisted certificate (URL/metadata) if user did not actively remove it
      merged.taxCertificate = storeDataRef.current.taxCertificate;
    } else {
      merged.taxCertificate = null;
    }

    const payload = {
      authorizedSignerTitle: values.authorizedSignerTitle ?? dropdownDefaults.authorizedSignerTitle,
      shopType: values.shopType ?? dropdownDefaults.shopType,
      ownershipType: values.ownershipType ?? dropdownDefaults.ownershipType,
      ...merged,
    };

    const hasTaxId = payload.taxIdNumber !== undefined && payload.taxIdNumber !== "";
    const hasCert = !!payload.taxCertificate;

    if (!payload.taxExempt && !hasTaxId && !hasCert) {
      delete payload.taxIdNumber;
      delete payload.taxCertificate;
    }

    dispatch(setBusinessInfo(payload));
  }, 250);

  useEffect(() => {
    const subscription = watch(() => {
      const snapshot = getValues();
      debouncedDispatch(snapshot);
    });
    return () => {
      if (typeof subscription === "function") subscription();
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
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
        existingFiles={{ taxCertificate: storeData?.taxCertificate ?? startingValues.taxCertificate }}
        // optional: onSave will be called on submit (DynamicForm calls it on submit)
        onSave={(data) => {
          const payload = {
            authorizedSignerTitle: data.authorizedSignerTitle ?? dropdownDefaults.authorizedSignerTitle,
            shopType: data.shopType ?? dropdownDefaults.shopType,
            ownershipType: data.ownershipType ?? dropdownDefaults.ownershipType,
            ...data,
          };

          payload.taxIdNumber = data.taxIdNumber ?? data.tax_id_number ?? payload.taxIdNumber ?? "";

          const normalizedCert = normalizeCertificate(payload.taxCertificate ?? payload.tax_certificate ?? null);

          if (normalizedCert !== null) {
            payload.taxCertificate = normalizedCert;
            delete payload.tax_certificate;
          } else if (storeDataRef.current && storeDataRef.current.taxCertificate) {
            // If user didn't provide a new cert but we had one stored, keep it
            payload.taxCertificate = storeDataRef.current.taxCertificate;
          } else {
            payload.taxCertificate = null;
          }

          const hasTaxIdOnSave = payload.taxIdNumber !== undefined && payload.taxIdNumber !== "";
          const hasCertOnSave = !!payload.taxCertificate;
          if (!payload.taxExempt && !hasTaxIdOnSave && !hasCertOnSave) {
            delete payload.taxIdNumber;
            delete payload.taxCertificate;
            delete payload.tax_certificate;
          }

          dispatch(setBusinessInfo(payload));
        }}
      />
    </div>
  );
};

export default BusinessInformation;
