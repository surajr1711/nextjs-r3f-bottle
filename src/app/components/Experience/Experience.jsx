import React, { Suspense, useEffect, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "../Model/Model";
import POIs from "../POIs/POIs";
import { useSnapshot } from "valtio";
import { state } from "@/app/state/state";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Experience = ({
	activeMesh,
	setActiveMesh,
	hoveredMesh,
	setHoveredMesh,
	isCapOpen,
	setIsCapOpen,
	colors,
	setColors,
	...props
}) => {
	const controlsRef = useRef();
	const { camera } = useThree();
	// const cameraRef = useRef();

	// LEVA
	const { bgColor, perfVisible } = useControls({
		bgColor: "#dddddd",
		perfVisible: true,
	});
	const {} = useControls("Orbit controls", {});
	// maxDistance: { value: 7.0, step: 0.1, min: 0, max: 10.0 },
	// minDistance: { value: 2.0, step: 0.1, min: 0, max: 10.0 },
	const { positionX, positionY, positionZ } = useControls("camera position", {
		positionX: { value: 0, step: 0.1, min: -10, max: 10 },
		positionY: { value: 0, step: 0.1, min: -10, max: 10 },
		positionZ: { value: 7, step: 0.1, min: -10, max: 10 },
	});
	// const { lookAtX, lookAtY, lookAtZ } = useControls("orbit controls target", {
	// 	lookAtX: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	lookAtY: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	lookAtZ: { value: 0, step: 0.1, min: -10, max: 10 },
	// });

	const resetCamera = () => {
		// set camera position to front of bottle
		gsap.to(camera.position, {
			x: 0,
			y: 3.06,
			z: 5,
			duration: 1,
			ease: "power2.inOut",
		});
		// set center of orbit to center of scene
		gsap.to(controlsRef.current.target, {
			x: 0,
			y: 0,
			z: 0,
			duration: 1,
			ease: "power2.inOut",
		});
	};

	const animateCamera = (e, camPos, orbitTarget) => {
		e.stopPropagation();
		// update the camera position
		gsap.to(camera.position, {
			x: camPos.x,
			y: camPos.y,
			z: camPos.z,
			duration: 1,
			ease: "power2.inOut",
		});
		// update the center of orbit to mesh center
		gsap.to(controlsRef.current.target, {
			x: orbitTarget.x,
			y: orbitTarget.y,
			z: orbitTarget.z,
			duration: 1,
			ease: "power2.inOut",
		});
	};

	return (
		<>
			{perfVisible ? <Perf position="top-left" /> : null}

			{/* <PerspectiveCamera
				// ref={cameraRef}
				position={[positionX, positionY, positionZ]}
				// lookAt={[lookAtX, lookAtY, lookAtZ]}
				makeDefault
			/> */}

			<OrbitControls
				ref={controlsRef}
				enablePan={false}
				// enableZoom={false}
				// maxDistance={maxDistance}
				// minDistance={minDistance}
				// target={[lookAtX, lookAtY, lookAtZ]}
				makeDefault
			/>

			<color args={[bgColor]} attach="background" />
			<Environment preset="studio" />

			<Suspense fallback={null}>
				<Model
					hoveredMesh={hoveredMesh}
					setHoveredMesh={setHoveredMesh}
					setActiveMesh={setActiveMesh}
					isCapOpen={isCapOpen}
					setIsCapOpen={setIsCapOpen}
					colors={colors}
					setColors={setColors}
					resetCamera={resetCamera}
				/>
				<POIs hoveredMesh={hoveredMesh} setActiveMesh={setActiveMesh} animateCamera={animateCamera} />
			</Suspense>
		</>
	);
};

export default Experience;
