import React, { useState } from "react";
import { useSelector } from "react-redux"
import { translations } from "../../translations"
import { Button } from "../Buttons/Button"
import billingForm from '../../../assets/images/billingform.png'

const BillingInfoReview = ({
    country = "United States",
    onEdit,
}) => {
    const ShippingAddress = useSelector(state => state.form.shippingAddress)
    const [mode, setMode] = useState("readonly"); // 'readonly' | 'imageEdit'

    const handleEditClick = () => {
        // switch to image + update button view
        setMode("imageEdit");
    };

    const handleUpdateClick = () => {
        // do any update logic (call callback) then go back to readonly view
        setMode("readonly");
    };

    return (
        <div className="border-b-2 border-gray-300 pb-8 max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-md">{translations?.billing_information}</h2>


                {mode === "readonly" && (
                    <Button
                        variant="ghost"
                        onClick={handleEditClick}
                        className="text-primary text-sm font-medium"
                    >
                        {translations?.edit}
                    </Button>
                )}
            </div>


            {mode === "readonly" && (
                <>
                    <div className="space-y-1 text-gray-500 mb-1">
                        <p className="text-sm text-black">{translations?.payment_type}</p>
                        <p className="text-sm text-black">Credit Card</p>
                    </div>
                    <p className="text-sm text-black">{translations?.address}</p>
                    <p className="text-sm">{ShippingAddress?.streetAddress}</p>
                    <p className="text-sm">
                        {ShippingAddress?.city}, {ShippingAddress?.state} {ShippingAddress?.zip}
                    </p>
                    <p className="text-sm">{country}</p>
                </>
            )}


            {mode === "imageEdit" && (
                <div className="space-y-4">
                    <div className="rounded p-4 bg-white">
                        <img src={billingForm} alt="Editing billing info" className="w-full max-w-xl object-contain" />
                    </div>

                    <Button
                        type="button"
                        onClick={handleUpdateClick}
                        className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Update
                    </Button>
                </div>
            )}
        </div>
    )
}

export default BillingInfoReview