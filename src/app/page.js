"use client";

import { Canvas, useThree } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";
import SidePanel from "./components/SidePanel/SidePanel";
import PanelSection, { UserInstructionsSection } from "./components/SidePanel/PanelSection";
import { useSnapshot } from "valtio";
import { state } from "./state/state";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import Experience from "./components/Experience/Experience";
import { useControls } from "leva";
import { useEffect, useState, Suspense, useRef } from "react";

export default function Home() {
	// STATES
	// hoveredMesh: used by model and POI. when mesh is hovered, corresponding POI will pulse. having complex state rerenders everything so better to do single value state. Like when i hover a mesh all POIs rerender. Or when i play togglecap animation all POIs rerender. Not good.
	const [hoveredMesh, setHoveredMesh] = useState(null);
	// activeMesh: used by model, POI and Customization panel. Is set when a mesh or poi is clicked. POI css changes to active state. Customization panel is set for the active mesh.
	const [activeMesh, setActiveMesh] = useState(null);
	const [isCapOpen, setIsCapOpen] = useState(false);
	const [colors, setColors] = useState({
		cap: "#27487C",
		bottle: "#27487C",
		button: "#AAAAAA",
	});

	// useEffect(() => {
	// 	console.log(activeMesh);
	// }, [activeMesh]);

	const { sidePanelsOpen } = useControls("Side panels", { sidePanelsOpen: false });

	const snap = useSnapshot(state);

	return (
		<>
			<Canvas>
				<Experience
					hoveredMesh={hoveredMesh}
					setHoveredMesh={setHoveredMesh}
					activeMesh={activeMesh}
					setActiveMesh={setActiveMesh}
					isCapOpen={isCapOpen}
					setIsCapOpen={setIsCapOpen}
					colors={colors}
					setColors={setColors}
				/>
			</Canvas>

			{/* USER INTERFACE */}
			<SidePanel title="Info" open={sidePanelsOpen}>
				<UserInstructionsSection />

				<PanelSection title="Product details" open={true}>
					<InfoPanel info={productInfo[activeMesh || "product"]} />
				</PanelSection>
			</SidePanel>

			<SidePanel title="Interactions" left={false} open={sidePanelsOpen}>
				<PanelSection title="Customizations">
					<ColorPicker activeMesh={activeMesh} colors={colors} setColors={setColors} />
				</PanelSection>

				<PanelSection title="Animations">
					<button onClick={snap.actions?.toggleCap}>ToggleCap</button>
				</PanelSection>
			</SidePanel>
		</>
	);
}
