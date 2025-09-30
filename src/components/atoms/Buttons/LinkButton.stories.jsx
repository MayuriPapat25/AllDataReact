import LinkButton from './LinkButton'

export default {
    title: 'Atoms/LinkButton',
    component: LinkButton,
    args: {
        children: 'Learn more',
    },
    argTypes: {
        onClick: { action: 'clicked' },
    },
}

export const Default = {}

export const CustomClass = {
    args: {
        className: 'no-underline text-orange-600 hover:text-orange-700',
        children: 'Custom link style',
    },
}


