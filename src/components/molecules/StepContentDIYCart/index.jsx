import { useState } from "react"
import AddVehicle from "../AddVehicle"
import { Button } from "../../../shared/ui/Buttons/Button"
import PickYourPlan from "../../molecules/PickYourPlan"
import DiyCartPage from "../../../Cart/diy/diyCartModal"

const StepContentDIYCart = ({
  currentStep,
  setCurrentStep, // ✅ pass this to control step
  onBack,
  onResetVehicle,
  stepConfig = {},
  onContinue
}) => {
  const [step1Valid, setStep1Valid] = useState(true)

  const goToNextStep = () => {
    if (setCurrentStep) setCurrentStep(currentStep + 1)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <AddVehicle onContinue={onContinue} />
          </div >
        )
      case 2:
        return (
          <div>
            <PickYourPlan onContinue={onContinue} />
          </div >
        )
      case 3:
        return (
          <div className="flex flex-col items-center">
            <DiyCartPage onContinue={onContinue} />
          </div>
        )
      default:
        return null
    }
  }

  const getStepButtons = () => {
    const customConfig = stepConfig[currentStep] || {}

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
        buttonLayout:
          "flex-start gap-4 justify-center"
      },
      2: {
        showButtons: true,
        primaryButton: {
          text: "BACK",
          onClick: onBack,
          disabled: !step1Valid
        },
        secondaryButton: null,
        buttonLayout:
          "flex-col sm:flex-row gap-4 justify-center"
      },
      3: {
        showButtons: false,
        primaryButton: null,
        secondaryButton: null,
        buttonLayout:
          "flex flex-col sm:flex-row gap-4 mx-auto justify-between border-t-2 border-gray-300 pt-18"
      }
    }

    const finalConfig = { ...defaultConfigs[currentStep], ...customConfig }
    const {
      showButtons = true,
      primaryButton = { text: "BACK", onClick: onBack },
      secondaryButton =
      currentStep > 1
        ? { text: "RESET VEHICLE", onClick: onResetVehicle }
        : null,
      buttonLayout = "flex-col sm:flex-row gap-4 pt-6 lg:ml-30 md:ml-0 sm:ml-0"
    } = finalConfig

    if (!showButtons) return null

    return (
      <div className={`flex ${buttonLayout}`}>
        <Button
          onClick={primaryButton.onClick}
          disabled={primaryButton.disabled}
          size="sm"
          className={primaryButton.className || "btn btn-secondary"}
        >
          {primaryButton.text}
        </Button>
        {secondaryButton && (
          <Button
            onClick={secondaryButton.onClick}
            variant={secondaryButton.variant || "outline"}
            size="sm"
            className={secondaryButton.className || "btn btn-secondary"}
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
