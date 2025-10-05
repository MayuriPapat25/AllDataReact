
import React from 'react';
import { X } from "lucide-react";
import { Button } from '../../atoms/Buttons/Button';

const VehicleChangeLimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative p-8">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">VEHICLE CHANGE LIMIT REACHED</h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            You have reached the maximum limit for vehicle changes or refunds. For further assistance. Please{" "}
            <a href="#" className="text-blue-600 hover:underline">
              contact support
            </a>
            .
          </p>

          <div className="flex justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-12 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold bg-transparent"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleChangeLimitModal;