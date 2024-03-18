import { useBounds } from "@react-three/drei";

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
// if you don't click on an object ie onpointermissed, refresh bounds to whole object or screen
const ClickToFocus = ({ children, setFocus }) => {
	const api = useBounds();

	return (
		<group
			onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit(), setFocus(e.object.name))}
			onPointerMissed={(e) => {
				e.button === 0 && api.refresh().fit(), setFocus("product");
			}}
		>
			{children}
		</group>
	);
};

export default ClickToFocus;
