
import { useState } from "react";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp, Plus, PlusIcon, Search } from "lucide-react";
import { Button } from "../atoms/Buttons/Button";
import InputField from "../atoms/InputField";
import SearchSelectField from "../atoms/SearchSelectField";

const SavedPaymentMethods = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expirationMonth, setExpirationMonth] = useState("December");
  const [expirationYear, setExpirationYear] = useState("2032");
  const [isAddingNewMethod, setIsAddingNewMethod] = useState(false);
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

  const [formData, setFormData] = useState({
    // Billing address fields
    billingStreetAddress: "",
    billingUnit: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingAddressSame: true,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputFieldBlur = (field) => (e) => {
    validateField(field, e.target.value);
  };

  return (
    <div className="mx-auto space-y-6">

      <div className="p-0">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)</div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>

            <span className="text-sm text-gray-600 font-mono">•••• •••• •••• 1111</span>

            <div className="text-xs text-primary border border-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              AUTOMATIC PAYMENTS
            </div>

            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="text-sm text-gray-600 mb-2 block">Expiration Date</label>
                <div className="flex space-x-2">
                  <SearchSelectField
                    options={monthOptions}
                    value={expirationMonth}
                    onChange={(e) => setExpirationMonth(e.target.value)}
                    className="flex-1"
                  />

                  <span className="text-gray-400 self-center">/</span>

                  <SearchSelectField
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
                  className={`text-primary border-blue-600 hover:bg-blue-50 bg-transparent ${areAllFieldsFilled ? "font-bold" : ""
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


      <button
        className="flex items-center space-x-2 text-primary hover:text-blue-700 transition-colors"
        onClick={() => setIsAddingNewMethod(!isAddingNewMethod)}
      >
        <div className="w-5 h-5 rounded-full border border-blue-600 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </div>
        <span className="text-sm font-medium">Add New Payment Method</span>
      </button>

      {isAddingNewMethod && (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4">

          {/* Default card check box */}
          <>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked="true"
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-gray-600 text-sm">
                Use as default card for automatic payments
              </label>
            </div>
          </>

          {/* Billing Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <label className="text-sm font-medium text-gray-700 pt-2">Billing Address</label>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <InputField
                  type="checkbox"
                  id="billingAddressSame"
                  checked={formData.billingAddressSame}
                  onChange={(e) => handleInputChange("billingAddressSame", e.target.checked)}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="billingAddressSame" className="text-gray-600 text-sm">
                  My billing address is the same as my shop address.
                </label>
              </div>

              {/* Show billing address form when checkbox is unchecked */}
              {!formData.billingAddressSame && (
                <div className="space-y-4">
                  {/* Street Address */}
                  <InputField
                    label="Street Address"
                    id="billingStreetAddress"
                    value={formData.billingStreetAddress || ""}
                    onChange={(e) => handleInputChange("billingStreetAddress", e.target.value)}
                    onBlur={handleInputFieldBlur("billingStreetAddress")}
                    className="w-full border-gray-300"
                    placeholder="6011 E ADAMS ST 123 BLOCK A"
                    disabled={true}
                  />

                  {/* Unit, Suite, Apartment */}
                  <InputField
                    label="Unit, Suite, Apartment, etc."
                    id="billingUnit"
                    value={formData.billingUnit || ""}
                    onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                    className="w-full border-gray-300"
                    optional={true}
                    disabled={true}
                  />

                  {/* City */}
                  <InputField
                    label="City"
                    id="billingCity"
                    value={formData.billingCity || ""}
                    onChange={(e) => handleInputChange("billingCity", e.target.value)}
                    onBlur={handleInputFieldBlur("billingCity")}
                    className="w-full border-gray-300"
                    placeholder="BAY SAINT LOUIS"
                    disabled={true}
                  />

                  {/* State and ZIP Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      id="billingCity"
                      value={formData.billingCity || ""}
                      onChange={(e) => handleInputChange("billingCity", e.target.value)}
                      onBlur={handleInputFieldBlur("billingCity")}
                      className="w-full border-gray-300"
                      placeholder="Mississippi"
                      disabled={true}
                    />

                    <InputField
                      label="Zip Code"
                      id="billingZipCode"
                      value={formData.billingZipCode || ""}
                      onChange={(e) => handleInputChange("billingZipCode", e.target.value)}
                      onBlur={handleInputFieldBlur("billingZipCode")}
                      className="w-full border-gray-300"
                      placeholder="39520-8373"
                      disabled={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Terms and condition */}
          <>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-gray-600 text-sm">
                I agree to ALLDATA´s Payment Terms and Conditions.
              </label>
            </div>
          </>
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
