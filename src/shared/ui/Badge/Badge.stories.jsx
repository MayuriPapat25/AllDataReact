import { Badge } from './Badge'

export default {
    title: 'Atoms/Badge',
    component: Badge,
    args: {
        children: 'Badge',
        variant: 'default',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'success', 'warning', 'error'],
        },
        children: { control: 'text' },
    },
}

export const Default = {}

export const Success = {
    args: {
        variant: 'success',
        children: 'Success',
    },
}

export const Warning = {
    args: {
        variant: 'warning',
        children: 'Warning',
    },
}

export const Error = {
    args: {
        variant: 'error',
        children: 'Error',
    },
}

export const WithCustomClass = {
    args: {
        children: 'Pill',
        className: 'uppercase tracking-wide',
    },
}


