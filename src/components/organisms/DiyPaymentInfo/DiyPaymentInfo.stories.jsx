import React, { useState } from 'react';
import DiyPaymentInfo from './DiyPaymentInfo';
import { Trash2 } from "lucide-react";

// --- Storybook Configuration ---

export default {
    title: 'Profile/DiyPaymentInfo',
    component: DiyPaymentInfo,
    decorators: [
        // Center the component and give it context for better viewing
        (Story) => (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4" style={{ maxWidth: '800px', margin: '3rem auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: 'Displays the user\'s saved payment methods, allowing them to set a primary card or remove secondary cards.',
            },
        },
    },
};

// --- Mock Component for State Overrides ---
// This mock mirrors the original component's structure but allows us to pass
// initial card data via props to control the state for different story scenarios.
const MockDiyPaymentInfo = ({ initialCards = [], initialSelectedId = null }) => {
    const [cards, setCards] = useState(initialCards);
    const [selectedCardId, setSelectedCardId] = useState(
        initialSelectedId || (initialCards.length > 0 ? initialCards.find(c => c.isPrimary)?.id || initialCards[0].id : null)
    );

    const handleRemove = (cardId) => {
        setCards(cards.filter((card) => card.id !== cardId));
    };

    const handleSelectCard = (cardId) => {
        setSelectedCardId(cardId);
    };

    // Render logic from the original component
    return (
        <div className="w-full mx-auto p-8">
            <h2 className="!text-lg font-bold mb-2 text-foreground">MY PAYMENT INFORMATION</h2>
            <p className="text-muted-foreground mb-8">Card Information is added during the checkout process</p>

            <table className="w-full">
                <thead>
                    <tr className=" border-b-2 border-b-gray-400">
                        <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1 w-[10%]">Primary</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1 w-[35%]">Card Information</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.id}>
                            {/* Radio Button */}
                            <td className="py-6">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleSelectCard(card.id)}
                                        className="w-5 h-5 rounded-full border-2 border-blue-900 flex items-center justify-center"
                                        aria-label={`Select card ending in ${card.lastFour}`}
                                    >
                                        {selectedCardId === card.id && <div className="w-3 h-3 rounded-full bg-blue-900" />}
                                    </button>
                                </div>
                            </td>

                            {/* Card Information */}
                            <td className="py-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#1434CB] text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
                                    <span className="text-sm text-muted-foreground tracking-wide">VISA ENDING IN {card.lastFour}</span>
                                </div>
                            </td>

                            {/* Remove Button */}
                            <td className="py-6">
                                {selectedCardId !== card.id && (
                                    <button
                                        onClick={() => handleRemove(card.id)}
                                        className="flex items-center gap-2 text-[#5B4FE9] hover:text-[#4A3FD8] transition-colors rounded px-2 py-1"
                                        aria-label={`Remove card ending in ${card.lastFour}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">REMOVE</span>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {/* Custom Empty State Message for better clarity */}
                    {cards.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center py-12 text-sm text-gray-500">
                                You currently have no payment methods saved.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


// --- Stories ---

/**
 * The default state as defined in the component's initial state: two cards, with one selected as primary.
 */
export const DefaultCards = () => <DiyPaymentInfo />;
DefaultCards.storyName = '01. Multiple Cards';

/**
 * Simulates a user who only has one payment method saved.
 * In this case, the single card is automatically the primary/selected one,
 * and the "REMOVE" button should be hidden for that card.
 */
export const SingleCard = () => (
    <MockDiyPaymentInfo
        initialCards={[{ id: "3", lastFour: "9999", isPrimary: true }]}
        initialSelectedId="3"
    />
);
SingleCard.storyName = '02. Single Card (Cannot Remove)';

/**
 * An edge case that demonstrates the UI when the user has no saved payment methods.
 */
export const EmptyState = () => (
    <MockDiyPaymentInfo
        initialCards={[]}
    />
);
EmptyState.storyName = '03. Empty State';
