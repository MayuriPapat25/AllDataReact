import AccountCard from './index'

export default {
    title: 'Atoms/AccountCard',
    component: AccountCard,
    args: {
        title: 'Account Information',
        className: '',
    },
    argTypes: {
        title: { control: 'text' },
        className: { control: 'text' },
    },
}

const SampleContent = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Email</span>
            <span className="text-sm font-medium text-gray-900">user@example.com</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Phone</span>
            <span className="text-sm font-medium text-gray-900">(555) 123-4567</span>
        </div>
    </div>
)

export const Default = {
    render: (args) => (
        <AccountCard {...args}>
            <SampleContent />
        </AccountCard>
    ),
}

export const WithLongTitle = {
    args: {
        title: 'Primary Email Address for General Account Communication',
    },
    render: (args) => (
        <AccountCard {...args}>
            <SampleContent />
        </AccountCard>
    ),
}

export const CustomPadding = {
    args: {
        className: 'p-8',
    },
    render: (args) => (
        <AccountCard {...args}>
            <SampleContent />
        </AccountCard>
    ),
}

export const WithCustomChildren = {
    render: (args) => (
        <AccountCard {...args}>
            <div className="grid grid-cols-1 gap-3">
                <label className="text-sm text-gray-700">Username</label>
                <input className="border-2 border-gray-300 px-3 py-2" placeholder="Enter username" />
                <label className="text-sm text-gray-700">Password</label>
                <input type="password" className="border-2 border-gray-300 px-3 py-2" placeholder="Enter password" />
            </div>
        </AccountCard>
    ),
}


