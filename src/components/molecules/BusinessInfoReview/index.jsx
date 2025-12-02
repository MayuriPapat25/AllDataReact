import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../../shared/translations"
import { Button } from "../../../shared/ui/Buttons/Button"
import InfoField from "../../../shared/ui/InfoField"
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessInformationFields } from "../../../shared/constants/businessInformationFields";
import { setBusinessInfo } from "../../../store/store"; // adjust path if needed
import { useMemo } from "react";

const BusinessInfoReview = ({ phoneNumber, fakeDelayMs = 1500, }) => {
    const dispatch = useDispatch();
    const businessData = useSelector(state => state.form.businessInfo) ?? {};
    const [isEditing, setIsEditing] = useState(false);
    const [formInitialData, setFormInitialData] = useState(businessData);
    const [loading, setLoading] = useState(false);

    const maybeDelay = (ms) => ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();

    useEffect(() => {
        setFormInitialData(businessData);
    }, [businessData]);

    // derive a stable key so DynamicForm remounts when initial data changes
    const formKey = useMemo(
        () =>
            // try to keep key small-ish; if object large, consider using a hash
            JSON.stringify(formInitialData || {}),
        [formInitialData]
    );

    const handleEditClick = () => {
        setFormInitialData(deepClone(businessData));
        setIsEditing(true);
    };

    const handleCancel = async () => {
        setLoading(true);
        try {
            setIsEditing(false);
            setFormInitialData(deepClone(businessData));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (savedData) => {
        setLoading(true);
        try {
            dispatch(setBusinessInfo(savedData));
            setIsEditing(false);
            await maybeDelay(fakeDelayMs);
        } finally {
            setLoading(false);
        }
    };

    // small helper to deep clone (safe for plain objects you store in Redux)
    function deepClone(obj) {
        try {
            return obj ? JSON.parse(JSON.stringify(obj)) : {};
        } catch (e) {
            // fallback shallow clone if something non-serializable appears
            return obj ? { ...obj } : {};
        }
    }

    const formatBytes = (bytes) => {
        if (!bytes && bytes !== 0) return "";
        const sizes = ["Bytes", "KB", "MB", "GB"];
        if (bytes === 0) return "0 Bytes";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    };

    const getCertData = (cert) => {
        // cert may be:
        //  - null/undefined
        //  - string (URL or dataUrl)
        //  - object { name, dataUrl, type, size }
        if (!cert) return null;
        if (typeof cert === "string") {
            return {
                name: cert.split("/").pop() || "certificate",
                url: cert,
                type: cert.startsWith("data:") ? cert.split(":")[1].split(";")[0] : undefined,
                size: undefined,
            };
        }

        const { name, dataUrl, type, size } = cert;
        return {
            name: name || "certificate",
            url: dataUrl || cert.url || null,
            type,
            size,
        };
    };

    const cert = getCertData(businessData?.taxExemptCertificate);

    const handleDeleteCertificate = async () => {
        const ok = window.confirm(
            translations?.confirm_delete_certificate ||
            "Are you sure you want to remove the Tax Exempt Certificate?"
        );
        if (!ok) return;

        setLoading(true);
        try {
            const updated = { ...businessData };
            delete updated.taxExemptCertificate;
            dispatch(setBusinessInfo(updated));
            setFormInitialData(updated);
        } finally {
            setLoading(false);
        }
    };

    const humanTaxExemptStatus = (() => {
        if (businessData?.taxExemptStatus === "exempt") {
            return "My business is tax exempt"
        } else {
            return "My business is Not tax-exempt"
        }
    })();

    // optional reseller warning heuristics: show if a field indicates reseller or if the certificate name contains 'resell' (you can adjust)
    const showResellerWarning = (() => {
        const shopType = (businessData?.shopType || "").toString().toLowerCase();
        const certName = (cert?.name || "").toString().toLowerCase();
        if (shopType.includes("resell") || shopType.includes("resale") || certName.includes("resell") || certName.includes("resale")) {
            return true;
        }
        // developer can set businessData.isReseller boolean if available
        if (businessData?.isReseller) return true;
        return false;
    })();

    return (
        <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-md">{translations?.business_information}</h2>
                {!isEditing && (
                    <Button
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
                        key={formKey}
                        fields={businessInformationFields}
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
                <div className="grid grid-cols-1 gap-y-6 max-w-md">
                    <InfoField label="Business/Shop Name" value={businessData.businessName} />

                    <InfoField label="Business/Shop Phone Number" value={phoneNumber} />

                    <InfoField label="Authorized Signer First Name" value={businessData.authorizedSignerFirstName} />

                    <InfoField label="Authorized Signer Last Name" value={businessData.authorizedSignerlastName} />

                    <InfoField label="Title Of Authorized Signer" value={businessData.titleOfAuthorizedSigner} />

                    <InfoField label="Authorized Signer Email Address" value={businessData.authorizedSignerEmailAddress} />

                    <InfoField label="Business/Shop Type" value={businessData.shopType} />

                    <InfoField label="Ownership Type" value={businessData.ownershipType} />

                    {/* Tax Exempt status - human friendly line + small muted subtitle */}
                    <div>
                        <div className="text-sm font-medium text-gray-800">Tax Exempt Status</div>
                        <div className="text-gray-500 mt-1">{humanTaxExemptStatus}</div>
                    </div>

                    {/* Certificate preview / actions */}
                    {cert && (
                        <div>
                            <div className="text-sm font-medium text-gray-800">Tax Exempt Status</div>
                            <div className="flex items-start flex-col">
                                <span className="font-medium text-lg text-blue-950">{cert.name}</span>
                                <span className="text-sm text-gray-500 ">
                                    Warning: Reseller Certificate does not qualify for tax exemption.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Tax ID number (render label like 'Enter Your Tax ID Number' with muted small value) */}
                    {
                        businessData?.taxIdNumber && <div>
                            <div className="text-sm font-medium text-gray-800">Enter Your Tax ID Number</div>
                            <div className="text-gray-500 mt-1">{businessData?.taxIdNumber || translations?.none || "—"}</div>
                        </div>
                    }

                </div>
            )}

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Spinner */}
                        <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-black animate-spin" />
                        <div className="text-black text-lg font-medium">Saving...</div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default BusinessInfoReview
