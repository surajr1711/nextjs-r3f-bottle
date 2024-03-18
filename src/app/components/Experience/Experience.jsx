import {
	OrbitControls,
	useGLTF,
	useTexture,
	Stage,
	SpotLight,
	useHelper,
	Environment,
	PerspectiveCamera,
	Bounds,
	useBounds,
	useAnimations,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useContext, useEffect, useRef, useState, Suspense, useMemo } from "react";
import POI from "../POI/POI";
import { DirectionalLightHelper, HemisphereLightHelper, SpotLightHelper } from "three";
import InfoPanel from "../InfoPanel/InfoPanel";
import { productInfo } from "@/app/data/info";
import ClickToFocus from "../ClickToFocus/ClickToFocus";
import * as THREE from "three";

// const studioHDRi = import("@pmndrs/assets/hdri/studio.exr").then((module) => module.default);

const waterbottle = "/models/32-medpoly-anim-gltfjsx.glb";
const defaultColors = {
	cap: "#27487C",
	bottle: "#27487C",
	button: "#AAAAAA",
};

export default function Experience({ focus, setFocus, ...props }) {
	const [isCapOpen, setIsCapOpen] = useState(false);
	// get the animations from the model
	const { nodes, materials, animations } = useGLTF(waterbottle);

	// setup and extract the tooling to control the animations using useanimations hook.
	const { ref, actions } = useAnimations(animations);

	const toggleCap = () => {
		setIsCapOpen(!isCapOpen);
	};

	// const crossFadeTime = 0.2;

	useEffect(() => {
		const closeAction = actions.closeCap;
		const openAction = actions.openCap;
		window.setTimeout(() => {}, 2000); // stops multiple clicks before animation finishes
		if (isCapOpen) {
			closeAction.setLoop(THREE.LoopOnce);
			closeAction.clampWhenFinished = true;
			closeAction.reset().play();
			return () => {
				// closeAction.crossFadeTo(openAction, crossFadeTime);
				closeAction.stop();
			};
		} else {
			openAction.setLoop(THREE.LoopOnce);
			openAction.clampWhenFinished = true;
			openAction.reset().play();
			return () => {
				// openAction.crossFadeTo(closeAction, crossFadeTime);
				openAction.stop();
			};
		}
	}, [actions.closeCap, actions.openCap, isCapOpen]);

	const [colors, setColors] = useState(defaultColors);

	/*
	// REFS
	const directionalLightRef = useRef();
	const hemisphereLightRef = useRef();
	const spotlightRef = useRef();

		// HELPERS
	useHelper(directionalLightRef, DirectionalLightHelper, "cyan");
	useHelper(hemisphereLightRef, HemisphereLightHelper);
	useHelper(spotlightRef, SpotLightHelper, "red");

		// LEVA CONTROLS
	const intensityObj = {
		value: 0.5,
		max: 20,
		min: 0,
		step: 0.01,
	};
	const positionObj = {
		value: 0.5,
		max: 5,
		min: -5,
		step: 0.01,
	};

	 // LEVA FILL LIGHTING
	const { intensity: ambientLightIntensity } = useControls("Ambient: Fill lighting", {
		intensity: intensityObj,
	});
	const {
		intensity: directionalLightIntensity,
		x: directionalLightX,
		y: directionalLightY,
		z: directionalLightZ,
	} = useControls("Directional: Fill lighting", {
		intensity: intensityObj,
		x: positionObj,
		y: positionObj,
		z: positionObj,
	});
	const {
		intensity: hemisphereLightIntensity,
		x: hemispherelLightX,
		y: hemispherelLightY,
		z: hemispherelLightZ,
		skyColor: hemisphereSkyColor,
		groundColor: hemisphereGroundColor,
	} = useControls("Hemisphere: Fill lighting", {
		intensity: intensityObj,
		x: positionObj,
		y: positionObj,
		z: positionObj,
		skyColor: "blue",
		groundColor: "brown",
	});

	const {
		intensity: spotlightIntensity,
		x: spotlightX,
		y: spotlightY,
		z: spotlightZ,
	} = useControls("Spotlight: Key lighting", {
		intensity: intensityObj,
		x: positionObj,
		y: positionObj,
		z: positionObj,
	});

		// LEVA ENVIRONMENT MAP
	const { envMapIntensity } = useControls("environment map", {
		envMapIntensity: { value: 3.5, min: 0, max: 12, step: 0.1 },
	});

		// LEVA PART COLORS
	const { capColor, bottleColor, buttonColor } = useControls("Colors", {
		capColor: "#27487C",
		bottleColor: "#27487C",
		buttonColor: "#AAAAAA",
	});
	const { x, y, z } = useControls("Label position", {
		x: {
			value: 0,
			step: 0.01,
			min: -1,
			max: 1,
		},
		y: {
			value: 0,
			step: 0.01,
			min: -1,
			max: 1,
		},
		z: {
			value: 0,
			step: 0.01,
			min: -1,
			max: 1,
		},
	});

		// LEVA ORBIT CONTROLS
	const { maxDistance, minDistance } = useControls("Orbit Controls", {
		maxDistance: 10,
		minDistance: 1,
	}); */

	return (
		<>
			<color args={["dimgrey"]} attach="background" />
			<Stage shadows={{ type: "contact", opacity: 0.2, blur: 3 }} environment="studio" preset="rembrandt" intensity={1}>
				<Bounds fit clip observe margin={1.2}>
					<OrbitControls enablePan={false} enableZoom={false} makeDefault />

					<ClickToFocus focus={focus} setFocus={setFocus}>
						<group ref={ref} {...props} dispose={null}>
							<group name="Scene">
								<mesh
									name="capTop"
									castShadow
									receiveShadow
									geometry={nodes.capTop.geometry}
									material={materials.cap}
									position={[0, 0.213, -0.033]}
									material-color={colors.cap}
								>
									<POI
										colors={colors}
										setColors={setColors}
										label="Cap"
										position={[0.04, 0.02, 0]}
										changeColorOf="cap"
									/>
								</mesh>
								<mesh
									name="capBottom"
									castShadow
									receiveShadow
									geometry={nodes.capBottom.geometry}
									material={materials.cap}
									position={[0, 0.191, 0]}
									material-color={colors.cap}
								/>

								<mesh
									name="bottle"
									castShadow
									receiveShadow
									geometry={nodes.bottle.geometry}
									material={materials.bottle}
									material-color={colors.bottle}
								>
									<POI
										colors={colors}
										setColors={setColors}
										label="Bottle"
										position={[0.04, 0.08, 0]}
										changeColorOf="bottle"
									>
										<button onClick={toggleCap}>Toggle cap</button>
									</POI>
								</mesh>
								<mesh
									name="button"
									castShadow
									receiveShadow
									geometry={nodes.button.geometry}
									material={materials.button}
									position={[0, 0.212, 0.03]}
									material-color={colors.button}
								>
									<POI
										colors={colors}
										setColors={setColors}
										label="Button"
										position={[-0.02, 0, 0]}
										changeColorOf="button"
									/>
								</mesh>
							</group>
						</group>
					</ClickToFocus>
				</Bounds>
			</Stage>
		</>
	);
}
useGLTF.preload(waterbottle);
