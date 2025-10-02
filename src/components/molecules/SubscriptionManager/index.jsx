
import { useState } from "react";
import { X, Wrench, Users, Target, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../../atoms/Buttons/Button";
import InputField from "../../atoms/InputField";

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">{service.icon}</div>
            <span className="font-medium text-gray-900">{service.name}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Access Points</div>
              <div className="flex items-center">
                <button className="w-6 h-8 bg-gray-100 border border-r-0 border-gray-300 rounded-l flex items-center justify-center cursor-not-allowed">
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                </button>
                <div className="w-16 h-8 bg-gray-100 border-t border-b border-gray-300 flex items-center justify-center text-gray-500 cursor-not-allowed">
                  {service.accessPoints}
                </div>
                <button className="w-6 h-8 bg-gray-100 border border-l-0 border-gray-300 rounded-r flex items-center justify-center cursor-not-allowed">
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="w-40 flex items-center justify-start pt-4">
              {service.includedText && <div className="text-sm text-gray-600">{service.includedText}</div>}
              {service.hasRemoveButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRemovalModalOpen(true)}
                  className="flex items-center gap-2 text-primary border-blue-200 hover:bg-blue-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {isRemovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCancel} />

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal header */}
              <div className="relative mb-4">
                <h2 className="text-lg font-semibold text-gray-900 pr-8">
                  Requesting to Remove Repair From Subscription
                </h2>
                <Button variant="ghost" size="sm" onClick={handleCancel} className="absolute right-0 top-0 p-1 h-auto">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  This request will not automatically cancel your subscription service(s).
                </p>

                <p className="text-sm text-gray-600">
                  An agent will follow up with you within 24-48 hours* after reviewing the terms of your agreement for
                  eligibility.
                  <br />
                  *excluding weekends and holidays
                </p>

                <div className="text-right">
                  <span className="text-sm text-gray-500">=Required Fields</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <InputField
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <InputField
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <InputField
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <InputField
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <InputField
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                  >
                    CANCEL
                  </Button>
                  <Button onClick={handleSubmitRequest} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
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
