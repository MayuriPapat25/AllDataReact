
import { useState } from "react";
import { ChevronsDown, ChevronsUp, Plus, PlusIcon } from "lucide-react";
import { Button } from "../atoms/Buttons/Button";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";

const SavedPaymentMethods = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expirationMonth, setExpirationMonth] = useState("December");
  const [expirationYear, setExpirationYear] = useState("2032");
  const [isAddingNewMethod, setIsAddingNewMethod] = useState(false)
  const [cvv, setCvv] = useState("");

  const areAllFieldsFilled = expirationMonth && expirationYear && cvv.trim() !== "";

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const yearOptions = Array.from({ length: 20 }, (_, i) => {
    const year = (new Date().getFullYear() + i).toString();
    return { value: year, label: year };
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="p-0">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)</div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>

              <span className="text-sm text-gray-600 font-mono">•••• •••• •••• 1111</span>

              <div className="text-xs text-blue-600 border border-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                AUTOMATIC PAYMENTS
              </div>

              {isExpanded ? (
                <ChevronsUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronsDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="text-sm text-gray-600 mb-2 block">Expiration Date</label>
                  <div className="flex space-x-2">
                    <SelectField
                      options={monthOptions}
                      value={expirationMonth}
                      onChange={(e) => setExpirationMonth(e.target.value)}
                      className="flex-1"
                    />

                    <span className="text-gray-400 self-center">/</span>

                    <SelectField
                      options={yearOptions}
                      value={expirationYear}
                      onChange={(e) => setExpirationYear(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm text-gray-600 mb-2 block">CVV</label>
                  <InputField
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={4}
                    className="w-full"
                  />
                </div>

                <div className="md:col-span-1 flex space-x-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent ${areAllFieldsFilled ? "font-bold" : ""
                      }`}
                  >
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-50 bg-transparent">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        onClick={() => setIsAddingNewMethod(!isAddingNewMethod)}
      >
        <div className="w-5 h-5 rounded-full border border-blue-600 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </div>
        <span className="text-sm font-medium">Add New Payment Method</span>
      </button>

      {isAddingNewMethod && (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 hover:bg-gray-50 bg-transparent"
              onClick={() => setIsAddingNewMethod(false)}
            >
              Cancel
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPaymentMethods;
