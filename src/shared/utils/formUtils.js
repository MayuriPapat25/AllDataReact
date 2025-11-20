import InputField from "../ui/InputField/index";
import PhoneField from "../ui/PhoneNumberField/index";
import PasswordField from "../ui/InputField/PasswordField";
import { computeIsValid, isPasswordStrong } from "../utils/validation";
import { emailRegex } from "../utils/regex";
import CustomRadioGroupField from "../../components/molecules/CustomRadioGroupField";
import FileUpload from '../ui/FileUpload';
import SelectField from "../ui/SelectField";
import AutoCompleteInput from "../ui/AutoCompleteInput";

export const fieldComponents = {
  text: InputField,
  email: InputField,
  username: InputField,
  phone: PhoneField,
  password: PasswordField,
  file: FileUpload,
  select: SelectField,
  radio: CustomRadioGroupField, 
  autocomplete: AutoCompleteInput,
};

export const getValidationRules = (field, password) => {
  let validationRules = { required: field.errorMessage };

  if (field.type === "email") {
    validationRules.pattern = { value: emailRegex, message: field.errorMessage };
  }

  if (field.type === "phone") {
    validationRules.validate = (value) => {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        return field.errorMessage || "Please enter at least 10 digits.";
      }
      return true;
    };
  }

  if (field.type === "password") {
    validationRules.validate = (value) => {
      if (!value || value.length < 8)
        return "Password must be at least 8 characters long.";
      if (!isPasswordStrong(value))
        return field.helperText;
      return true;
    };
  }

  if (field.name === "confirmPassword") {
    validationRules.validate = (value) => value === password || field.errorMessage;
  }

  return validationRules;
};

export const handleWatchEffect = (watch, trigger, getValues, onValidationChange, setValue, ) => {
   const maybeSubscription = watch(async (value, info) => {
    // Don't trigger validation here - react-hook-form will validate on blur automatically
    // since we set mode: "onBlur" in useForm
    // This watch is only for computing overall form validity for button enable/disable
    
    const values = getValues();
     // --------------------------
    // Handle Billing Email Logic
    // --------------------------
    const primaryEmail = "kiwow31027@inupup.com";
    const usePrimaryEmail = values?.usePrimaryEmail;
    const billingEmail = values?.billingEmail;

    // If user selected "use primary email", set it automatically
    if (usePrimaryEmail === "primary" && billingEmail !== primaryEmail) {
      setValue("billingEmail", primaryEmail);
    }

    // If user deselects radio, clear the email field
    if (usePrimaryEmail !== "primary" && billingEmail === primaryEmail) {
      setValue("billingEmail", "");
    }

    // --------------------------
    // Compute form-level validity (without triggering field errors)
    // This is for button enable/disable, not for showing error messages
    // --------------------------
    const isCustomValid = computeIsValid(values);
    onValidationChange?.(isCustomValid);
  });
  return () => {
    if (maybeSubscription && typeof maybeSubscription.unsubscribe === "function") {
      maybeSubscription.unsubscribe();
    }
  };
};
