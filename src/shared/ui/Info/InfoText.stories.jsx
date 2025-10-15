import { InfoText } from './InfoText'

export default {
    title: 'Atoms/InfoText',
    component: InfoText,
    args: {
        label: 'Account',
        value: 'View details',
        link: '',
        billStatus: '',
    },
    argTypes: {
        link: { control: 'text' },
        billStatus: { control: 'text' },
    },
}

export const Default = {
    args: {
        label: 'Email',
        value: 'user@example.com',
    },
}

export const WithExternalLink = {
    args: {
        label: 'Documentation',
        value: 'Open docs',
        link: 'https://example.com',
    },
}

export const WithActionLink = {
    args: {
        label: 'Reset Password',
        value: 'Click to reset',
        link: () => alert('Reset password clicked'),
    },
}

export const WithBillStatus = {
    args: {
        label: 'Billing',
        value: 'Invoice #12345',
        billStatus: 'PAID',
    },
}


