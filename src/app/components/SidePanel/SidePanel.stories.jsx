import SidePanel from "./SidePanel";
import { fn } from "@storybook/test";

export default {
	title: "Components/SidePanel",
	component: SidePanel,
	args: { onClick: fn() },
};

export const Default = {
	args: {
		title: "Side panel",
	},
};

export const Right = {
	args: {
		title: "Side panel",
		left: false,
	},
};
