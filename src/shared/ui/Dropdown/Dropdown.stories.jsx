import { useState } from 'react'
import { Dropdown } from './Dropdown'

export default {
    title: 'Atoms/Dropdown',
    component: Dropdown,
    args: {
        label: 'Select an option',
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' },
        ],
        value: '1',
    },
}

export const Default = {
    render: (args) => {
        const [val, setVal] = useState(args.value)
        return <Dropdown {...args} value={val} onValueChange={setVal} />
    },
}

export const NoLabel = {
    args: { label: '' },
    render: (args) => {
        const [val, setVal] = useState(args.value)
        return <Dropdown {...args} value={val} onValueChange={setVal} />
    },
}


