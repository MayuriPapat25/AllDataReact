import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../../shared/translations"
import { Button } from "../../../shared/ui/Buttons/Button"
import InfoField from "../../../shared/ui/InfoField"
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessInformationFields } from "../../../shared/constants/businessInformationFields";
import { setBusinessInfo } from "../../../store/store"; // adjust path if needed

const BusinessInfoReview = ({ phoneNumber }) => {
    const dispatch = useDispatch();
    const businessData = useSelector(state => state.form.businessInfo) ?? {};
    const [isEditing, setIsEditing] = useState(false);
    const [formInitialData, setFormInitialData] = useState(businessData);

    useEffect(() => {
        setFormInitialData(businessData);
    }, [businessData]);

    const handleEditClick = () => {
        setFormInitialData(businessData);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormInitialData(businessData);
    };

    const handleSave = (savedData) => {
        dispatch(setBusinessInfo(savedData));
        setIsEditing(false);
    };

    const taxExemptDisplay =
        businessData.taxExemptStatus === true
            ? "My business is tax exempt"
            : "My business is not tax exempt";

    return (
        <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-md">{translations?.business_information}</h2>
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
                        fields={businessInformationFields}
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
                <div className="grid grid-cols-1 gap-y-6 max-w-md">
                    <InfoField label="Business/Shop Name" value={businessData.businessName} />

                    <InfoField label="Business/Shop Phone Number" value={phoneNumber} />

                    <InfoField label="Authorized Signer First Name" value={businessData.authorizedSignerFirstName} />

                    <InfoField label="Authorized Signer Last Name" value={businessData.authorizedSignerlastName} />

                    <InfoField label="Title Of Authorized Signer" value={businessData.titleOfAuthorizedSigner} />

                    <InfoField label="Authorized Signer Email Address" value={businessData.authorizedSignerEmailAddress} />

                    <InfoField label="Business/Shop Type" value={businessData.shopType} />

                    <InfoField label="Ownership Type" value={businessData.ownershipType} />

                    <InfoField label="Tax Exempt Status" value={
                        businessData.taxExemptStatus === true
                            ? "My business is tax exempt"
                            : "My business is not tax exempt"
                    } />
                    {
                        taxExemptDisplay == " My business is tax exempt" &&
                        <>
                            <InfoField label={translations?.tax_exempt_certificate} value={businessData?.taxExemptCertificate?.name} />
                            <p className="text-xs">Warning: Reseller Certificate does not qualify for tax exemption.</p>
                            <InfoField label={translations?.tax_id_number} value={businessData?.taxIdNumber} />
                        </>
                    }

                </div>
            )}
        </div>
    )
}

export default BusinessInfoReview
