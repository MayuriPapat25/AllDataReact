
import { Button } from "../../atoms/Buttons/Button"
import { useState } from "react"
import DIYCartHome from "../../../Cart/diy"

const StepContentDIYCart = ({
    currentStep,
    onBack,
    onResetVehicle,

    stepConfig = {}
}) => {
    const [step1Valid, setStep1Valid] = useState(true) // Start enabled since "existing" + default card is valid

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            Find your vehicle
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            Pick your plan
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="flex flex-col items-center">
                        <DIYCartHome />
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
                    text: "BACK",
                    onClick: onBack,
                    disabled: !step1Valid
                },
                secondaryButton: {
                    text: "RESET VEHICLE",
                    onClick: onResetVehicle,
                    variant: "outline"
                },
                ternaryButton: null,
                buttonLayout: "max-w-2xl pt-18 flex-start gap-4 border-t-2 border-gray-300"
            },
            2: {
                showButtons: true,
                primaryButton: {
                    text: "BACK",
                    onClick: onBack,
                    disabled: !step1Valid
                },
                secondaryButton: null,
                ternaryButton: null,
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center lg:justify-start border-t-2 border-gray-300"
            },
            3: {
                showButtons: true,
                primaryButton: null,
                secondaryButton: null,
                ternaryButton: null,
                buttonLayout: "flex flex-col sm:flex-row gap-4 mx-auto justify-between border-t-2 border-gray-300 max-w-2xl pt-18"
            },
        }

        const finalConfig = { ...defaultConfigs[currentStep], ...customConfig }
        const {
            showButtons = true,
            primaryButton = { text: "BACK", onClick: onBack },
            secondaryButton = currentStep > 1 ? { text: "RESET VEHICLE", onClick: onResetVehicle } : null,
            // ternaryButton = currentStep > 1 ? { text: "Back", onClick: onBack } : null,
            buttonLayout = "flex-col sm:flex-row gap-4 pt-6 lg:ml-30 md:ml-0 sm:ml-0"
        } = finalConfig

        if (!showButtons) return null

        return (
            <div className={`flex ${buttonLayout}`}>
                <Button
                    onClick={primaryButton.onClick}
                    disabled={primaryButton.disabled}
                    className={primaryButton.className || "btn btn-primary mr-2"}
                >
                    {primaryButton.text}
                </Button>
                {secondaryButton && (
                    <Button
                        onClick={secondaryButton.onClick}
                        variant={secondaryButton.variant || "outline"}
                        className={secondaryButton.className || "btn btn-secondary mr-2"}
                    >
                        {secondaryButton.text}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className="mx-auto">
            {renderStepContent()}
            {getStepButtons()}
        </div>
    )
}

export default StepContentDIYCart