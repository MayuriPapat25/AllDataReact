import React from 'react';
import AccountSettings from './AccountSettings'; // Adjust path as necessary

// --- Mocking Dependencies ---
// Since your component imports other components, you'll need to mock them
// for a clean Storybook build, especially if they rely on context or global state.
// For simplicity here, we'll assume basic mock implementations exist or you can
// use the actual imports if they are simple presentation components.

// Assuming simple placeholder components for the purpose of the story
const InfoText = (props) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-900">{props.label}</span>
        <span className="text-primary-600">{props.value || props.billStatus}</span>
    </div>
);
const InputFieldWithoutBorder = (props) => (
    <input type="text" value={props.value} placeholder={props.label} disabled={props.disabled} className="border p-2 w-full" />
);
const SelectField = (props) => (
    <select value={props.value} disabled={props.disabled} className="border p-2">
        <option value="">{props.label}</option>
        {props.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
);
const PriceText = (props) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-900">{props.label}</span>
        <span className="font-bold">{`$${props.amount.toFixed(2)}`}</span>
    </div>
);
const SavedPaymentMethods = () => <div>[SavedPaymentMethods Component]</div>;
const UpdateAccoutDetails = () => <div>[UpdateAccoutDetails Component]</div>;

// In a real project, you would import the actual component logic 
// or use global mocks in .storybook/preview.js

// A wrapper component to control the initial state for the stories
const AccountSettingsWrapper = (initialFormData) => {
    // We'll create a local component that is a copy of your original, 
    // but we'll override the initial state based on the story's needs.
    // NOTE: This is a common pattern for components with complex internal state.
    const [formData, setFormData] = React.useState({
        companyName: initialFormData.companyName || "Test Shop",
        status: initialFormData.status || "Active",
        shopName: initialFormData.shopName || "TEST SHOP",
        streetAddress: initialFormData.streetAddress || "6011 E ADAMS ST 123 BLOCK A",
        unit: initialFormData.unit || "",
        city: initialFormData.city || "BAY SAINT LOUIS",
        state: initialFormData.state || "MISSISSIPPI",
        zipCode: initialFormData.zipCode || "39520-8373",
        phoneNumber: initialFormData.phoneNumber || "(228) 467-1234",
        billingAddressSame: initialFormData.billingAddressSame !== undefined ? initialFormData.billingAddressSame : true,
        mailingAddressSame: initialFormData.mailingAddressSame !== undefined ? initialFormData.mailingAddressSame : true,
        emailAddress: initialFormData.emailAddress || "admin@gmail.com",
        billingStreetAddress: initialFormData.billingStreetAddress || "",
        billingUnit: initialFormData.billingUnit || "",
        billingCity: initialFormData.billingCity || "",
        billingState: initialFormData.billingState || "",
        billingZipCode: initialFormData.billingZipCode || "",
        mailingStreetAddress: initialFormData.mailingStreetAddress || "",
        mailingUnit: initialFormData.mailingUnit || "",
        mailingCity: initialFormData.mailingCity || "",
        mailingState: initialFormData.mailingState || "",
        mailingZipCode: initialFormData.mailingZipCode || "",
    });

    // The rest of your component's logic and return JSX goes here...
    // For the sake of this example, we'll just re-use the full component 
    // but acknowledge that an original component that accepts an initial state prop
    // is a better pattern for testability.

    // Since we cannot easily modify your original component's internal logic 
    // *in the story file*, we will render the original component as-is for simplicity
    // and acknowledge that it will always start with its hardcoded default state. 
    // For a real-world story, you would refactor AccountSettings to accept a prop 
    // for its initial state.

    // For now, we will just render the original component as our basic story.
    return <AccountSettings />;
};

// --- Storybook Metadata (Meta) ---

export default {
    title: 'Pages/AccountSettings',
    component: AccountSettings,
    // Add decorators if needed, e.g., to add a global CSS wrapper
    decorators: [(Story) => (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Story />
        </div>
    )],
    parameters: {
        // Optional: Add parameters like a layout style
        layout: 'fullscreen',
    },
    // If you use TypeScript, you would define StoryObj here.
    // type Story = StoryObj<typeof AccountSettings>;
};

// --- Stories (Named Exports) ---

/**
 * The default state of the AccountSettings page, representing a shop 
 * where billing and mailing addresses are the same as the shop address.
 */
export const DefaultView = () => <AccountSettings />;


/**
 * A state where the user has explicitly unchecked the 
 * "Billing Address is the same as Shop Address" checkbox.
 * * NOTE: Since the component manages its own state, we simulate this by 
 * creating a copy of the component logic with a modified initial state.
 * In a real application, you'd modify the component to accept an 'initialData' prop.
 */
export const DifferentBillingAddress = () => {
    // For a stateful component, the best practice is to refactor it to accept
    // an optional `initialData` prop. Since we can't, this story will demonstrate 
    // the scenario by using an alternate component that is pre-wired to the state.

    // For demonstration, we'll hardcode the full component with modified state here.
    // In a real project, you would import a refactored AccountSettings component.
    const DifferentAddressComponent = () => {
        // This is a direct copy of your original component, but with a different initial state
        const [formData, setFormData] = React.useState({
            companyName: "Test Shop",
            status: "Active",
            shopName: "TEST SHOP",
            streetAddress: "6011 E ADAMS ST 123 BLOCK A",
            unit: "",
            city: "BAY SAINT LOUIS",
            state: "MISSISSIPPI",
            zipCode: "39520-8373",
            phoneNumber: "(228) 467-1234",
            // --- Key change for this story ---
            billingAddressSame: false,
            mailingAddressSame: true,
            // ---------------------------------
            emailAddress: "admin@gmail.com",
            // Billing address fields (visible because billingAddressSame is false)
            billingStreetAddress: "123 Main St",
            billingUnit: "Apt 4B",
            billingCity: "NEW YORK",
            billingState: "NEW YORK",
            billingZipCode: "10001",
            // Mailing address fields
            mailingStreetAddress: "",
            mailingUnit: "",
            mailingCity: "",
            mailingState: "",
            mailingZipCode: "",
        });

        const [errors, setErrors] = React.useState({});

        const handleInputChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

        const handleInputFieldBlur = (field) => (e) => {
            console.log(`Field ${field} blurred with value:`, e.target.value);
        };

        const paymentMethodOptions = [
            { value: '***1111', label: '***1111' },
            { value: '***2222', label: '***2222' },
        ];

        // --- Render logic copied from your original component ---
        return (
            <>
                <UpdateAccoutDetails />

                {/* Account Information */}
                <div className="shadow-lg bg-white">
                    <div className="space-y-6">
                        {/* Company Name - Read Only */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <label>Company Name</label>
                            <div className="md:col-span-2">
                                <span className="text-gray-900">{formData.companyName}</span>
                            </div>
                        </div>

                        {/* Status - Read Only */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <label>Status</label>
                            <div className="md:col-span-2">
                                <span className="text-gray-900">{formData.status}</span>
                            </div>
                        </div>

                        {/* Shop Name */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Shop Name</label>
                            <div className="md:col-span-2">
                                <InputFieldWithoutBorder
                                    id="shopName"
                                    value={formData.shopName}
                                    onChange={(e) => handleInputChange("shopName", e.target.value)}
                                    className="w-full border-gray-300"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {/* Shop Address */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Shop Address</label>
                            <div className="md:col-span-2 space-y-4">
                                {/* Street Address */}
                                <InputFieldWithoutBorder
                                    label="Street Address"
                                    id="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                                    onBlur={handleInputFieldBlur("streetAddress")}
                                    className="w-full border-gray-300"
                                    error={errors.streetAddress}
                                    disabled={true}
                                />

                                {/* Unit, Suite, Apartment */}
                                <InputFieldWithoutBorder
                                    label="Unit, Suite, Apartment, etc."
                                    id="unit"
                                    value={formData.unit}
                                    onChange={(e) => handleInputChange("unit", e.target.value)}
                                    className="w-full border-gray-300"
                                    optional={true}
                                    disabled={true}
                                />

                                {/* City */}
                                <InputFieldWithoutBorder
                                    label="City"
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    onBlur={handleInputFieldBlur("city")}
                                    className="w-full border-gray-300"
                                    error={errors.city}
                                    disabled={true}
                                />

                                {/* State and ZIP Code */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputFieldWithoutBorder
                                        label="State"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange("state", e.target.value)}
                                        className="w-full border-gray-300"
                                        disabled={true}
                                    />

                                    <InputFieldWithoutBorder
                                        label="Zip Code"
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                        onBlur={handleInputFieldBlur("zipCode")}
                                        className="w-full border-gray-300"
                                        error={errors.zipCode}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Billing Address</label>
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <input
                                        type="checkbox"
                                        id="billingAddressSame"
                                        checked={formData.billingAddressSame}
                                        onChange={(e) => handleInputChange("billingAddressSame", e.target.checked)}
                                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <label htmlFor="billingAddressSame" className="text-gray-600 text-sm">
                                        My billing address is the same as my shop address.
                                    </label>
                                </div>

                                {/* Show billing address form when checkbox is unchecked */}
                                {!formData.billingAddressSame && (
                                    <div className="space-y-4">
                                        {/* Street Address */}
                                        <InputFieldWithoutBorder
                                            label="Street Address"
                                            id="billingStreetAddress"
                                            value={formData.billingStreetAddress || ""}
                                            onChange={(e) => handleInputChange("billingStreetAddress", e.target.value)}
                                            onBlur={handleInputFieldBlur("billingStreetAddress")}
                                            className="w-full border-gray-300 "
                                            placeholder="6011 E ADAMS ST 123 BLOCK A"
                                            disabled={true}
                                        />

                                        {/* Unit, Suite, Apartment */}
                                        <InputFieldWithoutBorder
                                            label="Unit, Suite, Apartment, etc."
                                            id="billingUnit"
                                            value={formData.billingUnit || ""}
                                            onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                                            className="w-full border-gray-300"
                                            optional={true}
                                            disabled={true}
                                        />

                                        {/* City */}
                                        <InputFieldWithoutBorder
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
                                            <InputFieldWithoutBorder
                                                label="City"
                                                id="billingCity"
                                                value={formData.billingCity || ""}
                                                onChange={(e) => handleInputChange("billingCity", e.target.value)}
                                                onBlur={handleInputFieldBlur("billingCity")}
                                                className="w-full border-gray-300"
                                                placeholder="Mississippi"
                                                disabled={true}
                                            />

                                            <InputFieldWithoutBorder
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

                        {/* Mailing Address */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Mailing Address</label>
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <input
                                        type="checkbox"
                                        id="mailingAddressSame"
                                        checked={formData.mailingAddressSame}
                                        onChange={(e) => handleInputChange("mailingAddressSame", e.target.checked)}
                                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <label htmlFor="mailingAddressSame" className="text-gray-600 text-sm">
                                        My mailing address is the same as my shop address.
                                    </label>
                                </div>

                                {/* Show mailing address form when checkbox is unchecked */}
                                {!formData.mailingAddressSame && (
                                    <div className="space-y-4">
                                        {/* Street Address */}
                                        <InputFieldWithoutBorder
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
                                        <InputFieldWithoutBorder
                                            label="Unit, Suite, Apartment, etc."
                                            id="billingUnit"
                                            value={formData.billingUnit || ""}
                                            onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                                            className="w-full border-gray-300"
                                            optional={true}
                                            disabled={true}
                                        />

                                        {/* City */}
                                        <InputFieldWithoutBorder
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
                                            <InputFieldWithoutBorder
                                                label="City"
                                                id="billingCity"
                                                value={formData.billingCity || ""}
                                                onChange={(e) => handleInputChange("billingCity", e.target.value)}
                                                onBlur={handleInputFieldBlur("billingCity")}
                                                className="w-full border-gray-300"
                                                placeholder="Mississippi"
                                                disabled={true}
                                            />

                                            <InputFieldWithoutBorder
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
                    </div>
                </div>

                {/* Contact Information */}
                <h5 className='py-6 font-normal text-primary' style={{ fontWeight: 500 }}>Contact Information</h5>
                <div className='shadow-lg bg-white'>
                    <div className="space-y-6">
                        {/* Account Phone No */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Account Phone Number</label>
                            <div className="md:col-span-2">
                                <InputFieldWithoutBorder
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                    onBlur={handleInputFieldBlur("phoneNumber")}
                                    className="w-full border-gray-300"
                                    error={errors.phoneNumber}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        {/* Email Add */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label>Email Address</label>
                            <div className="md:col-span-2">
                                <InputFieldWithoutBorder
                                    id="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                                    onBlur={handleInputFieldBlur("emailAddress")}
                                    className="w-full border-gray-300"
                                    error={errors.emailAddress}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        {/* Business Email Add */}
                        <div className="py-4 px-8 border-b-2 border-light-smoky-white grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <label> Business Email Address</label>
                            <div className="md:col-span-2">
                                <InputFieldWithoutBorder
                                    id="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                                    onBlur={handleInputFieldBlur("emailAddress")}
                                    className="w-full border-gray-300"
                                    error={errors.emailAddress}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* {Legal Agreements & Contracts} */}
                <h5 className='py-6 font-normal text-primary' style={{ fontWeight: 500 }}>Legal Agreements & Contracts</h5>
                <div className='shadow-lg bg-white'>
                    <div className="space-y-6">
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <InfoText
                                    label="Recent Subscription Contract"
                                    value="Download"
                                    link="/path/to/invoice.pdf"
                                    billStatus="Signed on September 23, 2025"
                                />
                            </div>
                        </div>
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <InfoText
                                    label="Recent Subscription Contract"
                                    value="Download"
                                    link="/path/to/invoice.pdf"
                                    billStatus="Signed on September 23, 2025"
                                />
                            </div>
                        </div>
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <InfoText
                                    label="Payment Notifications"
                                    billStatus="0 notifications"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automatic Payments */}
                <h5 className='py-6 font-normal text-primary' style={{ fontWeight: 500 }}>Automatic Payments</h5>
                <div className='shadow-lg bg-white'>
                    <div className="space-y-6">
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <InfoText
                                    label="Automatic Payments"
                                    billStatus="Yes"
                                />
                            </div>
                        </div>
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <SelectField
                                    label="State"
                                    options={paymentMethodOptions}
                                    value={formData.state}
                                    className="w-1/2 px-4 py-3 border-2 border-gray-300 rounded-none focus:border-primary text-base"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <PriceText amount={179.00} label="Payment Amount" />
                            </div>
                        </div>
                        <div className="border-b-2 border-light-smoky-white">
                            <div className="py-4 px-8">
                                <InfoText
                                    label="Payment Frequency"
                                    value="Monthly"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automatic Payments */}
                <h5 className='py-6 font-normal text-primary' style={{ fontWeight: 500 }}>Saved Payment Methods</h5>
                <div className='shadow-lg bg-white'>
                    <div className="bg-white">
                        <SavedPaymentMethods />
                    </div>
                </div>

                {/* Billing Cycle */}
                <h5 className='py-6 font-normal text-primary' style={{ fontWeight: 500 }}>Billing Cycle</h5>
                <div className='shadow-lg bg-white'>
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <InfoText
                                label="Invoice Due Date"
                                value="23 of the month"
                            />
                        </div>
                    </div>
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <InfoText
                                label="Current Billing Cycle"
                                value="Sep 23-Oct 22"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <DifferentAddressComponent />;
};