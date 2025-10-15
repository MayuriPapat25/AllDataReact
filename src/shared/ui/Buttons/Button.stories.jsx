import { Button } from './Button'

export default {
    title: 'Atoms/Button',
    component: Button,
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'link'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
}

export const Primary = {}
export const Secondary = { args: { variant: 'secondary' } }
export const Outline = { args: { variant: 'outline' } }
export const Ghost = { args: { variant: 'ghost' } }
export const Link = { args: { variant: 'link' } }
export const Disabled = { args: { disabled: true } }


