import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProductsPortal from "./ProductsPortal";

// ✅ Mocking react-router-dom's useNavigate
// Storybook doesn't have routing context by default
export default {
    title: "Organisms/ProductsPortal",
    component: ProductsPortal,
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

// ✅ Default Story
export const Default = () => <ProductsPortal />;

Default.storyName = "Default View";

// ✅ Access Points Modal Open (show modal manually)
export const AccessPointsModalOpen = () => {
    const [showModal, setShowModal] = React.useState(true);

    return (
        <MemoryRouter>
            <div className="p-6 bg-gray-50 min-h-screen">
                <ProductsPortal />
            </div>
        </MemoryRouter>
    );
};

AccessPointsModalOpen.storyName = "Access Points Modal Open";

// ✅ Account Closure Modal Open (mock state)
export const AccountClosureModalOpen = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <MemoryRouter>
            <div className="p-6 bg-gray-50 min-h-screen">
                <ProductsPortal />
            </div>
        </MemoryRouter>
    );
};

AccountClosureModalOpen.storyName = "Account Closure Modal Open";
