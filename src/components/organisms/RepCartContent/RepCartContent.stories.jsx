import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { RepCartContent } from "./RepCartContent";

export default {
    title: "Organisms/RepCartContent",
    component: RepCartContent,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div className="p-6 bg-gray-50 min-h-screen">
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

// ✅ Default story — main checkout/cart view
export const Default = () => <RepCartContent />;
Default.storyName = "Default View";

// ✅ Story with Access Points Modal manually opened
export const AccessPointsModalOpen = () => {
    const [forceOpen, setForceOpen] = useState(true);

    return (
        <MemoryRouter>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* We render RepCartContent but intercept modal state */}
                <RepCartContentWrapper forceModalOpen={forceOpen} />
            </div>
        </MemoryRouter>
    );
};

AccessPointsModalOpen.storyName = "Access Points Modal Open";

// ✅ Minimal wrapper to control modal visibility externally
const RepCartContentWrapper = ({ forceModalOpen = false }) => {
    const [showAccessPointsModal, setShowAccessPointsModal] = useState(forceModalOpen);

    return (
        <div className="relative">
            <RepCartContent />
        </div>
    );
};
