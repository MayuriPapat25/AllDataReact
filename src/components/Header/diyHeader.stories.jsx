import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderWithCart } from './diyHeader'

export default {
    title: 'Components/Header/DiyHeader',
    component: HeaderWithCart,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: 'Header component for DIY cart with shopping cart icon and dropdown.',
            },
        },
    },
}

export const Default = {
    args: {},
}

export const WithCartOpen = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Header with cart dropdown open by default (for testing purposes).',
            },
        },
    },
}
