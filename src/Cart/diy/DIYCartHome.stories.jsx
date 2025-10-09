import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import DIYCartHome from './index'

export default {
    title: 'Pages/DIYCartHome',
    component: DIYCartHome,
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
                component: 'DIY Cart Home page with header and cart functionality.',
            },
        },
        layout: 'fullscreen',
    },
}

export const Default = {
    args: {},
}