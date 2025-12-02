import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { translations } from "../../../shared/translations"
import { Button } from "../../../shared/ui/Buttons/Button"
import { setBillingAddress } from "../../../store/store";
import { billingAddressFields } from "../../../shared/constants/billingAddressFields";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { useMemo } from "react";

const BillingAddressReview = ({
  country = "United States",
  fakeDelayMs = 1500,
}) => {
  const dispatch = useDispatch();

  const BillingAddress = useSelector(state => state.form.billingAddress)
  const BusinessAddress = useSelector(state => state.form.businessAddress)

  const [isEditing, setIsEditing] = useState(false);
  const [formInitialData, setFormInitialData] = useState(BillingAddress);
  const [loading, setLoading] = useState(false);

  const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

  useEffect(() => {
    setFormInitialData(BillingAddress);
  }, [BillingAddress]);

  const handleEditClick = () => {
    setFormInitialData(BillingAddress);
    setIsEditing(true);
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      setIsEditing(false);
      setFormInitialData(BillingAddress);
      await maybeDelay(fakeDelayMs);
    } finally {
      setLoading(false)
    }
  };


  const handleSave = async (savedData) => {
    setLoading(true);
    try {
      dispatch(setBillingAddress(JSON.parse(JSON.stringify(savedData || {}))));
      setIsEditing(false);
      await maybeDelay(fakeDelayMs);
    } finally {
      setLoading(false)
    }
  };

  const isSameAsBusiness = useMemo(() => {
    if (!BillingAddress || !BusinessAddress) return false;

    const normalize = (s) =>
      (s ?? "").toString().trim().toLowerCase();

    return (
      normalize(BillingAddress.city) === normalize(BusinessAddress.city) &&
      normalize(BillingAddress.state) === normalize(BusinessAddress.state) &&
      normalize(BillingAddress.streetAddress) === normalize(BusinessAddress.streetAddress) &&
      (BillingAddress.zipCode ?? "").toString().trim() === (BusinessAddress.zipCode ?? "").toString().trim()
    );
  }, [BillingAddress, BusinessAddress]);

  return (
    <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-md">{translations?.billing_address}</h2>
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
            fields={billingAddressFields}
            initialData={formInitialData}
            onSave={handleSave}
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
              <p className="text-sm">
                {BillingAddress?.firstName} {BillingAddress?.lastName}
              </p>
              <p className="text-sm">{BillingAddress?.streetAddress}</p>
              <p className="text-sm">
                {BillingAddress?.city}, {BillingAddress?.state} {BillingAddress?.zipCode}
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
export default BillingAddressReview