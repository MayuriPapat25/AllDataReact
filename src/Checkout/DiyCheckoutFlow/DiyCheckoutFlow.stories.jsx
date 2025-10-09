// src/stories/DIYCheckout.stories.jsx
import React from "react";
import { MemoryRouter } from "react-router-dom";
import DIYCheckout from "./index";

export default {
    title: "Pages/DIYCheckout",
    component: DIYCheckout,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export const Default = () => <DIYCheckout />;
