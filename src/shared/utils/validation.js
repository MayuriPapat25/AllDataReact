// shared/utils/validation.js
import { emailRegex, phoneRegex, passwordRegex } from "./regex";

// export const computeIsValid = (data) => {
//   if (!data) return false;

//   const emailOk = !!data.email && emailRegex.test(data.email);
//   const phoneOk = !!data.phone && data.phone.replace(/\D/g, "").length >= 10;
//   const usernameOk = !!data.username && data.username.length >= 6;
//   const passwordOk = passwordRegex.test(data.password || "");
//   const confirmOk =
//     !!data.confirmPassword && data.confirmPassword === data.password;

//   return emailOk && phoneOk && usernameOk && passwordOk && confirmOk;
// };
export const computeIsValid = (data, formType) => {
  if (!data) return false;

  switch (formType) {
    case "account":
      return (
        !!data.email &&
        emailRegex.test(data.email) &&
        !!data.phone &&
        data.phone.replace(/\D/g, "").length >= 10 &&
        !!data.username &&
        data.username.length >= 6 &&
        passwordRegex.test(data.password || "") &&
        data.confirmPassword === data.password
      );

    case "businessInfo":
      return !!data.businessName && !!data.taxId;

    case "businessAddress":
      return !!data.address && !!data.city && !!data.state && !!data.zip;

    case "billingEmail":
      return !!data.billingEmail && emailRegex.test(data.billingEmail);

    default:
      return Object.values(data).every((v) => v !== "" && v !== null);
  }
};
// Require all 4 conditions
export const isPasswordStrong = (password = "") => {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%&?,*]/.test(password);

  return password.length >= 8 && hasLower && hasUpper && hasNumber && hasSymbol;
};