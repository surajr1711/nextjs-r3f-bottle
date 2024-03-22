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
import { useContext, useEffect, useRef, useState, Suspense, useMemo, useCallback } from "react";
import POI from "../POI/POI";
import { DirectionalLightHelper, HemisphereLightHelper, SpotLightHelper } from "three";
import InfoPanel from "../InfoPanel/InfoPanel";
import { productInfo } from "@/app/data/info";
import ClickToFocus from "../ClickToFocus/ClickToFocus";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { state } from "@/app/state/state";

// const studioHDRi = import("@pmndrs/assets/hdri/studio.exr").then((module) => module.default);

const waterbottle = "/models/32-medpoly-anim-gltfjsx.glb";

export default function Experience({ model, ...props }) {
	const { nodes, materials, animations } = useGLTF(waterbottle);
	const { ref, actions } = useAnimations(animations);

	const snap = useSnapshot(state);

	// create toggleCap event handler and store it in state
	const toggleCap = useCallback(() => {
		if (!snap.isCapOpen) {
			actions.closeCap.stop();
			actions.openCap.setLoop(THREE.LoopOnce);
			actions.openCap.clampWhenFinished = true;
			actions.openCap.reset().play();
		} else {
			actions.openCap.stop();
			actions.closeCap.setLoop(THREE.LoopOnce);
			actions.closeCap.clampWhenFinished = true;
			actions.closeCap.reset().play();
		}
		state.isCapOpen = !snap.isCapOpen;
	}, [actions.closeCap, actions.openCap, snap.isCapOpen]);

	useEffect(() => {
		state.actions = { toggleCap };
	}, [toggleCap]);

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
				{/* <Bounds fit clip observe margin={1.2}> */}
				<OrbitControls enablePan={false} enableZoom={false} makeDefault />

				{/* <ClickToFocus focus={focus} setFocus={setFocus}> */}
				<group
					ref={ref}
					{...props}
					onClick={(e) => {
						e.stopPropagation();
						// console.log(e.object);
						state.active = e.object.material.name;
					}}
					onPointerMissed={() => {
						state.active = null;
					}}
					dispose={null}
					onPointerOver={(e) => {
						e.stopPropagation();
						state.hovered = e.object.material.name;
					}}
					onPointerOut={(e) => {
						if (e.intersections.length === 0) state.hovered = null;
					}}
				>
					<mesh
						name="capTop"
						castShadow
						receiveShadow
						geometry={nodes.capTop.geometry}
						material={materials.cap}
						position={[0, 0.213, -0.033]}
						material-color={snap.colors.cap}
					/>
					<mesh
						name="capBottom"
						castShadow
						receiveShadow
						geometry={nodes.capBottom.geometry}
						material={materials.cap}
						position={[0, 0.191, 0]}
						material-color={snap.colors.cap}
					/>
					<mesh
						name="bottle"
						castShadow
						receiveShadow
						geometry={nodes.bottle.geometry}
						material={materials.bottle}
						material-color={snap.colors.bottle}
					/>
					<mesh
						name="button"
						castShadow
						receiveShadow
						geometry={nodes.button.geometry}
						material={materials.button}
						position={[0, 0.212, 0.03]}
						material-color={snap.colors.button}
					/>
				</group>
				{/* </ClickToFocus> */}
				{/* </Bounds> */}
			</Stage>
		</>
	);
}
useGLTF.preload(waterbottle);
