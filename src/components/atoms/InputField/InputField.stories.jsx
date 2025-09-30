import InputField from './index'

export default {
    title: 'Atoms/InputField',
    component: InputField,
    args: {
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
        error: '',
        helperText: '',
    },
    argTypes: {
        type: { control: 'text' },
        error: { control: 'text' },
        helperText: { control: 'text' },
    },
}

export const Default = {}

export const WithError = {
    args: {
        error: 'This field is required',
    },
}

export const WithHelper = {
    args: {
        helperText: 'We will never share your email.',
    },
}


