import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { translations } from "../../translations"
import { Button } from "../Buttons/Button"
import { setBillingAddress } from "../../../store/store";
import { billingAddressFields } from "../../constants/billingAddressFields";
import DynamicForm from "../DynamicForm";
import { useMemo } from "react";

const BillingAddressReview = ({
  // country = "United States",
}) => {
  const dispatch = useDispatch();

  const BillingAddress = useSelector(state => state.form.billingAddress)
  const BusinessAddress = useSelector(state => state.form.businessAddress)

  const [isEditing, setIsEditing] = useState(false);
  const [formInitialData, setFormInitialData] = useState(BillingAddress);

  useEffect(() => {
    setFormInitialData(BillingAddress);
  }, [BillingAddress]);

  const handleEditClick = () => {
    setFormInitialData(BillingAddress);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormInitialData(BillingAddress);
  };

  const handleSave = (savedData) => {
    dispatch(setBillingAddress(JSON.parse(JSON.stringify(savedData || {}))));
    setIsEditing(false);
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
              <p className="text-sm">
                {BillingAddress?.firstName} {BillingAddress?.lastName}
              </p>
              <p className="text-sm">{BillingAddress?.streetAddress}</p>
              <p className="text-sm">
                {BillingAddress?.city}, {BillingAddress?.state} {BillingAddress?.zipCode}
              </p>
              {/* <p className="text-sm">{country}</p> */}
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default BillingAddressReview