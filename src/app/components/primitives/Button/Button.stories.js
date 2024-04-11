import Button from "./Button";
import { fn } from "@storybook/test";

export default {
	title: "Components/Primitives/Button",
	component: Button,
	args: { onClick: fn() },
};

export const Default = {};
