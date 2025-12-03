import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../../shared/translations";
import { Button } from "../../../shared/ui/Buttons/Button";
import { setBusinessAddress, setBillingAddress, setShippingAddress } from "../../../store/store";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessAddressFields } from "../../../shared/constants/businessAddressFields";

const BusinessAddressReview = ({
  country = "United States",
  fakeDelayMs = 1500,
}) => {
  const dispatch = useDispatch();
  const BusinessAddress = useSelector((state) => state.form.businessAddress) ?? {};
  const BillingAddress = useSelector((state) => state.form.billingAddress) ?? {};
  const ShippingAddress = useSelector((state) => state.form.shippingAddress) ?? {};

  const [isEditing, setIsEditing] = useState(false);
  const [formInitialData, setFormInitialData] = useState(BusinessAddress);
  const [loading, setLoading] = useState(false);

  const [formVersion, setFormVersion] = useState(0);

  useEffect(() => {
    setFormInitialData(BusinessAddress);
    setFormVersion((v) => v + 1);
  }, [BusinessAddress]);

  const maybeDelay = (ms) => (ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve());

  const handleEditClick = () => {
    setFormInitialData(BusinessAddress);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormInitialData(BusinessAddress);
  };

  // --- debounce helper (stable) ---
  const timeoutRef = useRef();
  const debounce = useCallback((fn, wait) => {
    return (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fn(...args), wait);
    };
  }, []);

  // Abort controller ref to cancel inflight requests
  const abortRef = useRef(null);

  // Map Nominatim address object to our form fields with prioritized fallbacks
  const mapNominatimToFields = (addr = {}) => {
    // Candidate order for "city"
    const cityCandidates = [
      addr.city,
      addr.town,
      addr.village,
      addr.hamlet,
      addr.suburb,
      addr.county,
      addr.region,
      addr.state,
      addr.city_district,
      addr.municipality,
    ];

    // Candidate order for "state"
    const stateCandidates = [
      addr.state,
      addr.region,
      addr.county,
      addr.state_district,
      addr.province,
      addr.country, // fallback - rare but useful
    ];

    // Candidate order for "streetAddress" (reconstruct)
    const streetParts = [
      addr.house_number,
      addr.road,
      addr.pedestrian,
      addr.footway,
      addr.neighbourhood,
      addr.building,
    ].filter(Boolean);

    const streetAddress = streetParts.join(" ").trim() || undefined;
    const city = cityCandidates.find(Boolean) || undefined;
    const state = stateCandidates.find(Boolean) || undefined;
    const zipCode = addr.postcode || undefined;

    return {
      // only return keys we care about
      ...(streetAddress ? { streetAddress } : {}),
      ...(city ? { city } : {}),
      ...(state ? { state } : {}),
      ...(zipCode ? { zipCode } : {}),
    };
  };

  // Query Nominatim for address components (streetAddress is the typed input)
  const lookupAddress = async (streetAddress) => {
    if (!streetAddress || streetAddress.trim().length < 3) return null;

    // Cancel previous fetch
    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch (e) { }
    }
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    try {
      // Include country hint to improve results
      const q = encodeURIComponent(streetAddress + (country ? `, ${country}` : ""));
      const emailParam = encodeURIComponent("papat.mayu@gmail.com"); // replace in production or set user-agent
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${q}&email=${emailParam}`;
      const resp = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        signal,
      });
      if (!resp.ok) return null;
      const results = await resp.json();
      if (!results || results.length === 0) return null;
      const address = results[0].address || {};
      return mapNominatimToFields(address);
    } catch (err) {
      if (err.name === "AbortError") {
        // aborted - not an error for UX
        return null;
      }
      console.warn("Address lookup failed", err);
      return null;
    }
  };

  const isLikelyCountry = (token) => {
    if (!token) return false;
    return /^[A-Za-z\s]+$/.test(token) && token.trim().length > 2;
  };

  const parseFromFreeformString = (str) => {
    if (!str || typeof str !== "string") return null;
    const parts = str.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length === 0) return null;

    let tokens = [...parts];

    // If last token looks like a country name, drop it
    if (tokens.length > 1 && isLikelyCountry(tokens[tokens.length - 1])) {
      tokens.pop();
    }

    // find the last token that looks like it contains digits (likely a zip)
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
      if (zipIndex - 1 >= 0) stateToken = tokens[zipIndex - 1];
      if (zipIndex - 2 >= 0) city = tokens[zipIndex - 2];
    } else {
      // fallback heuristics: use last tokens
      if (tokens.length >= 3) {
        city = tokens[tokens.length - 3];
        stateToken = tokens[tokens.length - 2];
        zip = tokens[tokens.length - 1];
      } else if (tokens.length === 2) {
        city = tokens[0];
        stateToken = tokens[1];
      } else if (tokens.length === 1) {
        city = tokens[0];
      }
    }

    // return empty strings to avoid undefined
    return {
      city: city || "",
      state: stateToken || "",
      zipCode: zip || "",
    };
  };

  // Debounced wrapper so we don't call API on every keystroke
  const debouncedLookupRef = useRef();
  useEffect(() => {
    debouncedLookupRef.current = debounce(async (val) => {
      // 1) Try Nominatim first
      const mapped = await lookupAddress(val);
      if (mapped && (mapped.city || mapped.state || mapped.zipCode)) {
        setFormInitialData((prev) => {
          const prevStreet = prev?.streetAddress;
          const merged = {
            ...(prev || {}),
            streetAddress: prevStreet && prevStreet.trim() ? prevStreet : mapped.streetAddress || prevStreet,
            ...(mapped.city ? { city: mapped.city } : {}),
            ...(mapped.state ? { state: mapped.state } : {}),
            ...(mapped.zipCode ? { zipCode: mapped.zipCode } : {}),
          };
          return merged;
        });
        // bump key so DynamicForm picks up new initialData (if it only reads on mount)
        setFormVersion((v) => v + 1);
        return;
      }

      // 2) Nominatim returned nothing — try freeform parsing
      const fallback = parseFromFreeformString(val);
      if (fallback && (fallback.city || fallback.state || fallback.zipCode)) {
        setFormInitialData((prev) => {
          const prevStreet = prev?.streetAddress;
          const merged = {
            ...(prev || {}),
            streetAddress: prevStreet && prevStreet.trim() ? prevStreet : prevStreet,
            ...(fallback.city ? { city: fallback.city } : {}),
            ...(fallback.state ? { state: fallback.state } : {}),
            ...(fallback.zipCode ? { zipCode: fallback.zipCode } : {}),
          };
          return merged;
        });
        setFormVersion((v) => v + 1);
      }
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) {
        try {
          abortRef.current.abort();
        } catch (e) { }
      }
    };
  }, [debounce, country]);

  // onFieldChange handler passed to DynamicForm
  const handleFieldChange = useCallback(
    async (fieldName, value) => {
      // update the local visible initialData so inputs stay in sync
      setFormInitialData((prev) => ({ ...(prev || {}), [fieldName]: value }));

      if (fieldName === "streetAddress") {
        // call debounced lookup
        if (debouncedLookupRef.current) debouncedLookupRef.current(value);
      }
    },
    []
  );

  const handleSave = async (savedData) => {
    setLoading(true);
    try {
      const newBusiness = JSON.parse(JSON.stringify(savedData || {}));
      dispatch(setBusinessAddress(newBusiness));
      setIsEditing(false);

      const currBilling = BillingAddress;
      const currShipping = ShippingAddress;

      const normalize = (s) => (s ?? "").toString().trim().toLowerCase();
      const isEqual = (a, b) => {
        if (!a || !b) return false;
        return (
          normalize(a.streetAddress) === normalize(b.streetAddress) &&
          normalize(a.city) === normalize(b.city) &&
          normalize(a.state) === normalize(b.state) &&
          (a.zipCode ?? "").toString().trim() === (b.zipCode ?? "").toString().trim()
        );
      };

      if (isEqual(currBilling, formInitialData)) {
        const billingPayload = {
          ...currBilling,
          ...savedData,
        };
        dispatch(setBillingAddress(JSON.parse(JSON.stringify(billingPayload))));
      }

      if (isEqual(currShipping, formInitialData)) {
        const shippingPayload = {
          ...currShipping,
          ...savedData,
        };
        dispatch(setShippingAddress(JSON.parse(JSON.stringify(shippingPayload))));
      }
      await maybeDelay(fakeDelayMs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-md">{translations?.business_address}</h2>
        {!isEditing && (
          <Button onClick={handleEditClick} className="text-primary text-sm font-medium">
            {translations?.edit}
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="mb-6">
          <DynamicForm
            key={`form-${formVersion}`}
            fields={businessAddressFields}
            initialData={formInitialData}
            onSave={handleSave}
            // NEW: DynamicForm should call this whenever any field changes
            onFieldChange={handleFieldChange}
            showValidateButton={true}
            validateLabel={translations?.save || "Save"}
          />

          <div className="flex gap-3 mt-2">
            <Button onClick={handleCancel} className="bg-gray-200 text-sm px-4 py-2">
              {translations?.cancel || "Cancel"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl space-y-1 text-gray-500">
          <p className="text-sm">{BusinessAddress?.streetAddress}</p>
          <p className="text-sm">
            {BusinessAddress?.city}, {BusinessAddress?.state} {BusinessAddress?.zipCode}
          </p>
          <p className="text-sm">{country}</p>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-black animate-spin" />
            <div className="text-white text-lg font-medium">Saving...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessAddressReview;
