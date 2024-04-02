import { proxy } from "valtio";

/* STATE
active: stores name of mesh or POI that is clicked. affects the info shown and customization panel. clicking out clears active.
hovered: activates pulse animation for corresponsing POI
focused: set when POI is clicked. affects camera position to zoom in to focused part. clicking out clears focused.
isCapOpen: boolean. stores whether the cap is open or closed. used by toggle animation button.
colors: object storing hex color value of each mesh. used by customization panel.
*/

export const state = proxy({
	// active: null,
	// hovered: null,
	// colors: {
	// 	cap: "#27487C",
	// 	bottle: "#27487C",
	// 	button: "#AAAAAA",
	// },
	actions: null,
	// isCapOpen: false,
});
