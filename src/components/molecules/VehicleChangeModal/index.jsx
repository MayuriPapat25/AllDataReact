import { useState } from "react";
import { X, ChevronDown, Search, Loader2 } from "lucide-react";
import { Button } from "../../atoms/Buttons/Button";

const VehicleChangeModal = ({ isOpen, onClose, currentVehicle }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Vehicle selection
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showManufacturerDropdown, setShowManufacturerDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Step 2: Engine selection
  const [selectedEngine, setSelectedEngine] = useState("");
  const [availableEngines, setAvailableEngines] = useState([]);

  // Step 3: Form data
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");

  // Mock data
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"];
  const manufacturers = ["ALFA ROMEO", "AUDI", "BMW", "BUICK TRUCK", "CADILLAC", "CHEVROLET", "FORD"];
  const models = ["TONALE AWD", "TONALE FWD", "STELVIO", "GIULIA"];
  const engines = ["L4-1.3L TURBO PLUGIN HYBRID", "L3-1.2L TURBO", "L3-1.3L TURBO"];
  const reasons = ["Vehicle sold", "Vehicle traded", "Wrong vehicle selected", "Other"];

  const filteredYears = years.filter((year) => year.toLowerCase().includes(yearSearch.toLowerCase()));

  const filteredManufacturers = manufacturers.filter((mfr) =>
    mfr.toLowerCase().includes(manufacturerSearch.toLowerCase()),
  );

  const filteredModels = models.filter((model) => model.toLowerCase().includes(modelSearch.toLowerCase()));

  const handleYearSelect = async (year) => {
    setLoading(true);
    setSelectedYear(year);
    setShowYearDropdown(false);
    setYearSearch("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleManufacturerSelect = async (manufacturer) => {
    setLoading(true);
    setSelectedManufacturer(manufacturer);
    setShowManufacturerDropdown(false);
    setManufacturerSearch("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleModelSelect = async (model) => {
    setLoading(true);
    setSelectedModel(model);
    setShowModelDropdown(false);
    setModelSearch("");

    // Simulate API call to fetch engines
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAvailableEngines(engines);
    setLoading(false);
  };

  const handleEngineSelect = (engine) => {
    setSelectedEngine(engine);
    setStep(3);
  };

  const handleGoBack = () => {
    setStep(2);
    setSelectedEngine("");
  };

  const handleSubmit = async () => {
    if (!reason) {
      alert("Please select a reason for request");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedYear("");
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngine("");
    setAvailableEngines([]);
    setReason("");
    setComments("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-full w-full bg-[rgba(27,62,111,0.66)] z-[99999] block overflow-y-scroll">
      <div className="bg-white width-[65%] m-[15%] p-[50px]">
        {/* Close button */}
        <Button onClick={handleClose} className="relative float-right top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </Button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">VEHICLE CHANGE</h2>

          {/* Step 1 & 2: Vehicle and Engine Selection */}
          {(step === 1 || step === 2) && (
            <>
              <p className="text-gray-600 mb-6">
                I am electing to change the <span className="font-semibold text-gray-800">{currentVehicle}</span> to the
                following vehicle:
              </p>

              <h3 className="text-center font-bold mb-6">SELECT REPLACEMENT VEHICLE</h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Vehicle Year */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Vehicle Year</label>
                  <div className="relative">
                    <Button
                      onClick={() => setShowYearDropdown(!showYearDropdown)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left flex items-center justify-between hover:border-gray-400"
                    >
                      <span className={selectedYear ? "text-black" : "text-gray-500"}>
                        {selectedYear || "SELECT YEAR"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    {showYearDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg bg-white z-10 max-h-64 overflow-y-auto">
                        <div className="p-2 border-b border-gray-200">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="SELECT YEAR"
                              value={yearSearch}
                              onChange={(e) => setYearSearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        {filteredYears.map((year) => (
                          <Button
                            key={year}
                            onClick={() => handleYearSelect(year)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {year}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vehicle Manufacturer */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Vehicle Manufacturer</label>
                  <div className="relative">
                    <Button
                      onClick={() => setShowManufacturerDropdown(!showManufacturerDropdown)}
                      disabled={!selectedYear}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <span className={selectedManufacturer ? "text-black" : "text-gray-500"}>
                        {selectedManufacturer || "SELECT MANUFACTURER"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    {showManufacturerDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg bg-white z-10 max-h-64 overflow-y-auto">
                        <div className="p-2 border-b border-gray-200">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="SELECT MANUFACTURER"
                              value={manufacturerSearch}
                              onChange={(e) => setManufacturerSearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        {filteredManufacturers.map((mfr) => (
                          <Button
                            key={mfr}
                            onClick={() => handleManufacturerSelect(mfr)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {mfr}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vehicle Model */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Vehicle Model</label>
                  <div className="relative">
                    <Button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      disabled={!selectedManufacturer}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <span className={selectedModel ? "text-black" : "text-gray-500"}>
                        {selectedModel || "SELECT MODEL"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    {showModelDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg bg-white z-10 max-h-64 overflow-y-auto">
                        <div className="p-2 border-b border-gray-200">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="SELECT MODEL"
                              value={modelSearch}
                              onChange={(e) => setModelSearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        {filteredModels.map((model) => (
                          <Button
                            key={model}
                            onClick={() => handleModelSelect(model)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {model}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Available Engines */}
              {availableEngines.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Available Engines</h4>
                  <div className="space-y-3">
                    {availableEngines.map((engine) => (
                      <div key={engine} className="flex items-center gap-3">
                        <div className="flex-1 border border-gray-300 rounded px-4 py-2">{engine}</div>
                        <Button
                          onClick={() => handleEngineSelect(engine)}
                          variant="outline"
                          className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold"
                        >
                          SELECT
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6">
                This is a one-time change. You will be able to access the replacement vehicle upon submitting this
                request.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-8 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  CANCEL
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Reason Form */}
          {step === 3 && (
            <>
              <p className="text-gray-600 mb-2">
                You have elected to change the <span className="font-semibold text-gray-800">{currentVehicle}</span>
              </p>
              <p className="text-gray-600 mb-6">
                to the{" "}
                <span className="font-semibold text-gray-800">
                  {selectedYear} {selectedManufacturer} {selectedModel} {selectedEngine}
                </span>
                .
              </p>

              <div className="text-right text-sm text-gray-600 mb-4">=Fields are required</div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Reason for Request</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-Select-</option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2">Additional Comments</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="ADD ADDITIONAL COMMENTS"
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <p className="text-sm text-gray-600 mb-6">
                You are allowed to change the vehicle one-time per subscription. By submitting this change, you will not
                be allowed to change the vehicle again or request a refund on this subscription.
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="px-8 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  GO BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="px-8 border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50 font-semibold"
                >
                  SUBMIT
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <>
              <p className="text-gray-600 mb-6">Your one-time vehicle change has been completed.</p>

              <div className="mb-6 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Original Vehicle:</span> {currentVehicle}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">New Vehicle:</span> {selectedYear} {selectedManufacturer}{" "}
                  {selectedModel} {selectedEngine}
                </p>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                This Subscription no longer qualifies for a change of vehicle or a refund. Your one-time request was
                completed on 04 Oct 2025.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-8 border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  CLOSE
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Loader2 className="w-12 h-12 test-primary animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleChangeModal;