import { Button } from "../../atoms/Buttons/Button"
import { useState } from "react"

const AgreementPage = () => {
    const [isProcessing, setIsProcessing] = useState(false)

    const handleCompletePurchase = () => {
        setIsProcessing(true)
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false)
            // Handle purchase completion logic here
        }, 2000)
    }

    const handleBack = () => {
        // Handle back navigation
        window.history.back()
    }

    return (
        <div className="bg-background p-4 md:p-8">
            <div className="mx-20 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">AGREEMENT</h1>

                    <p className="text-muted-foreground mb-6 text-sm md:text-base">
                        To complete your order, follow these steps to review and sign the terms of your agreement:
                    </p>

                    {/* Steps List */}
                    <ol className="space-y-3 text-sm md:text-base text-muted-foreground">
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
                    <h2 className="text-lg md:text-xl font-medium text-foreground mb-8 underline decoration-2 underline-offset-4">
                        Review Agreement Terms
                    </h2>
                </div>

                {/* Legal Text */}
                <div className="mb-12">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        By selecting "Complete Purchase" below, I authorize my payment to be processed. I agree that these debit
                        entries comply with applicable law. I agree to print or save a copy of my contract for my records.
                    </p>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={handleCompletePurchase}
                        disabled={isProcessing}
                        className="w-full sm:w-auto min-w-[200px] bg-background text-orange-600 border-2 border-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold py-3 px-8 text-sm md:text-base"
                        variant="outline"
                    >
                        {isProcessing ? "PROCESSING..." : "COMPLETE PURCHASE"}
                    </Button>

                    <Button
                        onClick={handleBack}
                        variant="outline"
                        className="w-full sm:w-auto min-w-[120px] bg-background text-muted-foreground border-2 border-border hover:bg-muted font-semibold py-3 px-8 text-sm md:text-base"
                    >
                        BACK
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default AgreementPage