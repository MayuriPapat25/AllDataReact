import { X } from "lucide-react";
import { Button } from "../../../shared/ui/Buttons/Button";

const RefundLimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">REFUND LIMIT REACHED</h2>

        <p className="text-center text-gray-600 mb-8">
          You have reached the maximum limit for vehicle changes or refunds. For further assistance. Please{" "}
          <a href="#" className="text-blue-600 hover:underline">
            contact support.
          </a>
        </p>

        <div className="flex justify-center">
          <Button
            onClick={onClose}
            className="px-12 py-2 border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 font-semibold"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RefundLimitModal;
