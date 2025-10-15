import { useState } from "react";
import InputField from "../../../shared/ui/InputField/index";
import SelectField from "../../../shared/ui/SelectField";
import { Button } from "../../../shared/ui/Buttons/Button";

const BillingAddressForm = ({ fromReview, onEdit }) => {
    const [formData, setFormData] = useState({
        sameAsBusinessAddress: true,
        firstName: "",
        lastName: "",
        streetAddress: "",
        unit: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const [errors, setErrors] = useState({
        streetAddress: "",
        city: "",
        zipCode: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear errors when user starts typing
        if (typeof value === "string" && errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "streetAddress":
                if (value.length < 4) {
                    error = "Please enter at least 4 characters.";
                }
                break;
            case "city":
                if (value.length < 3) {
                    error = "Please enter at least 3 characters.";
                }
                break;
            case "zipCode":
                if (value.length < 5) {
                    error = "Please enter at least 5 characters.";
                }
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleInputFieldChange = (field) => (e) => {
        const value = e.target.value;
        handleInputChange(field, value);
    };

    const handleInputFieldBlur = (field) => (e) => {
        validateField(field, e.target.value);
    };

    const stateOptions = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];

    return (
        <div className={`${!fromReview ? "max-w-4xl pt-6  pb-8 border-b-2 border-gray-300" : "max-w-2xl pt-2  pb-8 border-b-2 border-gray-300"}`}>
            {
                !fromReview ? <h2 className="text-md mb-4">BILLING ADDRESS</h2>
                    : <div className="flex items-center justify-between mb-4">
                        <h2 className="text-md">BILLING ADDRESS</h2>
                        <Button variant="ghost" size="sm" onClick={onEdit} className="text-primary text-sm font-medium">
                            EDIT
                        </Button>
                    </div>
            }

            {!fromReview ?
                <form className="space-y-6">
                    {/* Same as business address checkbox */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="sameAsBusinessAddress"
                            checked={formData.sameAsBusinessAddress}
                            onChange={(e) => handleInputChange("sameAsBusinessAddress", e.target.checked)}
                            className="w-5 h-5 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="sameAsBusinessAddress" className="text-gray-600 text-base">
                            My billing address is the same as my business address.
                        </label>
                    </div>

                    {!formData.sameAsBusinessAddress && (
                        <>
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="First Name"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    className='w-full border-gray-300 '
                                />
                                <div>
                                    <InputField
                                        label="Last Name"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className='w-full border-gray-300 '
                                    />
                                </div>
                            </div>

                            {/* Street Address */}
                            <div>
                                <InputField
                                    label="Street Address"
                                    id="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                                    onBlur={handleInputFieldBlur("streetAddress")}
                                    className='w-full border-gray-300 '
                                    error={errors.streetAddress}
                                />

                            </div>

                            {/* Unit, Suite, Apartment */}
                            <InputField
                                label="Unit, Suite, Apartment, etc."
                                id="unit"
                                value={formData.unit}
                                onChange={(e) => handleInputChange("unit", e.target.value)}
                                className='w-full border-gray-300 '
                                optional={true}
                            />

                            {/* City */}
                            <div>
                                <InputField
                                    label="City"
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    onBlur={handleInputFieldBlur("city")}
                                    className='w-full border-gray-300 '
                                    error={errors.city}
                                />
                            </div>

                            {/* State */}
                            <SelectField
                                label="State"
                                options={stateOptions}
                                value={formData.state}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                className="w-1/2 px-4 py-3 border-2 border-gray-300 rounded-none focus:border-blue-500 text-base"
                            />

                            {/* ZIP Code */}
                            <div>
                                <InputField
                                    label="ZIP Code"
                                    id="zipCode"
                                    value={formData.zipCode}
                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                    onBlur={handleInputFieldBlur("zipCode")}
                                    className='w-1/2 border-gray-300 '
                                    error={errors.zipCode}
                                    helperText="Please enter at least 5 characters."
                                />
                            </div>
                        </>
                    )}
                </form> :
                <p className="text-base text-gray-500">Same as business address</p>
            }

        </div>
    );
};

export default BillingAddressForm;