import { useState } from 'react'
import { HorizontalRadio } from './horRadio'

export default {
    title: 'Atoms/HorizontalRadio',
    component: HorizontalRadio,
    args: {
        value: 'monthly',
    },
}

export const Default = {
    render: (args) => {
        const [val, setVal] = useState(args.value)
        return <HorizontalRadio {...args} value={val} onChange={setVal} />
    },
}

export const AnnuallySelected = {
    render: (args) => {
        const [val, setVal] = useState('annually')
        return <HorizontalRadio {...args} value={val} onChange={setVal} />
    },
}


