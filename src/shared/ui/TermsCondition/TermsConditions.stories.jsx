import { useState } from 'react'
import TermsConditions from './index'

export default {
    title: 'Atoms/TermsConditions',
    component: TermsConditions,
    args: {
        companyName: 'ALLDATA',
        termsUrl: '#',
        privacyUrl: '#',
    },
}

export const Default = {
    render: (args) => {
        const [checked, setChecked] = useState(false)
        return <TermsConditions {...args} checked={checked} onCheckedChange={setChecked} />
    },
}

export const Prechecked = {
    render: (args) => {
        const [checked, setChecked] = useState(true)
        return <TermsConditions {...args} checked={checked} onCheckedChange={setChecked} />
    },
}


