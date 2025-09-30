import { ProductInfo } from './index'

export default {
    title: 'Atoms/ProductInfo',
    component: ProductInfo,
    args: {
        title: 'ALLDATA REPAIR',
        description:
            'Get factory-direct repair information, TSBs, and OEM procedures with quick search and diagrams.',
    },
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
    },
}

export const Default = {}

export const TitleOnly = {
    args: {
        description: '',
    },
}

export const DescriptionOnly = {
    args: {
        title: '',
        description: 'Standalone description without a title.',
    },
}


