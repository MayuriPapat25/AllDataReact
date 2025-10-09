import React, { useState } from 'react';
import SearchSelectField from './index'; // Adjust the import path as necessary

// --- Data Setup ---

const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
];

const largeOptionsSet = Array.from({ length: 50 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `List Item Number ${i + 1}`,
}));

// --- Storybook Component Metadata ---

export default {
    // Title for the component in the Storybook sidebar
    title: 'Forms/SearchSelectField',
    component: SearchSelectField,
    // Define arguments (props) for the component
    argTypes: {
        options: {
            control: 'object',
            description: 'An array of options: `{ value: string, label: string }[]`',
        },
        value: {
            control: 'text',
            description: 'The currently selected value.',
        },
        onChange: {
            action: 'onChange', // Displays a log in the Actions tab when this function is called
            description: 'Callback function on value change: `(e) => void`',
        },
        placeholder: {
            control: 'text',
            description: 'Text to display when no option is selected.',
        },
        className: {
            control: 'text',
            description: 'Optional CSS class for the root div.',
        },
    },
    args: {
        options: countryOptions,
        placeholder: 'Select a Country...',
        className: 'w-64', // Give the component a default width for better visualization
    }
};

// --- Story Templates ---

// A helper component to manage state for demonstration
const Template = (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value || '');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        if (args.onChange) {
            args.onChange(e); // Propagate the action for Storybook logging
        }
    };

    return (
        <SearchSelectField
            {...args}
            value={selectedValue}
            onChange={handleChange}
        />
    );
};

// --- Stories ---

/**
 * The primary story showing the component in its default, empty state.
 */
export const Default = Template.bind({});
Default.args = {
    value: '',
};

// ---

/**
 * A story demonstrating the component with a pre-selected value.
 */
export const PreSelectedValue = Template.bind({});
PreSelectedValue.args = {
    value: 'ca',
};
PreSelectedValue.storyName = 'With Pre-selected Value';

// ---

/**
 * A story using a much larger set of options to test search and scrolling performance.
 */
export const LargeDataset = Template.bind({});
LargeDataset.args = {
    options: largeOptionsSet,
    placeholder: 'Select a List Item (50 items)...',
};
LargeDataset.storyName = 'With Large Dataset';

// ---

/**
 * A story showing how the component appears when no options are provided.
 */
export const EmptyOptions = Template.bind({});
EmptyOptions.args = {
    options: [],
    placeholder: 'No options available',
};
EmptyOptions.storyName = 'With Empty Options Array';

// ---

/**
 * A story to show how a different width can be applied via the `className` prop.
 */
export const CustomWidth = Template.bind({});
CustomWidth.args = {
    className: 'w-96', // Wider component
};
CustomWidth.storyName = 'With Custom Width';