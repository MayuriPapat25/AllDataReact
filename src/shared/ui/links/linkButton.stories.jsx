import { LinkButton } from './linkButton'

export default {
    title: 'Atoms/LinkButton (links)',
    component: LinkButton,
    args: {
        children: 'Manage',
    },
    argTypes: {
        onClick: { action: 'clicked' },
    },
}

export const Default = {}

export const Custom = {
    args: {
        className: 'text-orange-600',
        children: 'Custom link',
    },
}


