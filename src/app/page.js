"use client";

import { Suspense, useState } from "react";
import Experience from "./components/Experience/Experience";
import { Canvas } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";
import SidePanel from "./components/SidePanel/SidePanel";
import PanelSection, { UserInstructionsSection } from "./components/SidePanel/PanelSection";

export default function Home() {
	const [focus, setFocus] = useState("product");
	return (
		<>
			<Canvas>
				<Suspense fallback={null}>
					<Experience focus={focus} setFocus={setFocus} />
				</Suspense>
			</Canvas>

			{/* Info Panel on left */}
			<SidePanel title="Info">
				<UserInstructionsSection />

				<PanelSection title="Product details" open={true}>
					<InfoPanel info={productInfo[focus]} />
				</PanelSection>
			</SidePanel>

			{/* Interactions Panel on right */}
			<SidePanel title="Interactions" left={false} />
		</>
	);
}
