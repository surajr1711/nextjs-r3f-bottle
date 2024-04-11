import "../src/app/globals.css";
import "material-icons/iconfont/outlined.css";
import "next/font/google";

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
