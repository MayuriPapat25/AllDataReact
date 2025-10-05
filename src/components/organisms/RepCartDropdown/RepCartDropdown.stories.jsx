import React from "react";
import { RepCartDropdown } from "./repCartDropdown";

export default {
    title: "Organisms/RepCartDropdown",
    component: RepCartDropdown,
};

// ✅ Default dropdown open
export const DefaultOpen = () => <RepCartDropdown isOpen={true} variant="dropdown" />;
DefaultOpen.storyName = "Dropdown Open";

// ✅ Dropdown closed
export const DropdownClosed = () => <RepCartDropdown isOpen={false} variant="dropdown" />;
DropdownClosed.storyName = "Dropdown Closed";

// ✅ Full page variant
export const FullPage = () => <RepCartDropdown variant="fullpage" />;
FullPage.storyName = "Full Page View";
