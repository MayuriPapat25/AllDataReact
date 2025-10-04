// ProductCard.stories.jsx
import React from "react";
import ProductCard from "./index";

export default {
    title: "Molecules/ProductCard",
    component: ProductCard,
    argTypes: {
        cards: { control: "object" },
    },
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    cards: [
        {
            id: 1,
            icon: "📦",
            iconColor: "bg-blue-100",
            title: "Product A",
            subtitle: "New Arrival",
            isDashed: false,
            onClick: () => console.log("Clicked Product A"),
        },
        {
            id: 2,
            icon: "⚙️",
            iconColor: "bg-green-100",
            title: "Product B",
            subtitle: "Popular",
            isDashed: true,
            onClick: () => console.log("Clicked Product B"),
        },
        {
            id: 3,
            icon: "🔧",
            iconColor: "bg-yellow-100",
            title: "Product C",
            subtitle: "Recommended",
            isDashed: false,
            onClick: () => console.log("Clicked Product C"),
        },
    ],
};

export const EmptyState = Template.bind({});
EmptyState.args = {
    cards: [],
};
