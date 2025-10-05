// UpdateAccoutDetails.stories.jsx
import React from "react";
import UpdateAccoutDetails from "./index";

export default {
    title: "Organisms/UpdateAccoutDetails",
    component: UpdateAccoutDetails,
    parameters: {
        layout: "centered",
    },
};

const Template = (args) => <UpdateAccoutDetails {...args} />;

export const Default = Template.bind({});
Default.args = {};

// Optional: you can add a story that opens the modal by default for demonstration
export const ModalOpen = Template.bind({});
ModalOpen.decorators = [
    (Story) => {
        const [isOpen, setIsOpen] = React.useState(true);
        return (
            <div style={{ maxWidth: "600px", padding: "2rem" }}>
                <UpdateAccoutDetails
                    {...Story.args}
                    // Override modal state
                    isModalOpen={isOpen}
                    setIsModalOpen={setIsOpen}
                />
            </div>
        );
    },
];
