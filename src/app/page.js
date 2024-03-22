"use client";

import { Suspense, useState } from "react";
import Experience from "./components/Experience/Experience";
import { Canvas } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";
import SidePanel from "./components/SidePanel/SidePanel";
import PanelSection, { UserInstructionsSection } from "./components/SidePanel/PanelSection";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./state/state";
import { HexColorPicker } from "react-colorful";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import POI from "./components/POI/POI";

export default function Home() {
	const snap = useSnapshot(state);

	// const [focus, setFocus] = useState("product");

	return (
		<>
			<Canvas>
				<Suspense fallback={null}>
					<Experience />
					<POI />
				</Suspense>
			</Canvas>

			{/* Info Panel on left */}
			<SidePanel title="Info">
				<UserInstructionsSection />

				<PanelSection title="Product details" open={true}>
					{/* <InfoPanel info={productInfo["product"]} /> */}
					<InfoPanel info={productInfo[snap?.active || "product"]} />
				</PanelSection>
			</SidePanel>

			{/* Interactions Panel on right */}
			<SidePanel title="Interactions" left={false}>
				<PanelSection title="Customizations">
					<ColorPicker />
				</PanelSection>

				<PanelSection title="Animations">
					<button onClick={state.actions?.toggleCap}>ToggleCap</button>
				</PanelSection>
			</SidePanel>
		</>
	);
}
