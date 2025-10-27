import { useState } from 'react'
import { TabButton } from './index'

export default {
    title: 'Atoms/TabButton',
    component: TabButton,
}

export const Tabs = {
    render: () => {
        const [active, setActive] = useState('Overview')
        const tabs = ['Overview', 'Details', 'Reviews']
        return (
            <div className="flex gap-4">
                {tabs.map((t) => (
                    <TabButton key={t} isActive={active === t} onClick={() => setActive(t)}>
                        {t}
                    </TabButton>
                ))}
            </div>
        )
    },
}

export const DropdownToggle = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <div className="w-64">
                <TabButton variant="dropdown-toggle" isOpen={open} onClick={() => setOpen((v) => !v)}>
                    Select Plan
                </TabButton>
            </div>
        )
    },
}

export const DropdownList = {
    render: () => {
        const [active, setActive] = useState('Monthly')
        const items = ['Monthly', 'Annually', 'Enterprise']
        return (
            <div className="w-64 border rounded-md">
                {items.map((i) => (
                    <TabButton key={i} variant="dropdown-item" isActive={active === i} onClick={() => setActive(i)}>
                        {i}
                    </TabButton>
                ))}
            </div>
        )
    },
}


