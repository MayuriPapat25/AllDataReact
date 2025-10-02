// src/components/molecules/AccountInformation/AccountInformation.stories.js
import AccountInformation from "./index";

export default {
  title: "Molecules/AccountInformation",
  component: AccountInformation,
  tags: ["autodocs"], // Storybook Docs addon support
  argTypes: {
    email: { control: "text" },
    phoneNumber: { control: "text" },
    subscriptionLength: { control: "text" },
  },
};

export const Default = {
  args: {
    email: "johndoe@example.com",
    phoneNumber: "+91 9876543210",
    subscriptionLength: "12 Months",
  },
};

export const WithoutPhone = {
  args: {
    email: "janedoe@example.com",
    phoneNumber: "",
    subscriptionLength: "6 Months",
  },
};

export const Minimal = {
  args: {
    email: "user@company.com",
    phoneNumber: "",
    subscriptionLength: "",
  },
};
