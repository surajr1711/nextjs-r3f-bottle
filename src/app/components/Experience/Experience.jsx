import React, { Suspense, useEffect, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { OrbitControls, Environment, PerspectiveCamera, useProgress } from "@react-three/drei";
import Model from "../Model/Model";
import POIs from "../POIs/POIs";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

const Experience = ({
	activeMesh,
	setActiveMesh,
	hoveredMesh,
	setHoveredMesh,
	isCapOpen,
	setIsCapOpen,
	colors,
	setColors,
	cameraControls,
	setCameraControls,
	isPOIHidden,
	hiddenParts,
	isAutoRotate,
	isTransparent,
	backgroundColor,
	// sceneLoaded,
	// setSceneLoaded,
	...props
}) => {
	const controlsRef = useRef();
	const { camera } = useThree();

	// const cameraRef = useRef();

	// const progress = useProgress();
	// console.log(progress);

	// LEVA
	// const { bgColor, perfVisible } = useControls({
	// 	bgColor: "#dddddd",
	// 	perfVisible: true,
	// });
	// const { maxDistance, minDistance } = useControls("Orbit controls zoom", {
	// 	maxDistance: { value: 7.0, step: 0.1, min: 5, max: 10.0 },
	// 	minDistance: { value: 1.0, step: 0.1, min: 1, max: 5.0 },
	// });
	// const { positionX, positionY, positionZ } = useControls("camera position", {
	// 	positionX: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	positionY: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	positionZ: { value: 7, step: 0.1, min: -10, max: 10 },
	// });
	// const { lookAtX, lookAtY, lookAtZ } = useControls("orbit controls target", {
	// 	lookAtX: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	lookAtY: { value: 0, step: 0.1, min: -10, max: 10 },
	// 	lookAtZ: { value: 0, step: 0.1, min: -10, max: 10 },
	// });

	useEffect(() => {
		// set camera position to front of bottle
		gsap.to(camera.position, {
			x: cameraControls.cameraPosition.x,
			y: cameraControls.cameraPosition.y,
			z: cameraControls.cameraPosition.z,
			duration: 1,
			ease: "power2.inOut",
		});
		// set center of orbit to center of scene
		gsap.to(controlsRef.current.target, {
			x: cameraControls.orbitTarget.x,
			y: cameraControls.orbitTarget.y,
			z: cameraControls.orbitTarget.z,
			duration: 1,
			ease: "power2.inOut",
		});
		// console.log(cameraControls);
	}, [camera.position, cameraControls]);

	return (
		<>
			{/* {perfVisible ? <Perf position="top-left" /> : null} */}

			{/* <PerspectiveCamera
				// ref={cameraRef}
				position={[positionX, positionY, positionZ]}
				// lookAt={[lookAtX, lookAtY, lookAtZ]}
				makeDefault
			/> */}

			<OrbitControls
				ref={controlsRef}
				enablePan={false}
				maxDistance={7}
				minDistance={1}
				autoRotate={isAutoRotate}
				// enableZoom={false}
				// maxDistance={maxDistance}
				// minDistance={minDistance}
				// target={[lookAtX, lookAtY, lookAtZ]}
				makeDefault
			/>

			<color args={[backgroundColor]} attach="background" />
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
					setCameraControls={setCameraControls}
					hiddenParts={hiddenParts}
					isTransparent={isTransparent}
				/>

				{!isPOIHidden && (
					<POIs
						hoveredMesh={hoveredMesh}
						activeMesh={activeMesh}
						setActiveMesh={setActiveMesh}
						setCameraControls={setCameraControls}
					/>
				)}
			</Suspense>
		</>
	);
};

export default Experience;
