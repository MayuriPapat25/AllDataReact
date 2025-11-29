import React, { useRef } from "react";
import LoginForm from "../LoinForm"
import BillingAddressForm from '../BillingAddress'
import ShippingAddressForm from '../ShippingAddress'
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
import BillingAddress from '../BillingAddress/BillingAddress';
import ShippingAddress from "../ShippingAddress/ShippingAddress"
import { translations } from "../../../shared/translations"
import BusinessAddressValidation from "../BusinessAddressValidation"
import AccountCreation from "../AccountCreationForm/AccountCreation"
import { useSelector, useDispatch } from "react-redux";
import { setAccountCreation, clearAccountCreation, clearBillingAddress, clearShippingAddress } from "../../../store/store"
import { computeIsValid } from "../../../shared/utils/validation"
import BillingAddressReview from "../BillingAddressReview";
import ShippingAddressReview from "../ShippingAddressReview";
import BillingInfoReview from "../BillingInfoReview";


const USAnonyFlowValidation = ({
    currentStep,
    onContinue,
    onBack,
    stepConfig = {}
}) => {
    const dispatch = useDispatch();
    const accountRef = useRef(null);
    const prevStepRef = useRef(null);
    const billingRef = useRef(null); 
    const shippingRef = useRef(null);

    useEffect(() => {
        // prevStepRef.current contains the *previous* value of currentStep
        // we update it at the end of this render cycle for the next change
        const id = setTimeout(() => {
            prevStepRef.current = currentStep;
        }, 0);
        return () => clearTimeout(id);
    }, [currentStep]);

    const returnedFromReview = prevStepRef.current === 3 && currentStep === 2;

    // read saved account values
    const savedAccount = useSelector((state) => state.form?.accountCreation) ?? {};

    const [step1Valid, setStep1Valid] = useState(false)
    const [businessInfoValid, setBusinessInfoValid] = useState(false)
    const [businessAddressValid, setBusinessAddressValid] = useState(false)
    const [billingEmailValid, setBillingEmailValid] = useState(false)
    const [billingAddressValid, setBillingAddressValid] = useState(false)
    const [shippingAddressValid, setShippingAddressValid] = useState(false)
    const [billingInfoValid, setBillingInfoValid] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true);
    // called whenever DynamicForm values change (you can debounce this if needed)
    const handleAccountFormChange = (values) => {
        if (!values) return;
        // merge with existing savedAccount to preserve other fields like agreeToTerms
        const mergedValues = { ...(savedAccount || {}), ...values };
        dispatch(setAccountCreation(mergedValues));
    };

    // Initialize agreeToTerms from saved account data
    useEffect(() => {
        if (savedAccount?.agreeToTerms !== undefined) {
            setAgreeToTerms(savedAccount.agreeToTerms);
        }
    }, [savedAccount]);

    // Validate saved account data when returning to step 1
    useEffect(() => {
        if (currentStep === 1 && savedAccount && Object.keys(savedAccount).length > 0) {
            // Use the validation utility to check if saved data is valid
            const isFormValid = computeIsValid(savedAccount, "account");
            
            if (isFormValid) {
                setFormValid(true);
            }
        } else if (currentStep === 1 && (!savedAccount || Object.keys(savedAccount).length === 0)) {
            // Reset form validation if no saved data
            setFormValid(false);
        }
    }, [currentStep, savedAccount]);


    useEffect(() => {
        if (currentStep === 4) {
            setIsModalOpen(true);
        }
    }, [currentStep]);

    // Clear account creation data after successful order completion (step 5)
    useEffect(() => {
        if (currentStep === 5) {
            // Clear saved account data after order is complete
            dispatch(clearAccountCreation());
        }
    }, [currentStep, dispatch]);

    const { cartItems, paymentFrequency, subscriptionTerm, autoRenewalDate, promoCode } = useSelector((state) => state.cart);
    const subscriptionSubtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const discount = promoCode ? +(subscriptionSubtotal * 0.10).toFixed(2) : 0;
    const totalMonthly = subscriptionSubtotal - discount;
    const totalDueToday = totalMonthly;

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
        discount:`${discount}`
    };

    const headerContent = {
        title: translations?.create_new_account,
        description: "If you are purchasing a new subscription, please create an account below to complete purchase.",
    }
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const businessAddress = useSelector(state => state.form.businessAddress) ?? {};
    const billingAddress = useSelector(state => state.form.billingAddress) ?? {};
    const shippingAddress = useSelector(state => state.form.shippingAddress) ?? {};
    
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
                                <BusinessInformation onValidationChange={setBusinessInfoValid}/>
                                <BusinessAddressValidation initialData={businessAddress} onValidationChange={setBusinessAddressValid} 
                                onSave={(vals) => {
                                    console.log("address saved", vals);
                                }} />
                                <BillingAddress ref={billingRef}  onValidationChange={setBillingAddressValid} forceEditOnMount={returnedFromReview} />
                                <ShippingAddress ref={shippingRef}  onValidationChange={setShippingAddressValid} forceEditOnMount={returnedFromReview} />
                                <div className="space-y-6">
                                    <BillingInformation onValidationChange={setBusinessInfoValid}/>
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
                                <AccountInformation accountData={savedAccount} subscriptionTerm={subscriptionTerm }/>
                                <BusinessInfoReview  phoneNumber={savedAccount?.phone} />
                                <BusinessAddressReview />
                                <BillingAddressReview  />
                                <ShippingAddressReview  />
                                <BillingInfoReview  />
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
                    onClick: () => {
                        accountRef.current?.saveNow();
                        onContinue();
                    },
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
                    disabled: !(businessInfoValid && businessAddressValid && billingAddressValid &&
                        shippingAddressValid && billingEmailValid)
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
                    onClick: onContinue,
                },
                secondaryButton: {
                    text: "BACK",
                    onClick: () => {
                        // compare business & billing address
                        const keysToCompare = [
                            "streetAddress",
                            "city",
                            "state",
                            "zip",
                            "country",
                        ];

                        const isBillingSameAsBusiness =
                            businessAddress &&
                            billingAddress &&
                            keysToCompare.every(
                                (key) =>
                                    (businessAddress?.[key] || "") ===
                                    (billingAddress?.[key] || "")
                            );
                        if (isBillingSameAsBusiness) {
                            // only clear if billing is same as business
                            dispatch(clearBillingAddress(null));
                        }
                        const isShippingSameAsBusiness =
                            businessAddress &&
                            shippingAddress &&
                            keysToCompare.every(
                                (key) =>
                                    (businessAddress?.[key] || "") ===
                                    (shippingAddress?.[key] || "")
                            );
                        if (isShippingSameAsBusiness) {
                            // only clear if billing is same as business
                            dispatch(clearShippingAddress(null));
                        }

                        onBack();
                    },
                    variant: "outline",
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

export default USAnonyFlowValidation