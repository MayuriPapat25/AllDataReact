import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "../../atoms/Buttons/Button";

const AddVehicle = ({ currentVehicle, onNextStep, onContinue }) => {
  const [loading, setLoading] = useState(false);

  // Vehicle selection
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showManufacturerDropdown, setShowManufacturerDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Engine selection
  const [selectedEngine, setSelectedEngine] = useState("");
  const [availableEngines, setAvailableEngines] = useState([]);

  // Mock data
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"];
  const manufacturers = ["ALFA ROMEO", "AUDI", "BMW", "BUICK TRUCK", "CADILLAC", "CHEVROLET", "FORD"];
  const models = ["TONALE AWD", "TONALE FWD", "STELVIO", "GIULIA"];
  const engines = ["L4-1.3L TURBO PLUGIN HYBRID", "L3-1.2L TURBO", "L3-1.3L TURBO"];

  const filteredYears = years.filter((year) => year.toLowerCase().includes(yearSearch.toLowerCase()));
  const filteredManufacturers = manufacturers.filter((mfr) =>
    mfr.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );
  const filteredModels = models.filter((model) => model.toLowerCase().includes(modelSearch.toLowerCase()));

  const handleYearSelect = async (year) => {
    setLoading(true);
    setSelectedYear(year);
    setShowYearDropdown(false);
    setYearSearch("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  const handleManufacturerSelect = async (manufacturer) => {
    setLoading(true);
    setSelectedManufacturer(manufacturer);
    setShowManufacturerDropdown(false);
    setManufacturerSearch("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  const handleModelSelect = async (model) => {
    setLoading(true);
    setSelectedModel(model);
    setShowModelDropdown(false);
    setModelSearch("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAvailableEngines(engines);
    setLoading(false);
  };

  const handleEngineSelect = async (engine) => {
    setLoading(true);
    setSelectedEngine(engine);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);

    // Trigger next step in StepContentDIYCart
    // if (onNextStep) onNextStep();
    onContinue();
  };

  return (
    <>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Vehicle Year */}
          <div>
            <label className="block text-sm mb-2">Vehicle Year</label>
            <div className="relative">
              <Button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                size="sm"
                className="w-full border border-gray-300 px-3 py-2 text-left flex items-center justify-between hover:border-gray-400"
              >
                <span className={selectedYear ? "text-black" : "text-gray-500"}>
                  {selectedYear || "SELECT YEAR"}
                </span>
              </Button>

              {showYearDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="SELECT YEAR"
                        value={yearSearch}
                        onChange={(e) => setYearSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {filteredYears.map((year) => (
                    <Button
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      size="sm"
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
            <label className="block text-sm mb-2">Vehicle Manufacturer</label>
            <div className="relative">
              <Button
                onClick={() => setShowManufacturerDropdown(!showManufacturerDropdown)}
                disabled={!selectedYear}
                size="sm"
                className="w-full border border-gray-300 px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                <span className={selectedManufacturer ? "text-black" : "text-gray-500"}>
                  {selectedManufacturer || "SELECT MANUFACTURER"}
                </span>
              </Button>

              {showManufacturerDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="SELECT MANUFACTURER"
                        value={manufacturerSearch}
                        onChange={(e) => setManufacturerSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {filteredManufacturers.map((mfr) => (
                    <Button
                      key={mfr}
                      onClick={() => handleManufacturerSelect(mfr)}
                      size="sm"
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
            <label className="block text-sm mb-2">Vehicle Model</label>
            <div className="relative">
              <Button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                disabled={!selectedManufacturer}
                size="sm"
                className="w-full border border-gray-300 px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                <span className={selectedModel ? "text-black" : "text-gray-500"}>
                  {selectedModel || "SELECT MODEL"}
                </span>
              </Button>

              {showModelDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="SELECT MODEL"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {filteredModels.map((model) => (
                    <Button
                      key={model}
                      onClick={() => handleModelSelect(model)}
                      size="sm"
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
            <label className="block text-sm font-semibold mb-2">Available Engines</label>
            <div className="space-y-3">
              {availableEngines.map((engine) => (
                <div key={engine} className="flex items-center gap-3">
                  <div className="flex-1 border border-gray-300 px-4 py-2">{engine}</div>
                  <Button
                    type="button"
                    onClick={() => handleEngineSelect(engine)}
                    variant="outline"
                    size="sm"
                    className="border-2 btn btn-primary text-primary hover:bg-orange-50 font-semibold"
                  >
                    SELECT
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-[100%] test-primary animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVehicle;
