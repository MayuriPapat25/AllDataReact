import BusinessAddressReview from './index'

export default {
    title: 'Atoms/BusinessAddressReview',
    component: BusinessAddressReview,
    args: {
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
        street: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        state: 'CA',
        zipCode: '94043',
        country: 'USA',
    },
}


