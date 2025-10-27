import { useState } from 'react'
import { CounterDropdown } from './CounterDropdown'

export default {
    title: 'Atoms/CounterDropdown',
    component: CounterDropdown,
    args: {
        value: 1,
    },
}

export const Default = {
    render: (args) => {
        const [val, setVal] = useState(args.value)
        return <CounterDropdown {...args} value={val} onChange={setVal} />
    },
}

export const StartAtFive = {
    render: (args) => {
        const [val, setVal] = useState(5)
        return <CounterDropdown {...args} value={val} onChange={setVal} />
    },
}


