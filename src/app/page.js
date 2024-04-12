"use client";

import { Canvas, useThree } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";
import SidePanel from "./components/SidePanel/SidePanel";
import PanelSection, { UserInstructionsSection } from "./components/SidePanel/PanelSection";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import Experience from "./components/Experience/Experience";
import { useControls } from "leva";
import { useEffect, useState, Suspense, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { Loader } from "@react-three/drei";
import { cameraCoordinates } from "./data/cameraCoordinates";
import { HexColorPicker } from "react-colorful";
import { useModelAnimations } from "./contexts/ModelAnimations";
import Button from "./components/primitives/Button/Button";
import "material-icons/iconfont/outlined.css";
import Checkbox from "./components/primitives/Checkbox/Checkbox";

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
	// sceneLoaded: when scene is loaded, the loadingscreen will use apply the loaded class and it will fade away. scene loaded is passed to expereince and POI.
	// const [sceneLoaded, setSceneLoaded] = useState(false);
	const [cameraControls, setCameraControls] = useState(cameraCoordinates.initial);
	const [isPOIVisible, setIsPOIVisible] = useState(true);
	const [hiddenParts, setHiddenParts] = useState({
		bottle: false,
		cap: false,
		button: false,
	});
	const [isAutoRotate, setIsAutoRotate] = useState(true);
	const [isTransparent, setIsTransparent] = useState(false);
	const [backgroundColor, setBackgroundColor] = useState("#dddddd");

	// Handle checkbox change
	const handleHidePartCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setHiddenParts((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleAutoRotateCheckboxChange = () => {
		setIsAutoRotate(!isAutoRotate);
	};
	const handleTransparencyCheckboxChange = () => {
		setIsTransparent(!isTransparent);
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
						isPOIVisible={isPOIVisible}
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
				<PanelSection title="Customizations">
					<ColorPicker activeMesh={activeMesh} colors={colors} setColors={setColors} />
				</PanelSection>

				<PanelSection title="Scene controls">
					<div>
						<div>
							<span style={{ display: "block" }}>Change background color</span>
							<HexColorPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color)} />
						</div>
						<Checkbox
							label="Enable autorotate"
							name="autoRotate"
							defaultChecked={true}
							onClick={handleAutoRotateCheckboxChange}
						/>
						<Checkbox
							label="Enable transparency"
							name="transparency"
							defaultChecked={false}
							onClick={handleTransparencyCheckboxChange}
						/>
						<Button
							label="Reset camera"
							onClick={() => {
								setCameraControls(cameraCoordinates.initial);
							}}
						/>
						<Button
							label="Toggle POIs"
							onClick={() => {
								setIsPOIVisible(!isPOIVisible);
							}}
						/>
						<Button
							label="Focus on bottle"
							onClick={() => {
								setCameraControls(cameraCoordinates.bottle);
							}}
						/>
						<Button
							label="Focus on cap"
							onClick={() => {
								setCameraControls(cameraCoordinates.cap);
							}}
						/>
						<Button
							label="Focus on button"
							onClick={() => {
								setCameraControls(cameraCoordinates.button);
							}}
						/>
						<div>
							<Checkbox
								label="Hide bottle"
								name="bottle"
								// checked={hiddenParts.bottle}
								defaultChecked={false}
								onClick={handleHidePartCheckboxChange}
							/>
							<Checkbox
								label="Hide cap"
								name="cap"
								defaultChecked={false}
								// checked={hiddenParts.cap}
								onClick={handleHidePartCheckboxChange}
							/>
							<Checkbox
								label="Hide button"
								name="button"
								defaultChecked={false}
								// checked={hiddenParts.button}
								onClick={handleHidePartCheckboxChange}
							/>
						</div>
					</div>
				</PanelSection>

				<PanelSection title="Model animations">
					<Button label="Toggle cap" onClick={modelAnimations?.toggleCap} />
				</PanelSection>
			</SidePanel>

			{/* <Loader /> */}
		</>
	);
}
