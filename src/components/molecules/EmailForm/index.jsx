import React from "react"
import { useState } from "react"
import InputField from "../../atoms/InputField/index"
import TermsConditions from "../../atoms/TermsCondition"

export default function EmailForm() {
    const [email, setEmail] = useState("hinal.parik@qed42.org")
    const [agreedToEmails, setAgreedToEmails] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", { email, agreedToEmails })
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-background">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">CONTINUE WITH YOUR EMAIL</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Enter your email to receive your order confirmation and complete product setup after purchase.
                    </p>
                </div>

                {/* Subscription Info */}
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Already have a subscription?</span> Please call{" "}
                    <span className="font-medium text-foreground">+49 (0) 221 53 41 07 0</span> to edit or modify your existing
                    subscription.
                </div>

                {/* Required Fields Notice */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-600">|</span>
                    <span>= Fields are Required</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Primary Email Address"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        helperText="Used for Username and General Account Communication"
                        className="w-full rounded-md"
                    />

                    <TermsConditions checked={agreedToEmails} onCheckedChange={setAgreedToEmails} />

                </form>
            </div>
        </div>
    )
}
