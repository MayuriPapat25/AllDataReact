// BillingEmailForm.stories.jsx
import React from "react"
import BillingEmailForm from "./index"

export default {
    title: "Forms/BillingEmailForm",
    component: BillingEmailForm,
    tags: ["autodocs"],
}

export const Default = () => <BillingEmailForm />

export const WithCustomEmail = () => {
    const MockedCustomEmailForm = () => {

        return (
            <div className="max-w-xl">
                <h2 className="text-xl mb-4">Storybook Demo (Custom Email)</h2>
                <BillingEmailForm />
                <div className="mt-4 p-3 bg-gray-50 border rounded text-sm text-gray-600">
                    This story simulates entering a custom billing email instead of using the primary one.
                </div>
            </div>
        )
    }

    return <MockedCustomEmailForm />
}

export const PrefilledCustomEmail = () => {
    const PrefilledForm = () => {
        const [customEmail, setCustomEmail] = React.useState("finance@company.com")

        return (
            <div className="max-w-xl">
                <h2 className="text-xl mb-4">Storybook Demo (Prefilled Custom Email)</h2>
                <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-500">
                    Example showing a custom email pre-filled (storybook-only demo).
                </p>
            </div>
        )
    }

    return <PrefilledForm />
}
