import React from "react"
import { MemoryRouter } from "react-router-dom"
import DiyCartPage from "./index"

export default {
    title: "Pages/DIY/DiyCartPage",
    component: DiyCartPage,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div className="max-w-6xl mx-auto p-6 bg-white">
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
}

// Default template
const Template = (args) => <DiyCartPage {...args} />

export const Default = Template.bind({})
Default.storyName = "Cart with Items"

export const EmptyCart = Template.bind({})
EmptyCart.storyName = "Empty Cart"
EmptyCart.args = {
    initialCartItems: [], // Make sure DiyCartPage supports this prop
}
