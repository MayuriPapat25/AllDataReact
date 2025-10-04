
import { Button } from "../../atoms/Buttons/Button"
import LoginForm from "../LoinForm"
import BusinessInformationForm from '../BusinessInforamtionForm'
import BusinessAddressForm from '../BusinessAddress'
import BillingAddressForm from '../BillingAddress'
import ShippingAddressForm from '../ShippingAddress'
import BillingEmailForm from "../BillingEmailAddress"
import { useState } from "react"
import OrderSummary from "../OrderSummary"
import AccountInformation from "../AccountInformation"
import BusinessInfoReview from "../BusinessInfoReview"
import BusinessAddressReview from "../../atoms/BusinessAddressReview"
import BillingInfoReview from "../../atoms/BillingInfoReview"
import AgreementPage from "../../molecules/AgreementPage"
import OrderConfirmation from "../OrderConfirmation"
import AccountCreationForm from "../AccountCreationForm"


const StepContentUSAuthCheckout = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const [step1Valid, setStep1Valid] = useState(false)

    const accountData = {
        email: "hinal.parikh@qed42.com",
        phoneNumber: "701 617 6368",
        subscriptionLength: "12 Months",
    }

    const handleEdit = () => {
        console.log("Edit button clicked")
        // Navigate back to step 2 for editing
        onBack()
    }

    const handleLogin = () => {
        console.log(`Login clicked for ${currentVariant} variant`)
        // Add your login logic here
    }

    const variant4Data = {
        paymentFrequency: "MONTHLY",
        subscriptionTerm: "12 MONTHS",
        autoRenewalDate: "10.09.2026",
        services: [{ name: "ALLDATA REPAIR", accessPoints: 1, monthlyPrice: "€145,00", icon: "/repair-icon.png" }],
        subscriptionSubtotal: "€145,00",
        totalMonthly: "€145,00",
        totalDueToday: "€145,00",
        isPromotionalRate: true,
    }


    const variant3Data = {
        paymentFrequency: "MONTHLY",
        subscriptionTerm: "12 MONTHS",
        autoRenewalDate: "09/10/2026",
        services: [
            { name: "ALLDATA COLLISION", accessPoints: 1, monthlyPrice: "$229.00", icon: "/car-icon.png" },
            { name: "ALLDATA COMMUNITY", accessPoints: 1, monthlyPrice: "$0.00", icon: "/community-icon.png" },
            { name: "ALLDATA FIND A FIX", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
            { name: "ESTIMATOR", accessPoints: 1, monthlyPrice: "$0.00", icon: "/plus-icon.png" },
        ],
        subscriptionSubtotal: "$229.00",
        totalMonthly: "$229.00",
        salesTax: "+$0.00",
        totalDueToday: "$229.00",
        isPromotionalRate: false,
    }


    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mx-auto relative">
                        <div>
                            <AccountCreationForm variant="business" onValidationChange={setStep1Valid} className="mb-6"/>
                        </div>
                        {/* Vertical divider - hidden on mobile, visible on desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 h-1/2"></div>
                        <div className="flex items-start pt-8 mx-auto p-6">
                            <LoginForm onLogin={handleLogin} variant='alldata' />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <BusinessInformationForm variant="authorized"/>
                                <BusinessAddressForm />
                                <BillingAddressForm />
                                <ShippingAddressForm />
                                <div className="space-y-6">
                                    <span className="text-2xl font-bold text-gray-900">Billing Information</span>
                                    <iframe></iframe>
                                    <BillingEmailForm />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={variant3Data} type="variant3" />
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
                                <BillingInfoReview />
                                <BusinessInfoReview onEdit={handleEdit} />
                                <BusinessAddressReview onEdit={handleEdit} />
                                <BillingAddressForm fromReview={true} onEdit={handleEdit} />
                                <ShippingAddressForm fromReview={true} onEdit={handleEdit} />
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={variant3Data} type="variant3" />
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
                    <div className="min-h-screen bg-gray-50 py-12 ">
                        <OrderConfirmation orderNumber="009015101" loginUrl="myalldata.com" />
                        <OrderSummary data={variant3Data} type="variant3" />
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
                    text: "CONTINUE TO COMPANY & BILLING",
                    onClick: onContinue,
                    disabled: !step1Valid
                },
                secondaryButton: null,
                buttonLayout: "flex-col sm:flex-row gap-4 pt-6 md:justify-center lg:justify-start"
            },
            2: {
                showButtons: true,
                primaryButton: {
                    text: "CONTINUE TO REVIEW",
                    onClick: onContinue
                },
                secondaryButton: {
                    text: "BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-8 md:ml-0 sm:ml-0"
            },
            3: {
                showButtons: true,
                primaryButton: {
                    text: "CONTINUE TO TERMS",
                    onClick: onContinue
                },
                secondaryButton: {
                    text: "BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-8 md:ml-0 sm:ml-0"
            },
            4: {
                showButtons: true,
                primaryButton: {
                    text: "COMPLETE PURCHASE",
                    onClick: onContinue
                },
                secondaryButton: {
                    text: "BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start lg:ml-60 md:ml-0 sm:ml-0"
            },
            5: {
                showButtons: false
            }
        }

        const finalConfig = { ...defaultConfigs[currentStep], ...customConfig }
        const {
            showButtons = true,
            primaryButton = { text: "Continue", onClick: onContinue },
            secondaryButton = currentStep > 1 ? { text: "Back", onClick: onBack } : null,
            buttonLayout = "flex-col sm:flex-row gap-4 pt-6 lg:ml-30 md:ml-0 sm:ml-0"
        } = finalConfig

        if (!showButtons) return null

        return (
            <div className={`flex ${buttonLayout}`}>
                <Button
                    onClick={primaryButton.onClick}
                    disabled={primaryButton.disabled}
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

export default StepContentUSAuthCheckout