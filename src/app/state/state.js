import { proxy } from "valtio";

export const state = proxy({
	active: null,
	hovered: null,
	colors: {
		cap: "#27487C",
		bottle: "#27487C",
		button: "#AAAAAA",
	},
	actions: null,
	isCapOpen: false,
});
