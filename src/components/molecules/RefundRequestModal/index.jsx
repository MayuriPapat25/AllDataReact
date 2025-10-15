import { useState } from "react";
import { X } from "lucide-react";
import { Button } from '../../atoms/Buttons/Button';


const RefundRequestModal = ({ isOpen, onClose, vehicleInfo, onComplete }) => {
  const [reason, setReason] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason) {
      alert("Please select a reason for refund");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      onComplete();
      setShowSuccess(false);
      setReason("");
    }, 3000);
  };

  const handleCancel = () => {
    setReason("");
    onClose();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
          <Button
            onClick={() => {
              setShowSuccess(false);
              onClose();
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </Button>

          <h2 className="text-2xl font-bold mb-6 text-center">REFUND REQUEST SUBMITTED</h2>

          <div className="text-center text-gray-600 mb-6">
            <p className="mb-4">Your refund request has been submitted successfully.</p>
            <p className="text-sm">
              Refund requests that meet the{" "}
              <a href="#" className="test-primary hover:underline">
                Subscription Rules
              </a>{" "}
              will be processed automatically. You will receive an email confirmation once your refund has been
              processed. Please allow 7-10 days for your financial institution to add these funds to your account.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="px-8 py-2 border-2 border-blue-600 test-primary bg-white hover:bg-blue-50 font-semibold"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full p-8 relative">
        <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">NEED A REFUND?</h2>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Sorry to hear you're not happy with the ALLDATA DIY subscription.
          </p>
          <p className="text-sm text-gray-700 font-medium mb-1">
            L4-2.0L Turbo for your{" "}
            <span className="font-semibold">{vehicleInfo || "2022 Audi A3 Quattro Coupe 4S (F8P)"}</span>
          </p>
          <p className="text-xs text-gray-500 text-right">=Fields are required</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Reason for Refund</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-Select-</option>
            <option value="missing-info">Missing Vehicle Information</option>
            <option value="incorrect-product">Purchased Incorrect Product</option>
            <option value="poor-value">Poor Value for money</option>
            <option value="difficult">Difficult to use</option>
            <option value="no-longer-needed">No longer needed</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-600 leading-relaxed">
            Refund requests that meet the{" "}
            <a href="#" className="test-primary hover:underline">
              Subscription Rules
            </a>{" "}
            will be processed automatically. You will receive an email confirmation once your refund has been processed.
            Please allow 7-10 days for your financial institution to add these funds to your account.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-8 py-2 border-2 border-blue-600 test-primary bg-white hover:bg-blue-50 font-semibold"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-8 py-2 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RefundRequestModal;
