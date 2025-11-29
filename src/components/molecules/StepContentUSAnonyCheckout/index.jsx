import React, { useRef } from "react";
import LoginForm from "../LoinForm"
import BillingEmailForm from "../BillingEmailAddress"
import PhoneSignupForm from "../PhoneSignUpForm"
import { useEffect, useState } from "react"
import OrderSummary from "../OrderSummary"
import AccountInformation from "../AccountInformation"
import BusinessInfoReview from "../BusinessInfoReview"
import BusinessAddressReview from "../BusinessAddressReview"
import AgreementPage from "../../molecules/AgreementPage"
import OrderConfirmation from "../OrderConfirmation"
import BillingInformation from "../BillingInformation"
import AgreementModal from "../AgreementModal"
import { Button } from "../../../shared/ui/Buttons/Button"
import BusinessInformation from '../BusinessInforamtionForm/BusinessInformation'
import BusinessAddress from '../BusinessAddress/BusinessAddress'
import BillingAddressForm from '../BillingAddress/BillingAddress';
import ShippingAddressForm from '../ShippingAddress/ShippingAddress'
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../../shared/translations"
import AccountCreation from "../AccountCreationForm/AccountCreation"
import { setAccountCreation, clearAccountCreation } from "../../../store/store"; // adjust import path
import BillingInfoReview from "../BillingInfoReview";


const StepContentUSAnonyCheckout = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const dispatch = useDispatch();
  const accountRef = useRef(null);

    // read saved account values
    const savedAccount = useSelector((state) => state.form?.accountCreation) ?? {};
    // called whenever DynamicForm values change (you can debounce this if needed)
  const handleAccountFormChange = (values) => {
    if (!values) return;
    // merge with existing savedAccount to preserve other fields like agreeToTerms
    const merged = { ...(savedAccount || {}), ...values };
    dispatch(setAccountCreation(merged));
  };
    
    // Initialize agreeToTerms from saved account data
    useEffect(() => {
        if (savedAccount?.agreeToTerms !== undefined) {
            setAgreeToTerms(savedAccount.agreeToTerms);
        }
    }, [savedAccount]);

    // optional: clear on final success (e.g. step 5 / after order complete)
    const handleCompletePurchase = () => {
        // do other completion logic...
        dispatch(clearAccountCreation());
    };


    const [step1Valid, setStep1Valid] = useState(false)
    const [businessInfoValid, setBusinessInfoValid] = useState(false)
    const [businessAddressValid, setBusinessAddressValid] = useState(false)
    const [billingEmailValid, setBillingEmailValid] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (currentStep === 4) {
            setIsModalOpen(true);
        }
    }, [currentStep]);

    const accountData = {
        email: "hinal.parikh@qed42.com",
        phoneNumber: "701 617 6368",
        subscriptionLength: "12 Months",
    }

    const { cartItems, paymentFrequency, subscriptionTerm, autoRenewalDate } = useSelector((state) => state.cart);
    const subscriptionSubtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const totalMonthly = subscriptionSubtotal;
    const totalDueToday = totalMonthly; // adjust if you add discounts later


    const handleEdit = () => {
        // Navigate back to step 2 for editing
        onBack()
    }

    const handleLogin = () => {
        console.log(`Login clicked for ${currentVariant} variant`)
        // Add your login logic here
    }

    const orderSummaryData = {
        paymentFrequency,
        subscriptionTerm,
        autoRenewalDate,
        services: cartItems.map((item) => 
        {
            return ({
            name: item.name,
            accessPoints: item.accessPoints,
            monthlyPrice: `${item.price ?? "0.00"}`,
            icon: "/car-icon.png", // you can map icons per type if needed
        })
    }),
        subscriptionSubtotal: `${subscriptionSubtotal.toFixed(2)}`,
        totalMonthly: `${totalMonthly.toFixed(2)}`,
        totalDueToday: `${totalDueToday.toFixed(2)}`,
        isPromotionalRate: false,
    };

    const headerContent = {
        title: translations?.create_new_account,
        description: "If you are purchasing a new subscription, please create an account below to complete purchase.",
    }
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setStep1Valid(formValid && agreeToTerms);
    }, [formValid, agreeToTerms]);

    const businessInfo = useSelector(state => state.form.businessAddress);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mx-auto relative">
                      <AccountCreation 
                        ref={accountRef}
                        headerContent={headerContent} 
                        setFormValid={setFormValid} 
                        setAgreeToTerms={setAgreeToTerms}
                        checked={agreeToTerms}
                        initialData={savedAccount}            // <-- pass saved data in
                        onFormChange={handleAccountFormChange} 
                      />
                        {/* Vertical divider - hidden on mobile, visible on desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 h-1/2"></div>
                        <div className="flex items-start mx-auto pl-6">
                            <LoginForm onLogin={handleLogin} variant='alldata' />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <BusinessInformation 
                                    onValidationChange={setBusinessInfoValid}
                                    initialData={businessInfo}
                                />
                                <BusinessAddress onValidationChange={setBusinessAddressValid} />
                                <BillingAddressForm />
                                <ShippingAddressForm />
                                <div className="space-y-6">
                                    <BillingInformation />
                                    <BillingEmailForm onValidationChange={setBillingEmailValid} />
                                    <PhoneSignupForm />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={orderSummaryData}  />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div>
                        <div className="mx-auto flex justify-between gap-8">
                            <div className="w-1/2 space-y-6">
                                <AccountInformation  {...accountData} />
                                <BusinessInfoReview onEdit={handleEdit} />
                                <BusinessAddressReview onEdit={handleEdit} />
                                <BillingAddressForm fromReview={true} onEdit={handleEdit} />
                                <ShippingAddressForm fromReview={true} onEdit={handleEdit} />
                                <BillingInfoReview onEdit={handleEdit} />
                            </div>
                            <div className="w-1/2">
                                <OrderSummary data={orderSummaryData} type="variant3" />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div bg-background p-4 md:p-8>
                        <AgreementModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                        <AgreementPage setIsModalOpen={setIsModalOpen} />
                    </div>
                )

            case 5:
                return (
                    <div className="min-h-screen py-12 ">
                        <OrderConfirmation orderNumber="009015101" loginUrl="myalldata.com" />
                        <OrderSummary data={orderSummaryData} type="variant3" />
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
                    onClick: onContinue,
                    disabled: !(businessInfoValid && businessAddressValid && billingEmailValid)
                },
                secondaryButton: {
                    text: "BACK",
                    onClick: onBack,
                    variant: "outline"
                },
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start"
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
                buttonLayout: "flex-col sm:flex-row gap-4 pt-8 md:justify-center mt-8 lg:justify-start"
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
        <div className="mx-auto max-w-[1336px] pt-11 py-5 pb-2.5">
            {renderStepContent()}
            <div className="">
                {getStepButtons()}
            </div>
        </div>
    )
}

export default StepContentUSAnonyCheckout