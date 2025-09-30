import PhoneField from './index'

export default {
    title: 'Atoms/PhoneField',
    component: PhoneField,
    args: {
        label: 'Phone Number',
        required: true,
        countryCode: '+1',
        placeholder: 'Enter phone number',
    },
}

export const Default = {}

export const WithError = {
    args: {
        error: 'Please enter a valid phone number',
    },
}


