import InputFieldWithoutBorder from './InputFieldWithoutBorder';
// Assuming you have defined the prop types for your component
// import type { Meta, StoryObj } from '@storybook/react'; 
// If using TypeScript, replace @storybook/react with your framework, e.g., @storybook/react-vite

// Storybook Component Meta
const meta = {
    title: 'Forms/InputFieldWithoutBorder', // Defines the location in the sidebar
    component: InputFieldWithoutBorder,
    tags: ['autodocs'], // Automatically generate documentation page
    // Define default values for props (args) that will be inherited by all stories
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        id: 'email-input',
        type: 'text',
        onChange: (e) => console.log('Input changed:', e.target.value),
    },
    argTypes: {
        // Customize how props are displayed/controlled in the Storybook UI
        onChange: { action: 'changed' },
        error: { control: 'text' },
        helperText: { control: 'text' },
        type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
    },
};

export default meta;


export const Default = {
    // args will inherit from meta.args
    args: {
        required: false,
        optional: false,
    },
};

export const Required = {
    args: {
        ...Default.args,
        label: 'Required Field',
        required: true,
    },
};

export const Optional = {
    args: {
        ...Default.args,
        label: 'Username',
        placeholder: 'Enter a preferred username',
        optional: true,
    },
};


export const WithHelperText = {
    args: {
        ...Default.args,
        helperText: 'We will never share your email with anyone else.',
    },
};



export const ErrorState = {
    args: {
        ...Default.args,
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        error: 'Password must be at least 8 characters long.',
    },
};

export const NumberInput = {
    args: {
        label: 'Quantity',
        placeholder: 'Enter a number',
        id: 'quantity-input',
        type: 'number',
    },
};