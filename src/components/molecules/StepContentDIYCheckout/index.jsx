
import { Button } from "../../atoms/Buttons/Button"
import { useState } from "react"
import OrderSummaryDIY from "../OrderSummaryDIY"
import PlaceOrderForm from "../PlaceOrderForm"
import BillingInformationEdit from "../BillingInformationEdit"
import TermsConditions from "../../atoms/TermsCondition"
import OrderConfirmation from "../OrderConfirmation"

const StepContentDIYCheckout = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const [step1Valid, setStep1Valid] = useState(false)



    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <h2 className="text-md">Billing Information</h2>
                                {import.meta.env.STORYBOOK
                                    ? <div>[iframe placeholder]</div>
                                    : <iframe title="Billing Info" />}
                            </div>
                            <div className="w-1/2">
                                <OrderSummaryDIY />
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <PlaceOrderForm />
                                <BillingInformationEdit />
                                <TermsConditions />
                            </div>
                            <div className="w-1/2">
                                <OrderSummaryDIY />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <OrderConfirmation />
                        <OrderSummaryDIY />
                    </div>
                )
            default:
                return null
        }
    }

    const getStepButtons = () => {
        const customConfig = stepConfig[currentStep] || {}

        // Default button configurations for each step
        const defaultConfigs = {
            1: {
                showButtons: true,
                primaryButton: {
                    text: "CONTINUE TO PLACE ORDER",
                    onClick: onContinue,
                    disabled: !step1Valid
                },
                secondaryButton: {
                    text: "GO BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                ternaryButton: {
                    text: "CANCEL",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "max-w-2xl  p-6 justify-between flex-start"
            },
            2: {
                showButtons: true,
                primaryButton: {
                    text: "COMPLETE PURCHASE",
                    onClick: onContinue
                },
                secondaryButton: {
                    text: "GO BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                ternaryButton: {
                    text: "CANCEL",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-8 md:ml-0 sm:ml-0"
            },
            3: {
                showButtons: true,
                primaryButton: {
                    text: "ACCES PRODUCT",
                    onClick: onBack
                },
                secondaryButton: {
                    text: "MANAGE ACCOUNT",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-8 md:ml-0 sm:ml-0"
            },
        }

        const finalConfig = { ...defaultConfigs[currentStep], ...customConfig }
        const {
            showButtons = true,
            primaryButton = { text: "Continue", onClick: onContinue },
            secondaryButton = currentStep > 1 ? { text: "Back", onClick: onBack } : null,
            ternaryButton = currentStep > 1 ? { text: "Back", onClick: onBack } : null,
            buttonLayout = "flex-col sm:flex-row gap-4 pt-6 lg:ml-30 md:ml-0 sm:ml-0"
        } = finalConfig

        if (!showButtons) return null

        return (
            <div className={`flex ${buttonLayout}`}>
                <Button
                    onClick={primaryButton.onClick}
                    // disabled={primaryButton.disabled}
                    className={primaryButton.className || "btn btn-primary"}
                >
                    {primaryButton.text}
                </Button>
                {secondaryButton && (
                    <Button
                        onClick={secondaryButton.onClick}
                        variant={secondaryButton.variant || "outline"}
                        className={secondaryButton.className || "btn btn-secondary"}
                    >
                        {secondaryButton.text}
                    </Button>
                )}
                {ternaryButton && (
                    <Button
                        onClick={ternaryButton.onClick}
                        variant={ternaryButton.variant || "outline"}
                        className={ternaryButton.className || "border-2 border-gray-300 text-gray-700 font-medium text-base hover:bg-gray-50 bg-transparent"}
                    >
                        {ternaryButton.text}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className="mx-auto">
            {renderStepContent()}
            <div className="">
                {getStepButtons()}
            </div>
        </div>
    )
}

export default StepContentDIYCheckout