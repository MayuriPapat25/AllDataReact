// AgreementPage.stories.jsx
import React from "react";
import AgreementPage from "./index";

export default {
    title: "Pages/AgreementPage",
    component: AgreementPage,
    tags: ["autodocs"],
};

// ✅ Default full page view
export const Default = () => <AgreementPage />;

// ✅ Mobile layout (using Storybook viewport addon)
export const MobileView = () => <AgreementPage />;
MobileView.parameters = {
    viewport: {
        defaultViewport: "iphone6", // storybook viewport preset
    },
};

// ✅ With Action Buttons (storybook-only variation)
const AgreementPageWithButtons = () => {
    const handleCompletePurchase = () => alert("Complete Purchase clicked!");
    const handleBack = () => alert("Back clicked!");

    return (
        <div className="bg-background p-4 md:p-8">
            <div className="mx-20 max-w-4xl">
                <AgreementPage />

                {/* Action Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <button
                        onClick={handleCompletePurchase}
                        className="w-full sm:w-auto min-w-[200px] bg-background text-orange-600 border-2 border-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold py-3 px-8 text-sm md:text-base"
                    >
                        COMPLETE PURCHASE
                    </button>
                    <button
                        onClick={handleBack}
                        className="w-full sm:w-auto min-w-[120px] bg-background text-muted-foreground border-2 border-border hover:bg-muted font-semibold py-3 px-8 text-sm md:text-base"
                    >
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
};

export const WithActionButtons = () => <AgreementPageWithButtons />;
WithActionButtons.parameters = {
    docs: {
        description: {
            story:
                "Demonstrates AgreementPage with mocked action buttons for Complete Purchase and Back.",
        },
    },
};
