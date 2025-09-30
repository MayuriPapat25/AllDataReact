import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './index'

export default {
    title: 'Atoms/RadioButtonGroup',
    component: RadioGroup,
    args: {
        options: [
            { value: 'monthly', label: 'Monthly' },
            { value: 'annually', label: 'Annually' },
        ],
        value: 'monthly',
        name: 'billing-frequency',
    },
}

export const Default = {
    render: (args) => {
        const [val, setVal] = useState(args.value)
        return (
            <RadioGroup value={val} onValueChange={setVal} name={args.name} className="space-y-3">
                {args.options.map((opt) => (
                    <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value={opt.value} id={`${args.name}-${opt.value}`} />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </RadioGroup>
        )
    },
}

export const WithThreeOptions = {
    render: () => {
        const [val, setVal] = useState('new')
        const name = 'payment-method'
        const options = [
            { value: 'new', label: 'New Card' },
            { value: 'saved', label: 'Saved Card' },
            { value: 'paypal', label: 'PayPal' },
        ]
        return (
            <RadioGroup value={val} onValueChange={setVal} name={name} className="space-y-3">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </RadioGroup>
        )
    },
}


