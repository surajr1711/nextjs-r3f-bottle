import PanelSection from "./PanelSection";
import { fn } from "@storybook/test";

export default {
	title: "Components/PanelSection",
	component: PanelSection,
	args: { onClick: fn() },
};

export const Default = {
	args: {
		children: <div style={{ height: "300px" }}>Hello</div>,
	},
};
