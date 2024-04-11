import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { getMeshCenter } from "@/app/utils/getMeshCenter";
import { cameraCoordinates } from "@/app/data/cameraCoordinates";
import gsap from "gsap";
import { useModelAnimations } from "@/app/contexts/ModelAnimations";

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
	setCameraControls,
	hiddenParts,
	isTransparent,
	...props
}) => {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(waterbottle);
	const { actions } = useAnimations(animations, group);

	const { modelAnimations, setModelAnimations } = useModelAnimations();

	// useEffect(() => {
	// 	console.log(materials);
	// }, [materials]);

	Object.keys(materials).forEach((name) => {
		materials[name].transparent = true;
		// materials[name].opacity = 0.5;
	});

	useEffect(() => {
		Object.keys(hiddenParts).forEach((part) => {
			if (hiddenParts[part]) {
				gsap.to(materials[part], {
					opacity: 0,
					duration: 0.5,
				});
			} else {
				gsap.to(materials[part], {
					opacity: isTransparent ? 0.5 : 1,
					duration: 0.5,
				});
			}
		});
	}, [hiddenParts, materials, isTransparent]);

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
		setModelAnimations({ toggleCap });
	}, [setModelAnimations, toggleCap]);

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
						setCameraControls(cameraCoordinates.initial);
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
