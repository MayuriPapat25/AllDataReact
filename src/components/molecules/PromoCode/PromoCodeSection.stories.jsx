// PromoCodeSection.stories.jsx
import React, { useState } from "react";
import { PromoCodeSection } from "./PromoCodeSection";

export default {
    title: "Organisms/PromoCodeSection",
    component: PromoCodeSection,
    argTypes: {
        onApplyPromo: { action: "promoApplied" },
    },
};

const Template = (args) => {
    const [promoCode, setPromoCode] = useState("");

    const handleApply = () => {
        args.onApplyPromo(promoCode);
        setPromoCode(""); // optional: clear input after applying
    };

    return (
        <PromoCodeSection
            onApplyPromo={handleApply}
        />
    );
};

export const Default = Template.bind({});
Default.args = {};
