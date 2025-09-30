import { PriceDisplay } from './index'

export default {
    title: 'Atoms/PriceDisplay',
    component: PriceDisplay,
    args: {
        price: '$225.67',
        note: 'per month',
    },
}

export const Default = {}

export const WithoutNote = {
    args: {
        note: '',
    },
}


