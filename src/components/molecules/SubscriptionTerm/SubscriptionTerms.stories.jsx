// SubscriptionTerms.stories.jsx
import React, { useState } from "react";
import { SubscriptionTerms } from "./SubscriptionTerms";

export default {
    title: "Molecules/SubscriptionTerms",
    component: SubscriptionTerms,
    parameters: {
        layout: "centered",
    },
};

const Template = (args) => {
    const [selectedTerm, setSelectedTerm] = useState(args.selectedTerm || "12 Months");

    const handleTermChange = (value) => {
        setSelectedTerm(value);
        if (args.onTermChange) args.onTermChange(value);
    };

    return <SubscriptionTerms selectedTerm={selectedTerm} onTermChange={handleTermChange} />;
};

export const Default = Template.bind({});
Default.args = {
    selectedTerm: "12 Months",
};

export const ThreeMonthsSelected = Template.bind({});
ThreeMonthsSelected.args = {
    selectedTerm: "3 Months",
};

export const SixMonthsSelected = Template.bind({});
SixMonthsSelected.args = {
    selectedTerm: "6 Months",
};
