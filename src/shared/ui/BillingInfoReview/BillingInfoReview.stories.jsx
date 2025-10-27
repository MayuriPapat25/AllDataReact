import BillingInfoReview from './index'

export default {
    title: 'Atoms/BillingInfoReview',
    component: BillingInfoReview,
    args: {
        name: 'Hinal Modi',
        street: '403 Enterprise St',
        city: 'Florence',
        state: 'AL',
        zipCode: '35630-5013',
        country: 'United States',
    },
    argTypes: {
        onEdit: { action: 'edit-clicked' },
    },
}

export const Default = {}

export const CustomAddress = {
    args: {
        name: 'Jane Doe',
        street: '1234 Elm Street Apt 56',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA',
    },
}


