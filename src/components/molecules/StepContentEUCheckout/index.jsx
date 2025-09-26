
import { Button } from "../../atoms/Buttons/Button"
import BusinessInformationForm from '../BusinessInforamtionForm'
import BusinessAddressForm from '../BusinessAddress'
import BillingAddressForm from '../BillingAddress'
import ShippingAddressForm from '../ShippingAddress'
// import BillingFormSinglePayment from '../BillingFormSinglePayment'
import BillingEmailForm from "../BillingEmailAddress"
import PhoneSignupForm from "../PhoneSignUpForm"
import { useState } from "react"
import OrderSummary from "../OrderSummary"
// import AccountInformation from "../AccountInformation"
// import BusinessInfoReview from "../BusinessInfoReview"
// import BusinessAddressReview from "../../atoms/BusinessAddressReview"
// import BillingInfoReview from "../../atoms/BillingInfoReview"
// import AgreementPage from "../../atoms/AgreementPage"
// import OrderConfirmation from "../OrderConfirmation"
// import EmailForm from "../EmailForm"
import AccountCreationForm from "../AccountCreationForm"


const StepContentEUCheckout = ({
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

    const orderSummaryData = {
        paymentFrequency: "MONTHLY",
        subscriptionTerm: "12 MONTHS",
        autoRenewalDate: "09/09/2026",
        services: [
            {
                id: "1",
                name: "ALLDATA COLLISION",
                accessPoints: 1,
                monthlyPrice: 229.0,
                icon: "car", // Based on the icon shown
            },
            {
                id: "2",
                name: "ALLDATA COMMUNITY",
                accessPoints: 1,
                monthlyPrice: 0.0,
                icon: "book", // Represents community
            },
            {
                id: "3",
                name: "ALLDATA FIND A FIX",
                accessPoints: 1,
                monthlyPrice: 0.0,
                icon: "plus",
            },
            {
                id: "4",
                name: "ESTIMATOR",
                accessPoints: 1,
                monthlyPrice: 0.0,
                icon: "plus",
            },
        ],
        MonthlySubscriptionSubtotal: 229.0, // New Monthly Subscription Subtotal
        // bundleDiscount: 0.0,         // No bundle discount mentioned
        // discount: 0.0,               // No discount applied
        CurrentTotalMonthlySubtotal: 247.32,        // New Monthly Subscription total (includes tax)
        // totalDueToday: 247.32,       // Matches total monthly
        salesTax: 18.32,             // From the image
        isPromotionalRate: true,    // Not marked as promotional
    };

    const handleEdit = () => {
        console.log("Edit button clicked")
        // Navigate back to step 2 for editing
        onBack()
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className=" mx-auto relative">
                        <div>
                            <AccountCreationForm variant="email" onValidationChange={setStep1Valid} className="mb-12" />
                        </div>                  
                    </div>
                )

            case 2:
                return (
                    <div className="bg-background p-4 md:p-8">
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                {/* this same component we can use for US journey for Anonymous flow,US journey for Authenticated flow, Rep Initiated flow */}
                                <BusinessInformationForm variant="standard" />
                                <BusinessAddressForm/>
                                <BillingAddressForm />
                                <ShippingAddressForm />
                                <div className="space-y-6">
                                    <span className="text-2xl font-bold text-gray-900">Billing Information</span>
                                    <iframe></iframe>
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
                        {/* <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <AccountInformation  {...accountData} />
                                <BusinessInfoReview onEdit={handleEdit} />
                                <BusinessAddressReview onEdit={handleEdit} />
                                <BillingAddressForm fromReview={true} onEdit={handleEdit} />
                                <ShippingAddressForm fromReview={true} onEdit={handleEdit} />
                                <BillingInfoReview />
                                <PhoneSignupForm onEdit={handleEdit} />
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={sampleOrderData} />
                                <OrderSummary data={orderSummaryData} />
                            </div>
                        </div> */}
                    </div>
                )

            case 4:
                return (
                    <div bg-background p-4 md:p-8>
                        {/* <AgreementPage /> */}
                    </div>
                )

            case 5:
                return (
                    <div className="min-h-screen bg-gray-50 py-12 ">
                        {/* <OrderConfirmation orderNumber="009015101" loginUrl="myalldata.com" />
                        <OrderSummary data={sampleOrderData} listClassName="my-10" fromStepFive={false}/> */}
                        {/* <OrderSummary data={orderSummaryData} /> */}
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
                secondaryButton: {
                    text: "CANCEL",
                    onClick: onBack,
                    variant: "outline"
                }, 
                buttonLayout: "max-w-2xl mx-auto p-6 justify-between"
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
                    className={primaryButton.className || "h-12 px-8  bg-transparent text-gray-700 font-medium text-base border-2 border-orange-500"}
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

export default StepContentEUCheckout