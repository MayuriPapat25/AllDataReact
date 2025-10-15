import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DiyProfileInfo from './DiyProfileInfo'; // Assuming DiyProfileInfo is in the same directory
import { Button } from '../../../shared/ui/Buttons/Button';

// --- Storybook Configuration ---

export default {
    title: 'Profile/DiyProfileInfo',
    component: DiyProfileInfo,
    decorators: [
        (Story) => (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4" style={{ maxWidth: '800px', margin: '3rem auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: 'A form for managing DIY user contact and login details, featuring responsive layout, a custom searchable dropdown, and conditional display of the save button.',
            },
        },
    },
};

// --- Mock Component for State Overrides ---
// This mock is needed because the original component hardcodes its initial state
// and save button logic based on that hardcoded state. This wrapper allows us
// to control the "initial" state for Storybook scenarios.

const DiyProfileInfoMock = ({ initialFormData, initialDropdownOpen = false, initialSearchTerm = '' }) => {
    const defaultInitialFormData = {
        firstName: 'TestLib',
        lastName: 'TesMath',
        email: 'libbna.mathew@gmail.com',
        contactNumber: '',
        contactType: '',
        username: 'libbna123@',
        password: '••••••••••••••••••'
    };

    const finalInitialData = { ...defaultInitialFormData, ...initialFormData };

    const [formData, setFormData] = useState(finalInitialData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(initialDropdownOpen);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [showSaveButton, setShowSaveButton] = useState(false); // Controlled by useEffect
    const dropdownRef = useRef(null);

    const contactTypes = ['Mobile', 'Home', 'Office'];

    const filteredTypes = contactTypes.filter(type =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Check if form has changed (comparing against the hardcoded initial data)
    useEffect(() => {
        const hasChanged =
            formData.firstName !== defaultInitialFormData.firstName ||
            formData.lastName !== defaultInitialFormData.lastName ||
            formData.email !== defaultInitialFormData.email ||
            formData.contactNumber !== defaultInitialFormData.contactNumber ||
            formData.contactType !== defaultInitialFormData.contactType;

        setShowSaveButton(hasChanged);
    }, [formData]);

    const handleSelectType = (type) => {
        setFormData({ ...formData, contactType: type });
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const handleSave = () => {
        console.log('Form saved:', formData);
        // NOTE: In a production app, replace alert() with a modal notification.
        alert('Profile saved successfully!');
        setShowSaveButton(false);
    };

    return (
        <div className="mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="p-8">
                <h2 className="!text-lg font-bold mb-2 text-foreground">MY PROFILE</h2>

                {/* Contact Information Section */}
                <div className="mb-8">
                    <h3 className="!text-sm text-gray-600 font-semibold mb-6 pb-3 border-b border-gray-200">
                        Contact Information
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Used for ALLDATA Communications including Password Reset. Does not change Username.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="contactNumber" className="block text-sm text-gray-700 mb-2">
                                Contact Number
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id="contactNumber"
                                    type="text"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />

                                <div className="relative w-40" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <span className={formData.contactType ? 'text-gray-900' : 'text-gray-400'}>
                                            {formData.contactType || '- Select -'}
                                        </span>
                                        {isDropdownOpen ? (
                                            <ChevronUp className="w-4 h-4 text-gray-600" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-gray-600" />
                                        )}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg bg-white z-10">
                                            <input
                                                type="text"
                                                placeholder=""
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                                                autoFocus
                                            />
                                            <div className="max-h-40 overflow-y-auto">
                                                {filteredTypes.length > 0 ? (
                                                    filteredTypes.map((type) => (
                                                        <div
                                                            key={type}
                                                            onClick={() => handleSelectType(type)}
                                                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${type === 'Home' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                                                                }`}
                                                        >
                                                            {type}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-3 py-2 text-gray-400 text-sm">
                                                        No results found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Information Section */}
                <div>
                    <h2 className="text-sm font-semibold mb-6 pb-3 border-b border-gray-200">
                        Login Information
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded">
                                {formData.username}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded">
                                {formData.password}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                {showSaveButton && (
                    <div className="mt-8">
                        <Button
                            onClick={handleSave}
                            className="px-8 py-2 border-2 border-orange-500 text-orange-500 rounded font-semibold hover:bg-orange-50 transition-colors"
                        >
                            SAVE
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Stories ---

/**
 * Shows the default state of the form when it is first loaded.
 * The form data is unchanged, so the SAVE button should be hidden.
 */
export const InitialState = () => <DiyProfileInfo />;
InitialState.storyName = '01. Default View (Unchanged)';

/**
 * Simulates a scenario where the user has modified a field (e.g., first name).
 * This should trigger the SAVE button to be displayed.
 */
export const DataEdited = () => (
    <DiyProfileInfoMock
        initialFormData={{ firstName: 'TestModified' }}
    />
);
DataEdited.storyName = '02. Data Edited (Save Button Visible)';

/**
 * Demonstrates the UI state when the custom contact type dropdown is open.
 */
export const DropdownOpen = () => (
    <DiyProfileInfoMock
        initialDropdownOpen={true}
    />
);
DropdownOpen.storyName = '03. Contact Type Dropdown Open';

/**
 * Demonstrates the UI state when the user is searching within the dropdown
 * and finds a match.
 */
export const DropdownWithMatch = () => (
    <DiyProfileInfoMock
        initialDropdownOpen={true}
        initialSearchTerm="home"
    />
);
DropdownWithMatch.storyName = '04. Dropdown Filtered (Match)';

/**
 * Demonstrates the UI state when the user searches for a term with no matches.
 */
export const DropdownNoMatch = () => (
    <DiyProfileInfoMock
        initialDropdownOpen={true}
        initialSearchTerm="garage"
    />
);
DropdownNoMatch.storyName = '05. Dropdown Filtered (No Match)';
