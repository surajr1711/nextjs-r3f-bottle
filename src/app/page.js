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
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { Loader } from "@react-three/drei";
import { cameraCoordinates } from "./data/cameraCoordinates";
import { HexColorPicker } from "react-colorful";

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
	const sidePanelsOpen = false;

	const snap = useSnapshot(state);

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
						<span style={{ display: "block" }}>Change background color</span>
						<HexColorPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color)} />
					</div>
					<div>
						<label>
							<input
								type="checkbox"
								name="autoRotate"
								checked={isAutoRotate}
								onChange={handleAutoRotateCheckboxChange}
							/>
							Enable autorotate
						</label>
					</div>
					<div>
						<label>
							<input
								type="checkbox"
								name="transparency"
								checked={isTransparent}
								onChange={handleTransparencyCheckboxChange}
							/>
							Enable transparency
						</label>
					</div>
					<button
						onClick={() => {
							setCameraControls(cameraCoordinates.initial);
						}}
					>
						Reset Camera
					</button>
					<button
						onClick={() => {
							setIsPOIVisible(!isPOIVisible);
						}}
					>
						Toggle POIs
					</button>
					<button
						onClick={() => {
							setCameraControls(cameraCoordinates.bottle);
						}}
					>
						Focus on bottle
					</button>
					<button
						onClick={() => {
							setCameraControls(cameraCoordinates.cap);
						}}
					>
						Focus on cap
					</button>
					<button
						onClick={() => {
							setCameraControls(cameraCoordinates.button);
						}}
					>
						Focus on button
					</button>
					<div>
						<label>
							<input
								type="checkbox"
								name="bottle"
								checked={hiddenParts.bottle}
								onChange={handleHidePartCheckboxChange}
							/>
							Hide bottle
						</label>
						<br />
						<label>
							<input type="checkbox" name="cap" checked={hiddenParts.cap} onChange={handleHidePartCheckboxChange} />
							Hide cap
						</label>
						<br />
						<label>
							<input
								type="checkbox"
								name="button"
								checked={hiddenParts.button}
								onChange={handleHidePartCheckboxChange}
							/>
							Hide button
						</label>
					</div>
				</PanelSection>

				<PanelSection title="Model animations">
					<button onClick={snap.actions?.toggleCap}>ToggleCap</button>
				</PanelSection>
			</SidePanel>

			{/* LOADING SCREEN */}
			{/* <LoadingScreen /> */}
			<Loader />
		</>
	);
}
