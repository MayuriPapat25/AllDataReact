import { PriceText } from './PriceText'

export default {
    title: 'Atoms/PriceText',
    component: PriceText,
    args: {
        amount: 225.67,
        label: 'Total Due Today',
        isTotal: true,
        isDiscount: false,
    },
    argTypes: {
        amount: { control: 'number' },
    },
}

export const Total = {}

export const Subtotal = {
    args: {
        label: 'Subtotal',
        isTotal: false,
        amount: 248.0,
    },
}

export const Discount = {
    args: {
        label: 'Discount',
        isDiscount: true,
        amount: -12.4,
    },
}


