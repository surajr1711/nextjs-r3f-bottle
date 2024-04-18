import IconButton from "./IconButton";
import { fn } from "@storybook/test";

export default {
	title: "Components/Primitives/IconButton",
	component: IconButton,
	args: { onClick: fn() },
};

export const Default = {
	args: {
		icon: "expand_more",
	},
};
export const NotFilled = {
	args: {
		icon: "expand_more",
		filled: false,
	},
};
