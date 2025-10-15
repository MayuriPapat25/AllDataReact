
import { useState } from "react";
import { X, Wrench, Users, Target, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import InputFieldWithoutBorder from "../../../shared/ui/InputField/InputFieldWithoutBorder";
import repairIcon from "../../../assets/images/repair_color.png"
import { ProductName } from "../../../shared/ui/TextIcon/ProductName"
import { CounterDropdown } from "../../../shared/ui/Dropdown/CounterDropdown"
import { Button } from "../../../shared/ui/Buttons/Button";

const SubscriptionManager = () => {
  const [isRemovalModalOpen, setIsRemovalModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    phoneNumber: "",
    email: "",
  });

  const services = [
    {
      id: "repair",
      name: "Repair",
      icon: <Wrench className="w-5 h-5" />,
      accessPoints: 1,
      hasRemoveButton: true,
    },
    {
      id: "community",
      name: "Community",
      icon: <Users className="w-5 h-5" />,
      accessPoints: 1,
      hasRemoveButton: false,
      includedText: "Included with Repair",
    },
    {
      id: "find-a-fix",
      name: "Find A Fix",
      icon: <Target className="w-5 h-5" />,
      accessPoints: 1,
      hasRemoveButton: false,
      includedText: "Included with Repair",
    },
    {
      id: "estimator",
      name: "Estimator",
      icon: <Plus className="w-5 h-5" />,
      accessPoints: 1,
      hasRemoveButton: false,
      includedText: "Included with Repair",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitRequest = () => {
    console.log("Submitting removal request:", formData);
    setIsRemovalModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleCancel = () => {
    setIsRemovalModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      phoneNumber: "",
      email: "",
    });
  };

  const [cartItems, setCartItems] = useState([
    { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 1 },
    { id: "basic-diagnostics", name: "Basic Diagnostics", type: "diagnostics", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Mobile" },
    { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 1 },
    { id: "community", name: "Community", type: "community", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
    { id: "estimator", name: "Estimator", type: "estimator", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
  ])

  const handleAccessPointChange = (itemId, newValue) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, accessPoints: newValue } : item))
  }

  return (
    <div className="mx-auto p-6 space-y-4 shadow-lg bg-white">
      {services.map((item, index) => (
        <div
          key={item.id}
          className={`py-4 px-8 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
        >
          {/* Desktop */}
          <div className="hidden sm:grid items-center gap-4" style={{ gridTemplateColumns: "1fr 144px 1fr 100px" }}>
            <div className="flex items-center gap-3 text-md">
              <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
              <ProductName name={item.name} />
            </div>
            <div className="text-center">
              <CounterDropdown
                value={item.accessPoints}
                onChange={(value) => handleAccessPointChange(item.id, value)}
                className="flex-col"
                showLabel={true}
              />
            </div>
            <div className="text-right">
              <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
              <div className="text-sm text-gray-600">
                {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
              </div>
            </div>
            <div className="flex justify-end">
              {/* <DeleteIcon
                onClick={() => handleRemoveItem(item.id)}
                className="text-primary hover:text-error cursor-pointer"
              /> */}
              {item.includedText && <div className="text-sm text-gray-600">{item.includedText}</div>}
              {item.hasRemoveButton && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setIsRemovalModalOpen(true)}
                  className="flex items-center text-primary hover:text-error cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={repairIcon} alt="Repair Color" className="w-[30px]" />
                <ProductName name={item.name} />
              </div>
              {item.includedText && <div className="text-sm text-gray-600">{item.includedText}</div>}
              {item.hasRemoveButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRemovalModalOpen(true)}
                  className="flex items-center text-primary hover:text-error cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <CounterDropdown
                value={item.accessPoints}
                onChange={(value) => handleAccessPointChange(item.id, value)}
                className="flex-col"
                showLabel={true}
              />
              <div className="text-right">
                <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
                <div className="text-sm text-gray-500 font-light">
                  {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isRemovalModalOpen && (
        <div className="fixed inset-0 z-50 flex w-max-[1000px] mx-auto items-center justify-center p-4">
          {/* Modal overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCancel} />

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-lg bg-white w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal header */}
              <div className="relative mb-4">
                <h2 className="h3 text-primary pr-8 font-normal" style={{ fontWeight: 500 }}>
                  Requesting to Remove Repair From Subscription
                </h2>
                <Button variant="ghost" size="sm" onClick={handleCancel} className="absolute right-0 top-0 p-1 h-auto">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  This request will not automatically cancel your subscription service(s).
                </p>

                <p className="text-gray-600">
                  An agent will follow up with you within 24-48 hours* after reviewing the terms of your agreement for
                  eligibility.
                  <br />
                  *excluding weekends and holidays
                </p>

                <div className="text-right">
                  <span className="text-gray-500">=Required Fields</span>
                </div>

                <div className="space-y-4 w-[60%] mx-auto">
                  <div>
                    <label htmlFor="firstName" className="text-gray-700">
                      First Name
                    </label>
                    <InputFieldWithoutBorder
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="text-gray-700">
                      Last Name
                    </label>
                    <InputFieldWithoutBorder
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="title" className="text-gray-700">
                      Title
                    </label>
                    <InputFieldWithoutBorder
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="text-gray-700">
                      Phone Number
                    </label>
                    <InputFieldWithoutBorder
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-gray-700">
                      Email
                    </label>
                    <InputFieldWithoutBorder
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 w-[80%] mx-auto">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="btn btn-primary w-1/2"
                    size="sm"
                  >
                    CANCEL
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSubmitRequest} className="btn btn-primary w-1/2">
                    SUBMIT REQUEST
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
