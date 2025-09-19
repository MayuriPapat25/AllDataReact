
import { Button } from "../../atoms/Buttons/Button"
import CreateNewAccount from "../CreateNewAccount"
import LoginForm from "../LoinForm"
import BusinessInformationForm from '../BusinessInfoWithTax'
import BusinessAddressForm from '../BusinessAddress'
import BillingAddressForm from '../BillingAddress'
import ShippingAddressForm from '../ShippingAddress'
import BillingFormDoublePayment from "../BillingFormDoublePayment"
import BillingFormSinglePayment from '../BillingFormSinglePayment'

const StepContentUSAnonyCheckout = ({ currentStep, onContinue, onBack }) => {
    const paymentOptions = [
        { value: "new", label: "CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)" },
    ]

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto relative">
                        <div>
                            <CreateNewAccount onContinue={onContinue} />
                        </div>

                        {/* Vertical divider - hidden on mobile, visible on desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 h-1/2"></div>

                        <div className="flex items-start justify-center pt-8">
                            <LoginForm
                                onLogin={() => {
                                    // Handle login logic here
                                    console.log("Login clicked")
                                }}
                            />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="min-h-screen bg-background p-4 md:p-8">
                        <div className="mx-auto max-w-4xl">
                            <BusinessInformationForm />
                            <BusinessAddressForm />
                            <BillingAddressForm />
                            <ShippingAddressForm />
                            <BillingFormSinglePayment
                                header='Billing Information'
                                paymentOptions={paymentOptions} />
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div>Step3</div>
                )

            case 4:
                return (
                    <div>Step4</div>
                )

            case 5:
                return (
                    <div>Step5</div>
                )

            default:
                return null
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            {renderStepContent()}
            {currentStep >= 2 && currentStep < 5 && (
                <div className="mt-6 flex justify-between">
                    {currentStep > 1 && (
                        <Button onClick={onBack} variant="outline" className="px-8 bg-transparent">
                            Back
                        </Button>
                    )}
                    <Button onClick={onContinue} className={`px-8 ${currentStep === 1 ? "ml-auto" : ""}`}>
                        Continue
                    </Button>
                </div>
            )}
        </div>
    )
}

export default StepContentUSAnonyCheckout