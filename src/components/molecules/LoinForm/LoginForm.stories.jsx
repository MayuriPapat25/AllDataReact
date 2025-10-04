// LoginForm.stories.jsx
import React from "react";
import LoginForm from "./index";

export default {
    title: "Organisms/LoginForm",
    component: LoginForm,
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["alldata", "diy"],
        },
        onLogin: { action: "loginClicked" },
    },
};

const Template = (args) => <LoginForm {...args} />;

export const ALLDATA = Template.bind({});
ALLDATA.args = {
    variant: "alldata",
};

export const DIY = Template.bind({});
DIY.args = {
    variant: "diy",
};
