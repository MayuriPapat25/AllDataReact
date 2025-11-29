import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../../shared/translations"
import { Button } from "../../../shared/ui/Buttons/Button"
import { setBusinessAddress, setBillingAddress, setShippingAddress } from "../../../store/store"; // adjust path
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessAddressFields } from "../../../shared/constants/businessAddressFields";

const BusinessAddressReview = ({
  country = "United States",
}) => {
  const dispatch = useDispatch();
  const BusinessAddress = useSelector(state => state.form.businessAddress) ?? {};
  const BillingAddress = useSelector(state => state.form.billingAddress) ?? {};
  const ShippingAddress = useSelector(state => state.form.shippingAddress) ?? {};

  const [isEditing, setIsEditing] = useState(false);
  const [formInitialData, setFormInitialData] = useState(BusinessAddress);

  useEffect(() => {
    setFormInitialData(BusinessAddress);
  }, [BusinessAddress]);

  const handleEditClick = () => {
    setFormInitialData(BusinessAddress);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormInitialData(BusinessAddress);
  };

  const normalize = (s) => (s ?? "").toString().trim().toLowerCase();

  const addressEquals = (a, b) => {
    if (!a || !b) return false;
    return (
      normalize(a.streetAddress) === normalize(b.streetAddress) &&
      normalize(a.city) === normalize(b.city) &&
      normalize(a.state) === normalize(b.state) &&
      ((a.zipCode ?? "").toString().trim() === (b.zipCode ?? "").toString().trim())
    );
  };

  // const handleSave = (savedData) => {
  //   dispatch(setBusinessAddress(savedData));
  //   setIsEditing(false);
  // };

  const handleSave = (savedData) => {
    // savedData is the new business address
    const newBusiness = JSON.parse(JSON.stringify(savedData || {}));
    dispatch(setBusinessAddress(newBusiness));
    setIsEditing(false);

    // get current billing/shipping from selectors (already available via useSelector earlier)
    const currBilling = BillingAddress;   // use useSelector to read
    const currShipping = ShippingAddress; // use useSelector to read

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

    // If billing was same as previous business address, update billing to new business address
    if (isEqual(currBilling, formInitialData /* old business address */)) {
      // create payload shaped like billing address (repeat name fields if needed)
      const billingPayload = {
        ...currBilling,
        ...savedData
      };
      dispatch(setBillingAddress(JSON.parse(JSON.stringify(billingPayload))));
    }

    // same for shipping
    if (isEqual(currShipping, formInitialData /* old business address */)) {
      const shippingPayload = {
        ...currShipping,
        ...savedData
      };
      dispatch(setShippingAddress(JSON.parse(JSON.stringify(shippingPayload))));
    }
  };

  return (
    <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-md">{translations?.business_address}</h2>
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
            fields={businessAddressFields}
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
        <div className="max-w-2xl space-y-1 text-gray-500">
          <p className="text-sm">{BusinessAddress?.streetAddress}</p>
          <p className="text-sm">
            {BusinessAddress?.city}, {BusinessAddress?.state} {BusinessAddress?.zipCode}
          </p>
          <p className="text-sm">{country}</p>
        </div>
      )}
    </div>
  )
}

export default BusinessAddressReview