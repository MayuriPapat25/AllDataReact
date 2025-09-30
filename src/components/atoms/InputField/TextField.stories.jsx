import { useState } from 'react'
import { TextField } from './TextField'

export default {
    title: 'Atoms/TextField',
    component: TextField,
    args: {
        placeholder: 'Enter text',
        value: '',
    },
    argTypes: {
        onChange: { action: 'changed' },
    },
}

export const Default = {
    render: (args) => {
        const [val, setVal] = useState('')
        return <TextField {...args} value={val} onChange={setVal} />
    },
}

export const WithCustomClass = {
    render: (args) => {
        const [val, setVal] = useState('Prefilled')
        return <TextField {...args} className="rounded-md" value={val} onChange={setVal} />
    },
}


