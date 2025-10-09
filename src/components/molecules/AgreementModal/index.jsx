import { useState } from "react";
import { X, ChevronDown, Search, Loader2 } from "lucide-react";
import { Button } from "../../atoms/Buttons/Button";

const AgreementModal = ({ isOpen, onClose }) => {

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 h-full w-full bg-[rgba(27,62,111,0.66)] z-[99999] block overflow-y-scroll">
            <div className="bg-white width-[65%] m-[15%] p-20">
                <div className=" flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Agreement</h2>
                    <Button onClick={handleClose} className="relative float-right right-4 text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </Button>
                </div>
                <div className="">
                    modal body with iframe
                </div>
                <div>
                    <Button onClick={handleClose} className="relative float-right right-4 text-gray-500 hover:text-gray-700">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AgreementModal;