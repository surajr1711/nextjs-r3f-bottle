import Checkbox from "./Checkbox";
import { fn } from "@storybook/test";

export default {
	title: "Components/Primitives/Checkbox",
	component: Checkbox,
	args: {
		onClick: fn(),
	},
};

export const Default = {
	args: {
		label: "test",
		name: "test",
	},
};
