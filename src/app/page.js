"use client";

import { Canvas, useThree } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";
import SidePanel from "./components/SidePanel/SidePanel";
import PanelSection, {
	CustomizationSection,
	SceneControlsSection,
	UserInstructionsSection,
} from "./components/SidePanel/PanelSection";
import Experience from "./components/Experience/Experience";
import { useControls } from "leva";
import { useEffect, useState, Suspense, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { Loader } from "@react-three/drei";
import { cameraCoordinates } from "./data/cameraCoordinates";
import { useModelAnimations } from "./contexts/ModelAnimations";
import Button from "./components/primitives/Button/Button";
import "material-icons/iconfont/outlined.css";

export default function Home() {
	const [hoveredMesh, setHoveredMesh] = useState(null);
	const [activeMesh, setActiveMesh] = useState(null);
	const [isCapOpen, setIsCapOpen] = useState(false);
	const [colors, setColors] = useState({
		cap: "#27487C",
		bottle: "#27487C",
		button: "#AAAAAA",
	});
	const [cameraControls, setCameraControls] = useState(cameraCoordinates.initial);
	const [isPOIHidden, setIsPOIHidden] = useState(false);
	const [hiddenParts, setHiddenParts] = useState({
		bottle: false,
		cap: false,
		button: false,
	});
	const [isAutoRotate, setIsAutoRotate] = useState(true);
	const [isTransparent, setIsTransparent] = useState(false);
	const [backgroundColor, setBackgroundColor] = useState("#dddddd");

	// Handle checkbox change
	const toggleParts = (e) => {
		const { name, checked } = e.target;
		setHiddenParts((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const toggleAutoRotate = () => {
		setIsAutoRotate(!isAutoRotate);
	};
	const toggleTransparency = () => {
		setIsTransparent(!isTransparent);
	};
	const togglePOIs = () => {
		setIsPOIHidden(!isPOIHidden);
	};

	// const { sidePanelsOpen } = useControls("Side panels", { sidePanelsOpen: false });
	const sidePanelsOpen = true;

	const { modelAnimations } = useModelAnimations();

	return (
		<>
			<Canvas>
				<Suspense fallback={null}>
					<Experience
						hoveredMesh={hoveredMesh}
						setHoveredMesh={setHoveredMesh}
						activeMesh={activeMesh}
						setActiveMesh={setActiveMesh}
						isCapOpen={isCapOpen}
						setIsCapOpen={setIsCapOpen}
						colors={colors}
						setColors={setColors}
						// sceneLoaded={sceneLoaded}
						// setSceneLoaded={setSceneLoaded}
						cameraControls={cameraControls}
						setCameraControls={setCameraControls}
						isPOIHidden={isPOIHidden}
						hiddenParts={hiddenParts}
						isAutoRotate={isAutoRotate}
						isTransparent={isTransparent}
						backgroundColor={backgroundColor}
					/>
				</Suspense>
			</Canvas>

			{/* USER INTERFACE */}
			<SidePanel title="Info" open={sidePanelsOpen}>
				<UserInstructionsSection />

				<PanelSection title="Product details" open={true}>
					<InfoPanel info={productInfo[activeMesh || "product"]} />
				</PanelSection>
			</SidePanel>

			<SidePanel title="Interactions" left={false} open={sidePanelsOpen}>
				<CustomizationSection activeMesh={activeMesh} colors={colors} setColors={setColors} />

				<SceneControlsSection
					backgroundColor={backgroundColor}
					setBackgroundColor={setBackgroundColor}
					toggleAutoRotate={toggleAutoRotate}
					toggleTransparency={toggleTransparency}
					togglePOIs={togglePOIs}
					setCameraControls={setCameraControls}
					toggleParts={toggleParts}
				/>

				<PanelSection title="Model animations">
					<Button label="Toggle cap" onClick={modelAnimations?.toggleCap} />
				</PanelSection>
			</SidePanel>

			{/* <Loader /> */}
		</>
	);
}
