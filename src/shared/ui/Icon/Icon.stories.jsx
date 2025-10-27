import { Icon } from './Icon'

export default {
    title: 'Atoms/Icon',
    component: Icon,
    args: {
        type: 'check',
        className: 'test-primary',
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: [
                'check', 'close', 'cart', 'mobile', 'diagnostics', 'repair', 'community', 'estimator', 'delete',
                'error', 'warning', 'info', 'success', 'information', 'plus', 'refund', 'carFront', 'euro', 'doller',
                'downloadFile', 'cancelSubscription', 'downArrow', 'toggleYes', 'toggleNo', 'remove'
            ],
        },
        className: { control: 'text' },
    },
}

export const Default = {}

export const AllIconsGrid = {
    render: () => {
        const types = [
            'check', 'close', 'cart', 'mobile', 'diagnostics', 'repair', 'community', 'estimator', 'delete',
            'error', 'warning', 'info', 'success', 'information', 'plus', 'refund', 'carFront', 'euro', 'doller',
            'downloadFile', 'cancelSubscription', 'downArrow', 'toggleYes', 'toggleNo', 'remove'
        ]
        return (
            <div className="grid grid-cols-3 gap-4 max-w-sm">
                {types.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                        <Icon type={t} className="text-gray-800" />
                        <span className="text-xs text-gray-600">{t}</span>
                    </div>
                ))}
            </div>
        )
    },
}


