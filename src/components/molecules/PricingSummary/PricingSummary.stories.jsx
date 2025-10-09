import React from 'react';
// import { PriceText } from '../../atoms/Price/PriceText'; // Original import

// --- Mocking the PriceText Component for Storybook ---
// This mock is designed to be visually appealing and handle the 'isDiscount' and 'isTotal' props.
const MockPriceText = ({ amount, label, isDiscount = false, isTotal = false }) => {
    const currency = '$';
    const formattedAmount = Math.abs(amount).toFixed(2);

    let valueColor = 'text-gray-900';
    let valueClasses = 'font-semibold';

    if (isDiscount) {
        // Discounts/Taxes are often shown as negative/red
        valueColor = 'text-red-600';
        valueClasses = 'font-medium';
    } else if (isTotal) {
        // Totals are visually emphasized
        valueColor = 'text-blue-700';
        valueClasses = 'text-xl font-extrabold';
    }

    const labelClasses = isTotal ? 'text-base font-bold' : 'font-normal text-gray-500';

    return (
        <div className={`flex justify-between items-center ${isTotal ? 'py-1' : 'text-sm'}`}>
            <span className={labelClasses}>{label}</span>
            <span className={`${valueColor} ${valueClasses}`}>
                {isDiscount && amount < 0 ? '-' : ''}
                {currency}{formattedAmount}
            </span>
        </div>
    );
};

// --- PricingSummary Component Definition (Adapted for Storybook) ---
// We redefine the component here, aliasing the mock PriceText.
const PriceText = MockPriceText;

function PricingSummary({ data }) {
    // Assuming data object structure: { subtotal, tax, monthlyTotal, totalDue }
    return (
        <div className="mb-6 bg-white shadow-xl rounded-lg overflow-hidden max-w-sm mx-auto">
            <div className="space-y-0">
                <div className="border-b border-gray-100">
                    <div className="p-4">
                        <PriceText amount={data.subtotal} label="Subscription Subtotal" />
                    </div>
                </div>
                {/* Monthly total is highlighted as a sub-total row */}
                <div className="border-y border-gray-100 bg-gray-50/50">
                    <div className="p-4">
                        <PriceText amount={data.monthlyTotal} label="Total Monthly" />
                    </div>
                </div>
                {/* Tax/Discount row */}
                <div className="border-b border-gray-100">
                    <div className="p-4">
                        <PriceText amount={data.tax} label="Sales Tax" isDiscount />
                    </div>
                </div>
                {/* Total Due section is visually distinct and bottom-aligned */}
                <div className="p-4 bg-blue-50/70 border-t-2 border-blue-200">
                    <PriceText amount={data.totalDue} label="Total Due:" isTotal />
                </div>
            </div>
        </div>
    )
}

export default {
    title: 'Billing/PricingSummary',
    component: PricingSummary,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        data: { control: 'object', description: 'The pricing breakdown data.' },
    },
};

const defaultData = {
    subtotal: 218.00,
    monthlyTotal: 205.25,
    tax: -12.75, // Displayed as a negative adjustment
    totalDue: 205.25
};

/**
 * The default story displays the component with a standard breakdown including a sales tax/discount applied.
 */
export const DefaultSummary = {
    args: {
        data: defaultData,
    },
};

/**
 * This story demonstrates a scenario where the sales tax is $0.00, showing a tax-exempt situation.
 * The total monthly and total due amounts match the subtotal.
 */
export const TaxExemptSummary = {
    args: {
        data: {
            subtotal: 150.00,
            monthlyTotal: 150.00,
            tax: 0.00,
            totalDue: 150.00
        }
    },
};

/**
 * A scenario showcasing a simple, flat-rate pricing model with no tax or discount lines, 
 * useful for simple products where the subtotal equals the total.
 */
export const FlatRateSummary = {
    args: {
        data: {
            subtotal: 59.99,
            monthlyTotal: 59.99,
            tax: 0.00,
            totalDue: 59.99
        }
    },
};
