import { InputWithButton } from './InputWithButton'

export default {
    title: 'Atoms/InputWithButton',
    component: InputWithButton,
    args: {
        placeholder: 'Enter promo code',
        buttonText: 'Apply',
        disabled: false,
    },
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
}

export const Default = {}

export const Disabled = {
    args: {
        disabled: true,
    },
}


