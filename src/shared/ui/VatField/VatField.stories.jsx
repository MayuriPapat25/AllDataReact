import React from 'react';
import { VatField } from './index'; // Adjust the import path as necessary

// --- Metadata ---
export default {
    title: 'Forms/VatField',
    component: VatField,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'The label displayed above the input field.',
        },
        countryPrefix: {
            control: 'text',
            description: 'The country code prefix displayed before the input.',
        },
        placeholder: {
            control: 'text',
            description: 'The placeholder text inside the input.',
        },
        error: {
            control: 'text',
            description: 'The error message displayed below the input.',
        },
        required: {
            control: 'boolean',
            description: 'Displays an implicit "Required" label (not used by this component yet, but good for completeness).',
        },
        optional: {
            control: 'boolean',
            description: 'Displays an "Optional" tag next to the label.',
        },
        className: {
            control: 'text',
            description: 'Custom CSS classes for the input element.',
            table: { disable: true },
        },
    },
    args: {
        label: 'VAT Identification Number',
        placeholder: 'e.g., 123456789',
        countryPrefix: 'DE',
        error: '',
        required: false,
        optional: false,
    }
};

// --- Story Template ---
const Template = (args) => <VatField {...args} />;

// -----------------------------------------------------------------------------
// ## Stories
// -----------------------------------------------------------------------------

// 1. Primary/Default State
export const Default = Template.bind({});
Default.args = {
    // Uses default args defined in the export default object
};

// 2. Filled State (Value provided)
export const Filled = Template.bind({});
Filled.args = {
    defaultValue: '123456789',
};

// 3. With Error State
export const WithError = Template.bind({});
WithError.args = {
    label: 'Company VAT ID',
    error: 'Invalid VAT number format.',
    defaultValue: '12345',
};

// 4. Optional Field State
export const OptionalField = Template.bind({});
OptionalField.args = {
    optional: true,
};

// 5. Different Country Prefix
export const CustomPrefix = Template.bind({});
CustomPrefix.args = {
    countryPrefix: 'FR',
    placeholder: 'e.g., 98765432100',
};

// 6. No Label
export const NoLabel = Template.bind({});
NoLabel.args = {
    label: '',
};

// 7. Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
    defaultValue: '999888777',
    disabled: true,
    label: 'Archived VAT ID',
};

// 8. Without Country Prefix (though component logic ensures a prefix is shown if `countryPrefix` is truthy)
// To fully remove the prefix, you'd typically pass null/undefined, but the component uses 'DE' as a default.
// Let's explicitly set it to an empty string to see how the component handles a non-truthy value (it should disappear).
export const NoPrefix = Template.bind({});
NoPrefix.args = {
    countryPrefix: '',
    label: 'Simple ID Field',
};