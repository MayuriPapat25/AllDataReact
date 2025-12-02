import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setShippingAddress } from "../../../store/store";
import { useMemo } from "react";
import { translations } from "../../../shared/translations";
import { Button } from "../../../shared/ui/Buttons/Button";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { shippingAddressFields } from "../../../shared/constants/shippingAddressFields";

const clone = (obj) => {
  // use structuredClone if available (preserves more types), fallback to JSON deep copy
  try {
    // eslint-disable-next-line no-undef
    if (typeof structuredClone === "function") return structuredClone(obj);
  } catch (e) { }
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
};

const ShippingAddressReview = ({
  country = "United States",
  fakeDelayMs = 1500,
}) => {
  const dispatch = useDispatch();

  const ShippingAddress = useSelector(state => state.form.shippingAddress)
  const BusinessAddress = useSelector(state => state.form.businessAddress)

  const [isEditing, setIsEditing] = useState(false);
  const [formInitialData, setFormInitialData] = useState(ShippingAddress);
  const [loading, setLoading] = useState(false);

  const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

  useEffect(() => {
    setFormInitialData(ShippingAddress);
  }, [ShippingAddress]);

  const handleEditClick = () => {
    setFormInitialData(ShippingAddress);
    setIsEditing(true);
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      setIsEditing(false);
      setFormInitialData(clone(ShippingAddress));
      await maybeDelay(fakeDelayMs)
    } finally {
      setLoading(false)
    }
  };

  const handleSave = async (savedData) => {
    setLoading(true)
    try { // make a deep clone to avoid accidental shared references
      const payload = JSON.parse(JSON.stringify(savedData || {}));
      dispatch(setShippingAddress(payload));
      setFormInitialData(payload);
      setIsEditing(false);
      await maybeDelay(fakeDelayMs)
    }
    finally {
      setLoading(false)
    }
  };

  const isSameAsBusiness = useMemo(() => {
    if (!ShippingAddress || !BusinessAddress) return false;

    const normalize = (s) =>
      (s ?? "").toString().trim().toLowerCase();

    return (
      normalize(ShippingAddress.city) === normalize(BusinessAddress.city) &&
      normalize(ShippingAddress.state) === normalize(BusinessAddress.state) &&
      normalize(ShippingAddress.streetAddress) === normalize(BusinessAddress.streetAddress) &&
      (ShippingAddress.zipCode ?? "").toString().trim() === (BusinessAddress.zipCode ?? "").toString().trim()
    );
  }, [ShippingAddress, BusinessAddress]);

  return (
    <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-md">{translations?.shipping_address}</h2>
        {!isEditing && (
          <Button
            // variant="outline"
            onClick={handleEditClick}
            className="text-primary text-sm font-medium"
          >
            {translations?.edit}
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="mb-6">
          <DynamicForm
            fields={shippingAddressFields}
            initialData={formInitialData}
            // onSave receives the final data (your DynamicForm will call onSave after dispatch)
            onSave={handleSave}
            // optional: show a Validate button if you want explicit validate+save behavior
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
        <>
          {isSameAsBusiness ? (
            <div className="max-w-2xl space-y-1 text-gray-500">
              <p className="text-sm">
                {translations?.same_as_business_address || "Same as business address"}
              </p>
            </div>
          ) : (
            <div className="max-w-2xl space-y-1 text-gray-500">
              <p className="text-sm">{ShippingAddress?.firstName} {ShippingAddress?.lastName}</p>
              <p className="text-sm">{ShippingAddress?.streetAddress}</p>
              <p className="text-sm">
                {ShippingAddress?.city}, {ShippingAddress?.state} {ShippingAddress?.zipCode}
              </p>
              <p className="text-sm">{country}</p>
            </div>
          )}
        </>
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
  )
}

export default ShippingAddressReview