import React from 'react';
import AccountCard from './index';

export default {
    title: 'Components/AccountCard',
    component: AccountCard,
    parameters: {
        docs: {
            description: {
                component: 'AccountCard is a reusable card component that displays a title and content. It can be used to group account-related information or any other content blocks.',
            },
        },
    },
    argTypes: {
        title: {
            description: 'The heading text displayed at the top of the card.',
            control: 'text',
        },
        children: {
            description: 'The content inside the card.',
            control: 'object',
        },
        className: {
            description: 'Additional custom class names for styling.',
            control: 'text',
        },
    },
};

const Template = (args) => <AccountCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Account Information',
    children: (
        <div>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
        </div>
    ),
};
Default.parameters = {
    docs: {
        storyDescription: 'Default AccountCard displaying basic account info.',
    },
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
    title: 'Account Settings',
    className: 'bg-gray-50 border-gray-200',
    children: (
        <div>
            <p>Password: ********</p>
            <p>Two-Factor Authentication: Enabled</p>
        </div>
    ),
};
WithCustomClass.parameters = {
    docs: {
        storyDescription: 'AccountCard with custom background and border color.',
    },
};
