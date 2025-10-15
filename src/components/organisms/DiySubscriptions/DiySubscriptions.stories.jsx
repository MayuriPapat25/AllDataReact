import React, { useState } from "react";
import { Car, Plus, RotateCcw, ChevronDown, CarFront, CirclePlus } from "lucide-react";
// NOTE: We mock react-router-dom's Link in Storybook environment
// import { Link } from "react-router-dom";

// Mock the original component's hardcoded initial state
const initialSubscriptions = [
    {
        id: "1",
        vehicle: "2020 Audi A3 Sedan (8VM) L4-2.0L Turbo (CZRA)",
        expiration: "10/30/2025",
        price: "$19.99 / 1 Month",
        inCart: true,
        hasChangedVehicle: false,
        hasRequestedRefund: false,
    },
    {
        id: "2",
        vehicle: "2023 Audi A4 Quattro Sedan 45 (8WC) L4-2.0L Turbo (DPAA) MHEV",
        expiration: "09/29/2026",
        price: "$19.99 / 1 Month",
        inCart: false,
        hasChangedVehicle: false,
        hasRequestedRefund: false,
    },
    {
        id: "3",
        vehicle: "2022 Buick Truck Encore FWD L4-1.4L Turbo VIN M",
        expiration: "09/29/2026",
        price: "$19.99 / 1 Month",
        inCart: false,
        // This item will trigger the limit modals on click
        hasChangedVehicle: true,
        hasRequestedRefund: true,
    },
    {
        id: "4",
        vehicle: "2026 Cadillac Truck Escalade IQ AWD ELE-Electric Engine",
        expiration: "09/29/2028",
        price: "$19.99 / 1 Month",
        inCart: false,
        hasChangedVehicle: false,
        hasRequestedRefund: false,
    },
];

// --- Mocked Atoms and Molecules (since we don't have their source) ---

const MockButton = ({ children, onClick, variant, className, style }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded font-semibold text-sm ${className}`}
        style={{ border: '1px solid #ccc', cursor: 'pointer', ...style }}
    >
        {children}
    </button>
);

const MockModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                {children}
                <MockButton onClick={onClose} className="mt-4 bg-gray-200 hover:bg-gray-300">
                    Close
                </MockButton>
            </div>
        </div>
    );
};

const VehicleChangeModal = ({ isOpen, onClose, currentVehicle, onComplete }) => (
    <MockModal isOpen={isOpen} onClose={onClose} title="Change Vehicle">
        <p>Change requested for: <strong>{currentVehicle}</strong></p>
        <MockButton onClick={onComplete} className="mt-4 bg-primary text-white">Confirm Change</MockButton>
    </MockModal>
);
const VehicleChangeLimitModal = ({ isOpen, onClose }) => (
    <MockModal isOpen={isOpen} onClose={onClose} title="Change Limit Reached">
        <p>You have already changed your vehicle for this subscription.</p>
    </MockModal>
);
const RefundRequestModal = ({ isOpen, onClose, vehicleInfo, onComplete }) => (
    <MockModal isOpen={isOpen} onClose={onClose} title="Request Refund">
        <p>Confirm refund for: <strong>{vehicleInfo}</strong></p>
        <MockButton onClick={onComplete} className="mt-4 bg-primary text-white">Confirm Refund</MockButton>
    </MockModal >
);
const RefundLimitModal = ({ isOpen, onClose }) => (
    <MockModal isOpen={isOpen} onClose={onClose} title="Refund Limit Reached">
        <p>You have already requested a refund for this subscription.</p>
    </MockModal>
);

// --- DiySubscriptions Mock Component ---
// This mock allows us to inject custom initial data for our stories
const DiySubscriptionsMock = ({ initialData = initialSubscriptions }) => {
    const [subscriptions, setSubscriptions] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("");
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [isRefundLimitModalOpen, setIsRefundLimitModalOpen] = useState(false);

    const handleAddToCart = (id) => {
        setSubscriptions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, inCart: true } : sub)));
    };

    const handleChangeVehicle = (vehicle, subscriptionId) => {
        const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

        if (subscription.hasChangedVehicle) {
            setIsLimitModalOpen(true);
        } else {
            setSelectedVehicle(vehicle);
            setSelectedSubscriptionId(subscriptionId);
            setIsModalOpen(true);
        }
    };

    const handleVehicleChangeComplete = () => {
        // Mock the state update that happens in the real component
        setSubscriptions((prev) =>
            prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasChangedVehicle: true } : sub)),
        );
        setIsModalOpen(false);
    };

    const handleRefundRequest = (vehicle, subscriptionId) => {
        const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

        if (subscription.hasRequestedRefund) {
            setIsRefundLimitModalOpen(true);
        } else {
            setSelectedVehicle(vehicle);
            setSelectedSubscriptionId(subscriptionId);
            setIsRefundModalOpen(true);
        }
    };

    const handleRefundComplete = () => {
        // Mock the state update that happens in the real component
        setSubscriptions((prev) =>
            prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasRequestedRefund: true } : sub)),
        );
        setIsRefundModalOpen(false);
    };

    const cartCount = subscriptions.filter((sub) => sub.inCart).length;

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="!text-lg font-bold mb-2 text-foreground">MANAGE SUBSCRIPTIONS</h2>
                <p className="text-sm text-muted-foreground leading-relaxed text-gray-600">
                    Subscription options include: change vehicle, renew vehicle, remove vehicle, or refund request. The
                    availability of each option will vary based on the subscription. See{" "}
                    <a href="#" className="test-primary hover:underline">
                        Subscription Rules
                    </a>{" "}
                    for more information. For product access, click on any active subscription below.
                </p>
            </div>

            <table className="w-full">
                <thead className="hidden lg:table-header-group lg:bg-muted/50  lg:border-b lg:border-border">
                    <tr className="flex flex-col lg:table-row">
                        <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                            <div className="flex items-center gap-1">
                                Vehicle
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Expiration</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Renew Subscription</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Actions</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col lg:table-header-group">
                    {subscriptions.length > 0 ? (
                        subscriptions.map((subscription, index) => (
                            <tr
                                key={subscription.id}
                                className={`border-b border-border flex flex-col lg:table-row ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                            >
                                <td className="py-4 lg:px-4 lg:w-[45%]">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-lg font-normal text-primary">{subscription.vehicle}</span>
                                        <button
                                            onClick={() => handleChangeVehicle(subscription.vehicle, subscription.id)}
                                            className="flex items-center gap-1 text-lg text-primary hover:underline w-fit"
                                        >
                                            <CarFront className="w-[1.125rem] h-[1.125rem]" />
                                            Change Vehicle
                                        </button>
                                    </div>
                                </td>
                                <td className="py-4 lg:px-4">
                                    <span className="text-lg font-semibold text-gray-600 text-foreground">{subscription.expiration}</span>
                                </td>
                                <td className="py-4 lg:px-4">
                                    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-3">
                                        <select
                                            name={`subscription-${subscription.id}`}
                                            id={`subscription-${subscription.id}`}
                                            className="border-2 border-gray-300 h-10 bg-white px-3 py-1.5 text-sm text-foreground w-full lg:w-auto"
                                        >
                                            <option>{subscription.price}</option>
                                        </select>
                                        {subscription.inCart ? (
                                            <span className="text-sm font-semibold text-foreground px-3 py-1.5">IN CART</span>
                                        ) : (
                                            <MockButton
                                                onClick={() => handleAddToCart(subscription.id)}
                                                className="flex items-center gap-1 !text-primary border-primary bg-transparent hover:bg-blue-50"
                                            >
                                                <CirclePlus className="w-4 h-4 text-primary" />
                                                ADD TO CART
                                            </MockButton>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 lg:px-4">
                                    <button
                                        onClick={() => handleRefundRequest(subscription.vehicle, subscription.id)}
                                        className="flex items-center gap-1 text-primary text-xs uppercase font-semibold cursor-pointer"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        REFUND
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-12 text-gray-500">
                                You have no active subscriptions.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex gap-3 mt-6">
                {/* Mocking Link with a simple button for Storybook */}
                <MockButton
                    className="px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold bg-transparent"
                >
                    VIEW CART ({cartCount})
                </MockButton>
                <MockButton
                    className="px-6 py-2 border border-border text-foreground hover:bg-muted font-semibold bg-transparent"
                >
                    ADD MORE VEHICLES
                </MockButton>
            </div>

            <VehicleChangeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentVehicle={selectedVehicle}
                onComplete={handleVehicleChangeComplete}
            />

            <VehicleChangeLimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
            <RefundRequestModal
                isOpen={isRefundModalOpen}
                onClose={() => setIsRefundModalOpen(false)}
                vehicleInfo={selectedVehicle}
                onComplete={handleRefundComplete}
            />

            <RefundLimitModal isOpen={isRefundLimitModalOpen} onClose={() => setIsRefundLimitModalOpen(false)} />
        </div>
    );
};

// --- Storybook Configuration ---

export default {
    title: 'Subscriptions/DiySubscriptions',
    component: DiySubscriptionsMock,
    decorators: [
        (Story) => (
            <div className="bg-white p-4" style={{ minHeight: '500px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: 'A page component listing all active DIY subscriptions with options to change vehicles, renew, or request a refund.',
            },
        },
    },
};


// --- Stories ---

/**
 * The standard view showing a mix of subscriptions: one in the cart, one with
 * usage limits reached, and others available for action.
 */
export const DefaultView = () => <DiySubscriptionsMock />;
DefaultView.storyName = '01. Standard List View';


/**
 * Shows the component when a user clicks 'Change Vehicle' on a subscription that has
 * already exhausted its change limit (Subscription ID '3' in the default data).
 */
export const VehicleChangeLimitModalOpen = () => (
    <DiySubscriptionsMock
        // Pass a simplified list where one is clearly marked to trigger the limit
        initialData={[
            { ...initialSubscriptions[0], inCart: false },
            { ...initialSubscriptions[2] }, // The subscription that has limits reached
        ]}
    />
);
// We manually set the modal to open state here for demonstration purposes,
// but the component logic handles opening on click.
VehicleChangeLimitModalOpen.play = async ({ canvasElement, step }) => {
    const tableRow = canvasElement.querySelector('tbody tr:nth-child(2)');
    const changeButton = tableRow.querySelector('button:has(.lucide-car-front)');
    await step('Click Change Vehicle to show limit modal', async () => {
        changeButton.click();
    });
};
VehicleChangeLimitModalOpen.storyName = '02. Vehicle Change Limit Reached';

/**
 * Shows the component when a user clicks 'Refund' on a subscription that has
 * already exhausted its refund limit (Subscription ID '3' in the default data).
 */
export const RefundLimitModalOpen = () => (
    <DiySubscriptionsMock
        initialData={[
            { ...initialSubscriptions[0], inCart: false },
            { ...initialSubscriptions[2] }, // The subscription that has limits reached
        ]}
    />
);
RefundLimitModalOpen.play = async ({ canvasElement, step }) => {
    const tableRow = canvasElement.querySelector('tbody tr:nth-child(2)');
    const refundButton = tableRow.querySelector('button:has(.lucide-rotate-ccw)');
    await step('Click Refund to show limit modal', async () => {
        refundButton.click();
    });
};
RefundLimitModalOpen.storyName = '03. Refund Limit Reached';

/**
 * Demonstrates the UI when the user has no active subscriptions.
 */
export const EmptyState = () => (
    <DiySubscriptionsMock
        initialData={[]}
    />
);
EmptyState.storyName = '04. Empty Subscriptions List';


/**
 * Shows a scenario where all subscriptions have been added to the cart,
 * changing the 'ADD TO CART' button to 'IN CART' and updating the cart count.
 */
export const AllInCart = () => (
    <DiySubscriptionsMock
        initialData={initialSubscriptions.map(sub => ({ ...sub, inCart: true }))}
    />
);
AllInCart.storyName = '05. All Subscriptions In Cart';
