import { Message } from './Message'

export default {
    title: 'Atoms/Message',
    component: Message,
    args: {
        type: 'info',
        children: 'This is an informational message.',
    },
    argTypes: {
        type: { control: 'select', options: ['info', 'success', 'warning', 'error', 'information'] },
    },
}

export const Info = {}

export const Success = {
    args: {
        type: 'success',
        children: 'Your changes have been saved successfully.',
    },
}

export const Warning = {
    args: {
        type: 'warning',
        children: 'Please double-check the entered values.',
    },
}

export const Error = {
    args: {
        type: 'error',
        children: 'Something went wrong. Please try again.',
    },
}

export const Information = {
    args: {
        type: 'information',
        children: 'Additional information message.',
    },
}


