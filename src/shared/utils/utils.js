export function cn(...classNames) {
  return classNames.filter(Boolean).join(" ")
}

export const getTestId = (base, key) => {
  // Accept string or array
  const normalized =
    Array.isArray(key)
      ? key.filter(Boolean).join('-')
      : key?.toString().trim();

  return `${base}-${normalized}`.toLowerCase().replace(/\s+/g, '-');
};

export const addMonthsAndFormat = (monthsToAdd) => {
  const d = new Date();
  // Add months, handling month overflow
  d.setMonth(d.getMonth() + monthsToAdd);

  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// helper inside the component, above the useEffect
export const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    const cache = new Set();
    return JSON.stringify(obj, function (key, value) {
      // skip functions
      if (typeof value === 'function') return undefined;
      // skip DOM nodes (safe on SSR because we test properties)
      if (value && typeof value === 'object') {
        // DOM node heuristic: nodeType === 1 is element node
        if (value.nodeType && value.nodeType === 1) return undefined;
        // skip React fiber/stateNode circular objects by ignoring known internal props
        if (key && key.startsWith('__react')) return undefined;
      }
      // handle circular refs
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) return undefined;
        cache.add(value);
      }
      return value;
    });
  }
};

export const equalish = (a, b) => {
  if (!a || !b) return false;
  // shallow compare relevant keys we care about (tolerate undefined vs "")
  const normalize = (x) => ({
    firstName: (x.firstName ?? x.contactFirstName ?? "").trim(),
    lastName: (x.lastName ?? x.contactLastName ?? "").trim(),
    street: (x.streetAddress ?? x.street ?? x.address ?? "").trim(),
    city: (x.city ?? "").trim(),
    state: (x.state ?? "").trim(),
    zip: (x.zipCode ?? x.zip ?? "").trim(),
  });
  const A = normalize(a);
  const B = normalize(b);

  return (
    A.firstName === B.firstName &&
    A.lastName === B.lastName &&
    A.street === B.street &&
    A.city === B.city &&
    A.state === B.state &&
    A.zip === B.zip
  );
};

export const DEFAULT_BILLING_VALUES = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  unit: "",
  city: "",
  state: "",
  zipCode: "",
};

/**
 * Map a business-like object into the billing shape.
 * Handles several common key variants.
 */
export function normalizeBusinessToBilling(b = {}) {
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
}

/**
 * Shallow compare only the keys we care about.
 * Returns true if equal (for our purposes).
 */
export function shallowCompareAddresses(a = {}, b = {}, keys = ["firstName", "lastName", "streetAddress", "city", "state", "zipCode"]) {
  if (!a || !b) return false;
  return keys.every((k) => {
    const va = (a[k] ?? "").toString().trim();
    const vb = (b[k] ?? "").toString().trim();
    return va === vb;
  });
}

/**
 * Convert form/getValues object into canonical billing payload
 */
export function buildBillingPayload(values = {}) {
  return {
    firstName: values.firstName ?? "",
    lastName: values.lastName ?? "",
    streetAddress: values.streetAddress ?? values.street ?? "",
    unit: values.unit ?? "",
    city: values.city ?? "",
    state: values.state ?? "",
    zipCode: values.zipCode ?? values.zip ?? "",
  };
}

/**
 * Format readonly multiline address string for display.
 */
export function formatAddress(data) {
  if (!data) return "";
  const parts = [];
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  if (name) parts.push(name);
  if (data.streetAddress) parts.push(data.streetAddress);
  if (data.unit) parts.push(data.unit);
  const cityLine = [data.city, data.state, data.zipCode].filter(Boolean).join(", ");
  if (cityLine) parts.push(cityLine);
  return parts.join("\n");
}

/**
 * Check required fields are present and non-empty in a plain values object.
 */
export function areRequiredFieldsFilled(values = {}, requiredFields = []) {
  if (!values || !requiredFields || requiredFields.length === 0) return false;
  return requiredFields.every((k) => {
    const v = values[k];
    if (v === null || v === undefined) return false;
    if (typeof v === "string") return v.trim().length > 0;
    return Boolean(v);
  });
}