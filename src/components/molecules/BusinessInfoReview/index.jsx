import { Button } from "../../../shared/ui/Buttons/Button"
import InfoField from "../../../shared/ui/InfoField"

const BusinessInfoReview = ({
    businessData = {
        businessName: "test",
        phoneNumber: "7016176368",
        signerFirstName: "Hinal",
        signerLastName: "Modo",
        signerTitle: "test",
        signerEmail: "hinal.parikh@qed42.com",
        businessType: "Education",
        ownershipType: "Corporation",
        taxExemptStatus: "My business is not tax exempt",
    },
    onEdit,
}) => {
    return (
        <div className="max-w-2xl border-b-2 border-gray-300 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-md">BUSINESS INFORMATION</h2>
                {onEdit && (
                    <Button
                        variant="outline"
                        onClick={onEdit}
                        className="text-primary text-sm font-medium"
                    >
                        EDIT
                    </Button>
                )}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-y-6 max-w-md">
                <InfoField label="Business/Shop Name" value={businessData.businessName || "Not provided"} />

                <InfoField label="Business/Shop Phone Number" value={businessData.phoneNumber || "Not provided"} />

                <InfoField label="Authorized Signer First Name" value={businessData.signerFirstName || "Not provided"} />

                <InfoField label="Authorized Signer Last Name" value={businessData.signerLastName || "Not provided"} />

                <InfoField label="Title Of Authorized Signer" value={businessData.signerTitle || "Not provided"} />

                <InfoField label="Authorized Signer Email Address" value={businessData.signerEmail || "Not provided"} />

                <InfoField label="Business/Shop Type" value={businessData.businessType || "Not provided"} />

                <InfoField label="Ownership Type" value={businessData.ownershipType || "Not provided"} />

                <InfoField label="Tax Exempt Status" value={businessData.taxExemptStatus || "Not provided"} />
            </div>
        </div>
    )
}

export default BusinessInfoReview
