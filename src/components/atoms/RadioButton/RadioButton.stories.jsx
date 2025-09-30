import { useState } from 'react'
import { RadioButton } from './RadioButton'

export default {
    title: 'Atoms/RadioButton',
    component: RadioButton,
    args: {
        name: 'plan',
        label: 'Monthly',
        value: 'monthly',
        checked: false,
    },
}

export const Single = {
    render: (args) => {
        const [checked, setChecked] = useState(false)
        return (
            <RadioButton
                {...args}
                checked={checked}
                onChange={() => setChecked((v) => !v)}
            />
        )
    },
}

export const Group = {
    render: () => {
        const [value, setValue] = useState('monthly')
        return (
            <div className="flex gap-6">
                <RadioButton
                    name="plan"
                    value="monthly"
                    label="Monthly"
                    checked={value === 'monthly'}
                    onChange={setValue}
                />
                <RadioButton
                    name="plan"
                    value="annually"
                    label="Annually"
                    checked={value === 'annually'}
                    onChange={setValue}
                />
            </div>
        )
    },
}


