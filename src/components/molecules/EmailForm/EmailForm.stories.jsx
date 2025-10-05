// EmailForm.stories.jsx
import React, { useState } from "react";
import EmailForm from "./index";

export default {
    title: "Organisms/EmailForm",
    component: EmailForm,
    argTypes: {
        email: { control: "text" },
        agreedToEmails: { control: "boolean" },
    },
};

const Template = (args) => {
    const [email, setEmail] = useState(args.email);
    const [agreedToEmails, setAgreedToEmails] = useState(args.agreedToEmails);

    return (
        <EmailForm
            email={email}
            onEmailChange={setEmail}
            agreedToEmails={agreedToEmails}
            onAgreedToEmailsChange={setAgreedToEmails}
            onSubmit={(data) => console.log("Form submitted:", data)}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    email: "hinal.parik@qed42.org",
    agreedToEmails: true,
};
