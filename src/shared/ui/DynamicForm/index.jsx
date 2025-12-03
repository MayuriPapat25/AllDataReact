import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../../../store/store";
import InputField from "../InputField/index";
import { useEffect, useRef } from "react";
import { fieldComponents, getValidationRules, handleWatchEffect } from "../../utils/formUtils";
import { computeIsValid } from "../../utils/validation";
import { safeStringify } from "../../utils/utils";


const deepClone = (obj) => {
  try {
    // structuredClone if available
    // eslint-disable-next-line no-undef
    if (typeof structuredClone === "function") return structuredClone(obj);
  } catch (e) { /* ignore */ }
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
};

const DynamicForm = ({
  fields = [],
  onValidationChange,
  onChange,
  defaultValues = {},
  initialData = null,
  onSave = () => { },
  className = "",
  showValidateButton = false,
  validateLabel = "Validate",
  control: externalControl,
  watch: externalWatch,
  trigger: externalTrigger,
  getValues: externalGetValues,
  setValue: externalSetValue,
  handleSubmit: externalHandleSubmit,
}) => {
  const dispatch = useDispatch();

  const formDefaultValues = deepClone(initialData !== null ? initialData : defaultValues);

  const localForm = (!externalControl)
    ? useForm({ mode: "onBlur", defaultValues: formDefaultValues })
    : null;

  const control = externalControl || (localForm && localForm.control);
  const handleSubmit = externalHandleSubmit || (localForm && localForm.handleSubmit);
  const watch = externalWatch || (localForm && localForm.watch);
  const trigger = externalTrigger || (localForm && localForm.trigger);
  const getValues = externalGetValues || (localForm && localForm.getValues);
  const setValue = externalSetValue || (localForm && localForm.setValue);
  const reset = localForm ? localForm.reset : null;
  const errors = localForm ? localForm.formState.errors : {};
  const formState = localForm ? localForm.formState : {};

  // Track previous initialData to detect changes - use a ref that resets on mount
  const prevInitialDataRef = useRef(null);

  // Reset form when initialData/defaultValues change (e.g., when user goes back to step 1)
  useEffect(() => {
    if (localForm && reset) {
      const hasInitialData = initialData !== null && initialData !== undefined && Object.keys(initialData || {}).length > 0;
      const hasDefaultValues = formDefaultValues && Object.keys(formDefaultValues || {}).length > 0;

      // Check if this is the first time we're setting data, or if data has changed
      const prevDataStr = prevInitialDataRef.current ? safeStringify(prevInitialDataRef.current) : null;
      const currentDataStr = initialData ? safeStringify(initialData) : null;
      const initialDataChanged = prevDataStr !== currentDataStr;

      // Always reset on mount if we have data, or if data changed
      if (hasInitialData || hasDefaultValues) {
        if (prevInitialDataRef.current === null || initialDataChanged) {
          reset(formDefaultValues);
          prevInitialDataRef.current = initialData;

          // Compute form validity after reset (for button enable/disable)
          // But don't trigger validation errors since fields haven't been touched yet
          if (getValues && onValidationChange) {
            setTimeout(() => {
              const values = getValues();
              const isCustomValid = computeIsValid(values);
              onValidationChange(isCustomValid);
            }, 0);
          }
        }
      } else if (prevInitialDataRef.current === null) {
        // Track that we've processed initial mount (even if no data)
        prevInitialDataRef.current = initialData;
      }
    }
  }, [localForm, reset, initialData, formDefaultValues, getValues, onValidationChange]);

  // If we own the form, we can persist on submit (keeps backward compatibility)
  const onSubmitLocal = (data) => {
    const payload = deepClone(data);
    if (onSave) onSave(payload);
  };

  useEffect(() => {
    if (!watch || !trigger || !getValues || !setValue) return;

    // Reuse your helper if you want validation effects to run
    const cleanup = handleWatchEffect(watch, trigger, getValues, onValidationChange, setValue);
    return cleanup;
  }, [watch, trigger, getValues, onValidationChange, setValue]);

  // If DynamicForm owns the form (localForm), also add a watch to call onChange prop (optional)
  useEffect(() => {
    if (!localForm || !watch) return;
    const sub = watch((values) => {
      onChange && onChange(values);
    });
    return () => sub.unsubscribe ? sub.unsubscribe() : sub;
  }, [localForm, watch, onChange]);


  // helper to trigger validation programmatically for the whole form
  const validateAll = async () => {
    if (!trigger) return false;
    // trigger() without args will validate all registered fields
    const result = await trigger();
    return result;
  };


  // choose submit handler: if parent passed handleSubmit, they will call their submit; else use local onSubmitLocal
  const submitHandler = localForm
    ? localForm.handleSubmit(onSubmitLocal)
    : (externalHandleSubmit ? externalHandleSubmit(onSave) : undefined);

  return (
    <form onSubmit={submitHandler} className="max-w-2xl mb-6 space-y-6">
      <div className="inline-flex flex-wrap justify-between align-top">
        {fields.map((field) => {

          // resolve component from mapping (falls back to InputField)
          const ResolvedComponent = fieldComponents[field.type] || InputField;
          const validationRules = getValidationRules(field, watch ? watch("password") : undefined);

          if (field.conditional && watch) {
            const watchValue = watch(field.conditional.field);
            if (watchValue !== field.conditional.equals) {
              return null;
            }
          }

          const isDisabled =
            (field.name === "billingEmail" && watch && watch("usePrimaryEmail") === "primary") ||
            field.disabled; // optional static disabled support

          const wrapperClass = ["firstName", "lastName", "phoneNumber", "phoneType", "authorizedSignerFirstName", "authorizedSignerlastName", "titleOfAuthorizedSigner", "shopType", "ownershipType"].includes(field.name)
            ? "w-[49%]"
            : "w-full";

          return (
            <div
              key={field.name}
              className={wrapperClass}
            >
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                rules={validationRules}
                render={({ field: fieldProps, fieldState: { error, isTouched, isDirty } }) => {
                  const { onChange: fieldOnChange, onBlur, value, name: fieldName } = fieldProps;
                  const shouldShowError = (isTouched || isDirty) && !!error;

                  // use the resolved component for all types (file, radio, select, etc.)
                  // but make small adjustments for file-type and default value coercion.

                  // --- FILE type: pass null when no value (do not coerce to empty string) ---
                  if (field.type === "file") {
                    return (
                      <ResolvedComponent
                        id={fieldName}
                        label={field.label}
                        accept={field.accept}
                        required={field.required}
                        helperText={field.helperText}
                        value={value ?? null} // important: keep object/File/null, don't coerce to ""
                        error={shouldShowError}
                        errorText={shouldShowError ? error?.message : undefined}
                        className={field.className}
                        onChange={(fileOrPersisted) => {
                          // fileOrPersisted can be: File | null | persisted object | string
                          fieldOnChange(fileOrPersisted);

                          // propagate to parent's onChange with current form values
                          if (onChange && typeof getValues === "function") {
                            try {
                              const allVals = deepClone(getValues());
                              onChange(allVals);
                            } catch (e) {
                              onChange({ [field.name]: fileOrPersisted });
                            }
                          }
                        }}
                      />
                    );
                  }

                  // --- DEFAULT: use ResolvedComponent for all other field types ---
                  // Give it a string value fallback (so InputField/selects get expected "")
                  return (
                    <ResolvedComponent
                      id={fieldName}
                      label={field.label}
                      options={field.options}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={value ?? ""}
                      onChange={(valOrEvent) => {
                        const actualValue =
                          valOrEvent && valOrEvent.target !== undefined
                            ? valOrEvent.target.value
                            : valOrEvent;
                        fieldOnChange(actualValue);
                        if (onChange && typeof getValues === "function") {
                          try {
                            const allVals = deepClone(getValues());
                            onChange(allVals);
                          } catch (e) {
                            onChange({ [field.name]: actualValue });
                          }
                        }
                      }}
                      onBlur={onBlur}
                      error={shouldShowError}
                      errorText={shouldShowError ? error?.message : undefined}
                      helperText={field.helperText}
                      type={field.type}
                      optional={field?.optional}
                      disabled={isDisabled}
                      inputMode={field.inputMode}
                      maxLength={field.maxLength}
                      onKeyPress={field.onKeyPress}
                      className={field.className}
                    />
                  );
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Validate button: renders only when showValidateButton is true */}
      {showValidateButton && (
        <div className="pt-4">
          <button
            type="button"
            onClick={async () => {
              const ok = await validateAll();
              if (ok && submitHandler) {
                // call the same handler as form submit
                submitHandler();
              }
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700"
          >
            {validateLabel}
          </button>
        </div>
      )}
    </form>
  );
};

export default DynamicForm;
