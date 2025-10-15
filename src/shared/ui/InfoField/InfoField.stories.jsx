import InfoField from './index'

export default {
    title: 'Atoms/InfoField',
    component: InfoField,
    args: {
        label: 'Username',
        value: 'john.doe',
        className: '',
    },
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        className: { control: 'text' },
    },
}

export const Default = {}

export const LongText = {
    args: {
        value: 'This is a long value that should wrap properly and demonstrate how the component handles long content without breaking the layout.',
    },
}


