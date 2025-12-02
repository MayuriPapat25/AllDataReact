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

// helper to convert File -> base64 (returns Promise<string>)
const fileToBase64 = (file) =>
  new Promise((res, rej) => {
    if (!file) return res(null);
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });

const BusinessInformation = ({ onValidationChange, initialData = {}, readonly = false }) => {
  const dispatch = useDispatch();

  // read persisted values from store (fallback)
  const storeData = useSelector((state) => state.form?.businessInfo) ?? {};

  const initialUsedRef = useRef(false); // tracks if we've initialized/reset already
  const prevInitialJSON = useRef(null); // track last initialData JSON to detect real changes

  const dropdownDefaults = {
    titleOfAuthorizedSigner: "manager", // matches options in businessInformationFields
    shopType: "general-repair",
    ownershipType: "sole-proprietor",
  };

  const startingValues = {
    ...dropdownDefaults,
    ...(storeData || {}),
    ...(initialData && Object.keys(initialData).length ? initialData : {}),
  };

  // single source of truth for the form
  const form = useForm({
    mode: "onBlur",
    defaultValues: startingValues,
  });

  const { control, watch, trigger, getValues, setValue, handleSubmit, reset } = form;

  // keep form in sync when initialData or storeData changes (but avoid loops)
  useEffect(() => {
    const currentInitial = (initialData && Object.keys(initialData).length) ? {
      ...dropdownDefaults,
      ...storeData,
      ...initialData
    } : {
      ...dropdownDefaults,
      ...storeData
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
    const cleanup = handleWatchEffect(watch, trigger, getValues, onValidationChange, setValue);
    return cleanup;
  }, [watch, trigger, getValues, onValidationChange, setValue]);

  // Keep autosave behavior: update store on every change (debounced)
  const debouncedDispatch = useDebounce((values) => {
    if (!values || typeof values !== "object") return;
    const payload = {
      authorizedSignerTitle: values.authorizedSignerTitle ?? dropdownDefaults.authorizedSignerTitle,
      shopType: values.shopType ?? dropdownDefaults.shopType,
      ownershipType: values.ownershipType ?? dropdownDefaults.ownershipType,
      ...values,
    };
    dispatch(setBusinessInfo(payload));
  }, 250);

  useEffect(() => {
    const subscription = watch(async (values) => {
      try {
        if (!values || typeof values !== "object") return;

        const fileFieldName = "taxExemptCertificate";
        const maybeFile = values[fileFieldName];

        const prepared = { ...values };

        // handle FileList (from native <input type="file" />) or single File
        if (maybeFile) {
          const file = maybeFile instanceof File ? maybeFile
            : maybeFile instanceof FileList ? maybeFile[0]
              : Array.isArray(maybeFile) && maybeFile[0] instanceof File ? maybeFile[0]
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
        }

        debouncedDispatch(prepared);
      } catch (err) {
        console.error("autosave watch error:", err);
      }
    });

    return () => {
      if (typeof subscription === "function") subscription();
    };
  }, [watch, debouncedDispatch]);

  // ---------- helpers ----------
  const getCertData = (cert) => {
    if (!cert) return null;
    if (typeof cert === "string") {
      return {
        name: cert.split("/").pop() || "certificate",
        url: cert,
        type: cert.startsWith("data:") ? cert.split(":")[1].split(";")[0] : undefined,
        size: undefined,
      };
    }
    const name = cert.name || cert.fileName || "certificate";
    const url = cert.dataUrl || cert.url || null;
    const type = cert.type || undefined;
    const size = cert.size || cert.fileSize || undefined;
    return { name, url, type, size };
  };

  const cert = getCertData(storeData?.taxExemptCertificate);
  const taxExemptStatus = storeData?.taxExemptStatus || "";
  const taxIdNumber = storeData?.taxIdNumber || storeData?.taxId || "";

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleRemoveCertificate = () => {
    const ok = window.confirm(translations?.confirm_delete_certificate || "Remove uploaded certificate?");
    if (!ok) return;
    const updated = { ...storeData };
    delete updated.taxExemptCertificate;
    dispatch(setBusinessInfo(updated));
    // Also reset the form field so UI updates (if your reducer does not change immediately)
    setValue("taxExemptCertificate", null);
  };

  // ---------- READONLY (explicit only) ----------
  const renderReadonlyView = () => {
    const isResellerWarning =
      (taxExemptStatus && String(taxExemptStatus).toLowerCase().includes("reseller")) ||
      (cert?.name && cert.name.toLowerCase().includes("reseller"));

    return (
      <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300 p-6">
        <h3 className="text-lg font-medium mb-2">Tax Exempt Status</h3>
        <div className="text-gray-500 mb-4">{taxExemptStatus || <span className="text-gray-300">—</span>}</div>

        <h4 className="text-base font-medium mb-2">Tax Exempt Certificate</h4>
        {cert ? (
          <div className="flex items-center justify-between mb-2">
            <div>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[20px] font-semibold text-blue-800 hover:underline"
                >
                  {cert.name}
                </a>
              ) : (
                <div className="text-[20px] font-semibold text-blue-800">{cert.name}</div>
              )}
              {isResellerWarning && (
                <div className="text-sm text-gray-500 mt-1">
                  Warning: Reseller Certificate does not qualify for tax exemption.
                </div>
              )}
              {cert.size && <div className="text-sm text-gray-400 mt-1">{formatBytes(cert.size)}</div>}
            </div>

            <div>
              <button onClick={handleRemoveCertificate} className="text-sm text-gray-600 hover:underline">
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400 mb-2">No certificate uploaded</div>
        )}

        <h4 className="text-base font-medium mt-4 mb-2">Enter Your Tax ID Number</h4>
        <div className="text-[22px] text-gray-400 font-medium">{taxIdNumber || <span className="text-gray-300">—</span>}</div>
      </div>
    );
  };

  // ---------- EDITABLE form (always show when readonly prop is false) ----------
  // Render a small persisted-certificate area above the file input so users see the persisted file while editing.
  const renderEditableHeaderCert = () => {
    if (!cert) return null;
    const isResellerWarning =
      (taxExemptStatus && String(taxExemptStatus).toLowerCase().includes("reseller")) ||
      cert.name.toLowerCase().includes("reseller");

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{cert.name}</div>
          <div>
            <button onClick={handleRemoveCertificate} className="text-sm text-gray-600 hover:underline">
              Remove
            </button>
          </div>
        </div>
        {isResellerWarning && (
          <div className="text-sm text-gray-500 mt-1">Warning: Reseller Certificate does not qualify for tax exemption.</div>
        )}
        {cert.size && <div className="text-sm text-gray-400 mt-1">{formatBytes(cert.size)}</div>}
      </div>
    );
  };

  // If parent explicitly asked readonly -> show readonly view only.
  if (readonly) {
    return renderReadonlyView();
  }

  // Otherwise always show the editable DynamicForm (pre-filled from storeData via reset/defaults)
  return (
    <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300 p-6">
      <div className="mb-6 flex justify-between text-center">
        <h2 className="mb-1 text-md">{translations?.business_information}</h2>
        <p className="text-sm text-muted-foreground">| = `{translations?.fields_are_required}`</p>
      </div>

      {/* show persisted certificate above the file input so user knows a file exists */}

      <DynamicForm
        fields={businessInformationFields}
        onValidationChange={onValidationChange}
        control={control}
        watch={watch}
        trigger={trigger}
        getValues={getValues}
        setValue={setValue}
        handleSubmit={handleSubmit}
        onSave={async (data) => {
          // Ensure save also serializes file before final dispatch
          const fileFieldName = "taxExemptCertificate";
          const prepared = { ...data };

          const maybeFile = data[fileFieldName];
          const file = maybeFile instanceof File ? maybeFile
            : maybeFile instanceof FileList ? maybeFile[0]
              : Array.isArray(maybeFile) && maybeFile[0] instanceof File ? maybeFile[0]
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
              prepared[fileFieldName] = { name: file.name, size: file.size, type: file.type, error: true };
            }
          }

          const payload = {
            authorizedSignerTitle: prepared.authorizedSignerTitle ?? dropdownDefaults.authorizedSignerTitle,
            shopType: prepared.shopType ?? dropdownDefaults.shopType,
            ownershipType: prepared.ownershipType ?? dropdownDefaults.ownershipType,
            ...prepared,
          };
          dispatch(setBusinessInfo(payload));
        }}
      />
    </div>
  );
};

export default BusinessInformation;
