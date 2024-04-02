import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { state } from "@/app/state/state";
import { getMeshCenter } from "@/app/utils/getMeshCenter";

// const studioHDRi = import("@pmndrs/assets/hdri/studio.exr").then((module) => module.default);

const waterbottle = "/models/32-medpoly-anim-gltfjsx.glb";

const Model = ({
	model,
	hoveredMesh,
	setHoveredMesh,
	setActiveMesh,
	isCapOpen,
	setIsCapOpen,
	colors,
	resetCamera,
	...props
}) => {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(waterbottle);
	const { actions } = useAnimations(animations, group);

	const snap = useSnapshot(state);

	// create toggleCap event handler and store it in state
	const toggleCap = useCallback(() => {
		if (!isCapOpen) {
			actions.closeCap?.stop();
			actions.openCap?.setLoop(THREE.LoopOnce);
			actions.openCap.clampWhenFinished = true;
			actions.openCap?.reset().play();
		} else {
			actions.openCap?.stop();
			actions.closeCap?.setLoop(THREE.LoopOnce);
			actions.closeCap.clampWhenFinished = true;
			actions.closeCap?.reset().play();
		}
		setIsCapOpen(!isCapOpen);
	}, [actions.closeCap, actions.openCap, isCapOpen, setIsCapOpen]);

	useEffect(() => {
		state.actions = { toggleCap };
	}, [toggleCap]);

	return (
		<>
			<Center>
				<group
					ref={group}
					{...props}
					scale={20}
					onClick={(e) => {
						e.stopPropagation();
						setActiveMesh(e.object.material.name);
						// getMeshCenter(e);
					}}
					onPointerMissed={() => {
						setActiveMesh(null);
						resetCamera();
					}}
					dispose={null}
					onPointerOver={(e) => {
						e.stopPropagation();
						setHoveredMesh(e.object.material.name);
					}}
					onPointerOut={(e) => {
						if (e.intersections.length === 0) {
							setHoveredMesh(null);
						}
					}}
				>
					<mesh
						name="capTop"
						castShadow
						receiveShadow
						geometry={nodes.capTop.geometry}
						material={materials.cap}
						position={[0, 0.213, -0.033]}
						material-color={colors.cap}
					/>
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
					/>
					<mesh
						name="button"
						castShadow
						receiveShadow
						geometry={nodes.button.geometry}
						material={materials.button}
						position={[0, 0.212, 0.03]}
						material-color={colors.button}
					/>
				</group>
			</Center>
		</>
	);
};
useGLTF.preload(waterbottle);

export default Model;
