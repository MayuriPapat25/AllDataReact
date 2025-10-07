// StepContentDIYCheckout.stories.jsx
import React from "react";
import StepContentDIYCheckout from "./index";

// Simple stub components so Storybook won't break
const OrderSummaryDIY = () => <div style={{ padding: "1rem", border: "1px dashed #ccc" }}>[OrderSummaryDIY]</div>;
const PlaceOrderForm = () => <div style={{ padding: "1rem", border: "1px dashed #ccc" }}>[PlaceOrderForm]</div>;
const BillingInformation = () => <div style={{ padding: "1rem", border: "1px dashed #ccc" }}>[BillingInformation]</div>;
const TermsConditions = () => <div style={{ padding: "1rem", border: "1px dashed #ccc" }}>[TermsConditions]</div>;
const OrderConfirmation = () => <div style={{ padding: "1rem", border: "1px dashed #ccc" }}>[OrderConfirmation]</div>;

// Decorator to replace child components with mocks
const withMocks = (Story) => {
  return (
    <Story
      // Pass mocks into the component so it doesn't import real ones
      components={{
        OrderSummaryDIY,
        PlaceOrderForm,
        BillingInformation,
        TermsConditions,
        OrderConfirmation,
      }}
    />
  );
};

export default {
  title: "Components/Checkout/StepContentDIYCheckout",
  component: StepContentDIYCheckout,
  decorators: [withMocks],
};

const Template = (args) => <StepContentDIYCheckout {...args} />;

export const Step1 = Template.bind({});
Step1.args = {
  currentStep: 1,
  onContinue: () => alert("Continue from Step 1"),
  onBack: () => alert("Back clicked"),
};

export const Step2 = Template.bind({});
Step2.args = {
  currentStep: 2,
  onContinue: () => alert("Complete Purchase"),
  onBack: () => alert("Back clicked"),
};

export const Step3 = Template.bind({});
Step3.args = {
  currentStep: 3,
  onContinue: () => alert("Access Product"),
  onBack: () => alert("Manage Account"),
};
