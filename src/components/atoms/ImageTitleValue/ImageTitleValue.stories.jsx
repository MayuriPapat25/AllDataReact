import ImageTitleValue from './index'

export default {
    title: 'Atoms/ImageTitleValue',
    component: ImageTitleValue,
    args: {
        name: 'ALLDATA REPAIR',
        accessPoints: 5,
        monthelyPrice: '$209.00',
        paymentFrequency: 'MONTHLY',
        isPromotionalRate: true,
        promotionMsg: 'Promotional rate applies',
        icon: true,
    },
    argTypes: {
        icon: { control: 'boolean' },
    },
}

export const Default = {}

export const WithoutIcon = {
    args: { icon: false },
}

export const AnnualPlan = {
    args: {
        monthelyPrice: '$229.00',
        paymentFrequency: 'ANNUALLY',
        isPromotionalRate: false,
        promotionMsg: '',
    },
}


