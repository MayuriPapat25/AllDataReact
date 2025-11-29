
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import OrderSummaryDIY from "../OrderSummaryDIY"
import PlaceOrderForm from "../PlaceOrderForm"
import TermsConditions from "../../../shared/ui/TermsCondition"
import OrderConfirmation from "../OrderConfirmation"
import BillingFormDoublePayment from "../BillingFormDoublePayment"
import { Button } from "../../../shared/ui/Buttons/Button"
import BillingInformation from "../BillingInformation"

const StepContentDIYCheckout = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const navigate = useNavigate()
    const [step1Valid, setStep1Valid] = useState(true) // Start enabled since "existing" + default card is valid
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [selectedCard, setSelectedCard] = useState("1") // Default to first card
    const [paymentType, setPaymentType] = useState("existing")

    const handleEdit = () => {
        // Navigate back to step 2 for editing
        onBack()
    }


    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <BillingFormDoublePayment
                                    header="BILLING INFORMATION"
                                    subheader
                                    onPaymentTypeChange={(type) => {
                                        setPaymentType(type)
                                        if (type === "existing") {
                                            setStep1Valid(Boolean(selectedCard))
                                        } else {
                                            // Assume new payment iframe will handle details; enable to proceed
                                            setStep1Valid(true)
                                        }
                                    }}
                                    onCardSelect={(cardId) => {
                                        setSelectedCard(cardId)
                                        if (paymentType === "existing") {
                                            setStep1Valid(Boolean(cardId))
                                        }
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <OrderSummaryDIY />
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <PlaceOrderForm />
                                <BillingInformation fromReview={true} onEdit={handleEdit} />
                                <TermsConditions checked={agreeTerms} onCheckedChange={setAgreeTerms} />
                            </div>
                            <div className="w-1/2">
                                <OrderSummaryDIY />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="flex flex-col items-center">
                        <OrderConfirmation orderNumber={'0009020081'} />
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
                buttonLayout: "max-w-2xl pt-18 flex-start gap-4 border-t-2 border-gray-300"
            },
            2: {
                showButtons: true,
                primaryButton: {
                    text: "COMPLETE PURCHASE",
                    onClick: onContinue,
                    disabled: !agreeTerms
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
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center lg:justify-start border-t-2 border-gray-300"
            },
            3: {
                showButtons: true,
                primaryButton: {
                    text: "ACCES PRODUCT",
                    onClick: onBack
                },
                secondaryButton: {
                    text: "MANAGE ACCOUNT",
                    onClick: () => navigate('/diycustomeraccount'),
                    variant: "outline"
                },
                ternaryButton: null,
                buttonLayout: "flex flex-col sm:flex-row gap-4 mx-auto justify-between border-t-2 border-gray-300 max-w-2xl pt-18 btn-half text-sm"
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
                    disabled={primaryButton.disabled}
                    className={primaryButton.className || "btn btn-primary mr-2"}
                    size="sm"
                >
                    {primaryButton.text}
                </Button>
                {secondaryButton && (
                    <Button
                        onClick={secondaryButton.onClick}
                        variant={secondaryButton.variant || "outline"}
                        className={secondaryButton.className || "btn btn-secondary mr-2"}
                        size="sm"
                    >
                        {secondaryButton.text}
                    </Button>
                )}
                {ternaryButton && (
                    <Button
                        onClick={ternaryButton.onClick}
                        variant={ternaryButton.variant || "outline"}
                        className={ternaryButton.className || "btn btn-secondary mr-2"}
                        size="sm"
                    >
                        {ternaryButton.text}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-[1336px] pt-11 py-5 pb-2.5">
            {renderStepContent()}
            {getStepButtons()}
        </div>
    )
}

export default StepContentDIYCheckout