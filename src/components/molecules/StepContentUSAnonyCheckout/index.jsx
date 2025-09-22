
import { Button } from "../../atoms/Buttons/Button"
import CreateNewAccount from "../CreateNewAccount"
import LoginForm from "../LoinForm"
import BusinessInformationForm from '../BusinessInfoWithTax'
import BusinessAddressForm from '../BusinessAddress'
import BillingAddressForm from '../BillingAddress'
import ShippingAddressForm from '../ShippingAddress'
import BillingFormSinglePayment from '../BillingFormSinglePayment'
import BillingEmailForm from "../BillingEmailAddress"
import PhoneSignupForm from "../PhoneSignUpForm"
import { useState } from "react"
import OrderSummary from "../OrderSummary"
import AccountInformation from "../AccountInformation"
import BusinessInfoReview from "../BusinessInfoReview"
import BusinessAddressReview from "../../atoms/BusinessAddressReview"
import BillingInfoReview from "../../atoms/BillingInfoReview"
import AgreementPage from "../../atoms/AgreementPage"


const StepContentUSAnonyCheckout = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const [step1Valid, setStep1Valid] = useState(false)
    const paymentOptionsForm = [
        { value: "new", label: "CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)" },
    ]

    const accountData = {
        email: "hinal.parikh@qed42.com",
        phoneNumber: "701 617 6368",
        subscriptionLength: "12 Months",
    }

    const sampleOrderData = {
        paymentFrequency: "MONTHLY",
        subscriptionTerm: "12 MONTHS",
        autoRenewalDate: "09/10/2026",
        services: [
            {
                id: "1",
                name: "ALLDATA REPAIR",
                accessPoints: 5,
                monthlyPrice: 209.0,
                icon: "car",
            },
            {
                id: "2",
                name: "ALLDATA MOBILE",
                accessPoints: 2,
                monthlyPrice: 39.0,
                icon: "plus",
            },
            {
                id: "3",
                name: "ESTIMATOR",
                accessPoints: 5,
                monthlyPrice: 0.0,
                icon: "plus",
            },
            {
                id: "4",
                name: "ALLDATA COMMUNITY",
                accessPoints: 5,
                monthlyPrice: 0.0,
                icon: "book",
            },
            {
                id: "5",
                name: "ALLDATA FIND A FIX",
                accessPoints: 5,
                monthlyPrice: 0.0,
                icon: "plus",
            },
            {
                id: "6",
                name: "BASIC DIAGNOSTICS",
                accessPoints: 2,
                monthlyPrice: 0.0,
                icon: "plus",
            },
        ],
        subscriptionSubtotal: 248.0,
        bundleDiscount: 12.4,
        discount: 9.93,
        totalMonthly: 225.67,
        totalDueToday: 225.67,
        isPromotionalRate: true,
    }


    const handleEdit = () => {
        console.log("Edit button clicked")
        // Navigate back to step 2 for editing
        onBack()
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mx-auto relative">
                        <div>
                            <CreateNewAccount onValidationChange={setStep1Valid} />
                        </div>
                        {/* Vertical divider - hidden on mobile, visible on desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 h-1/2"></div>
                        <div className="flex items-start pt-8 mx-auto p-6">
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
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <BusinessInformationForm />
                                <BusinessAddressForm />
                                <BillingAddressForm />
                                <ShippingAddressForm />
                                <div className="space-y-6">
                                    <BillingFormSinglePayment
                                        header='Billing Information'
                                        paymentOptions={paymentOptionsForm}
                                    />
                                    <BillingEmailForm />
                                    <PhoneSignupForm />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={sampleOrderData} />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <AccountInformation  {...accountData} />
                                <BusinessInfoReview onEdit={handleEdit} />
                                <BusinessAddressReview onEdit={handleEdit} />
                                <BillingAddressForm fromReview={true} onEdit={handleEdit} />
                                <ShippingAddressForm fromReview={true} onEdit={handleEdit} />
                                <BillingInfoReview />
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={sampleOrderData} />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div bg-background p-4 md:p-8>
                        <AgreementPage />
                    </div>
                )

            case 5:
                return (
                    <div>Step5</div>
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
                    text: "CONTINUE TO COMPANY & BILLING",
                    onClick: onContinue,
                    disabled: !step1Valid
                },
                secondaryButton: null,
                buttonLayout: "flex-col sm:flex-row gap-4 pt-6 lg:ml-20 md:ml-0 sm:ml-0 md:justify-center lg:justify-start"
            },
            2: {
                showButtons: true,
                primaryButton: {
                    text: "Continue to Review",
                    onClick: onContinue
                },
                secondaryButton: {
                    text: "Back",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-8 md:ml-0 sm:ml-0"
            }
        }

        const finalConfig = { ...defaultConfigs[currentStep], ...customConfig }
        const {
            showButtons = true,
            primaryButton = { text: "Continue", onClick: onContinue },
            secondaryButton = currentStep > 1 ? { text: "Back", onClick: onBack } : null,
            buttonLayout = "flex-col sm:flex-row gap-4 pt-6 lg:ml-24 md:ml-0 sm:ml-0"
        } = finalConfig

        if (!showButtons) return null

        return (
            <div className={`flex ${buttonLayout}`}>
                <Button
                    onClick={primaryButton.onClick}
                    disabled={primaryButton.disabled}
                    className={primaryButton.className || "h-12 px-8 hover:bg-gray-50 bg-transparent text-gray-700 font-medium text-base border-2 border-orange-500"}
                >
                    {primaryButton.text}
                </Button>
                {secondaryButton && (
                    <Button
                        onClick={secondaryButton.onClick}
                        variant={secondaryButton.variant || "outline"}
                        className={secondaryButton.className || "h-12 px-8 border-2 border-gray-300 text-gray-700 font-medium text-base hover:bg-gray-50 bg-transparent"}
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
            <div className="">
                {getStepButtons()}
            </div>
        </div>
    )
}

export default StepContentUSAnonyCheckout