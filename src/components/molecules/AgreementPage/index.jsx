
const AgreementPage = () => {

    return (
        <div className="bg-background p-4 md:p-8">
            <div className="mx-20 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-md mb-6">AGREEMENT</h1>

                    <p className="mb-6 text-gray-500">
                        To complete your order, follow these steps to review and sign the terms of your agreement:
                    </p>

                    {/* Steps List */}
                    <ol className="space-y-3 text-gray-500">
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">1.</span>
                            <span>
                                Click <span className="font-semibold text-foreground">"Review Agreement Terms"</span> to use electronic
                                signature
                            </span>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">2.</span>
                            <span>
                                Check the box to agree to use electronic signatures and click{" "}
                                <span className="font-semibold text-foreground">"Continue"</span>
                            </span>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">3.</span>
                            <span>
                                Review the terms of your agreement, electronically sign and initial as directed. Click{" "}
                                <span className="font-semibold text-foreground">"Next"</span>
                            </span>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">4.</span>
                            <span>
                                Sign and click <span className="font-semibold text-foreground">"Adopt and Sign"</span>. Close page by
                                clicking X at the top or <span className="font-semibold text-foreground">"Close"</span> at the bottom.
                            </span>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">5.</span>
                            <span>Close the signature accepted page.</span>
                        </li>
                        <li className="flex flex-col sm:flex-row gap-2">
                            <span className="font-medium text-foreground min-w-fit">6.</span>
                            <span>
                                When you return to the "Agreement" page, click on{" "}
                                <span className="font-semibold text-foreground">"Complete Purchase"</span>
                            </span>
                        </li>
                    </ol>
                </div>

                {/* Review Agreement Terms Section */}
                <div className="mb-12">
                    <button className="h5 text-primary underline font-light" style={{ fontWeight: 400, textDecorationStyle: 'dotted' }}>
                        Review Agreement Terms
                    </button>
                </div>

                {/* Legal Text */}
                <div className="text-gray-500">
                    <p>
                        By selecting "Complete Purchase" below, I authorize my payment to be processed. I agree that these debit
                        entries comply with applicable law. I agree to print or save a copy of my contract for my records.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AgreementPage