import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../translations"
import { Button } from "../Buttons/Button"
import { setBusinessAddress } from "../../../store/store"; // adjust path
import DynamicForm from "../DynamicForm";
import { businessAddressFields } from "../../constants/businessAddressFields";

const BusinessAddressReview = ({
  country = "United States",
  onEdit,
}) => {
  const dispatch = useDispatch();
  const BusinessAddress = useSelector(state => state.form.businessAddress) ?? {};

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

  const handleSave = (savedData) => {
    dispatch(setBusinessAddress(savedData));
    setIsEditing(false);
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
            {BusinessAddress?.city}, {BusinessAddress?.state} {BusinessAddress?.zip}
          </p>
          <p className="text-sm">{country}</p>
        </div>
      )}
    </div>
  )
}

export default BusinessAddressReview