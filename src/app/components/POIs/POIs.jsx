import React, { useEffect } from "react";
import { poiData } from "./poiData";
import { MathUtils } from "three";
import { Html } from "@react-three/drei";
import styles from "./POI.module.css";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

const POIs = ({ hoveredMesh, setActiveMesh, animateCamera, ...props }) => {
	const handleClick = (e, poi) => {
		animateCamera(e, poi.camPos, poi.lookAt);
	};

	return (
		<>
			{poiData.map((poi) => (
				<Html key={MathUtils.generateUUID()} position={[poi.poiPos.x, poi.poiPos.y, poi.poiPos.z]} {...props}>
					<button
						// when mesh is hovered, adds class hover so that poi will pulse
						className={`${styles.poi} ${hoveredMesh === poi.title.toLowerCase() ? styles.hover : ""}`}
						onClick={(e) => handleClick(e, poi)}
					/>
					<div className={styles.text}>
						<span className={styles.title}>{poi.title}</span>
						<br />
						<span className={styles.desc}>{poi.description}</span>
					</div>
				</Html>
			))}
		</>
	);
};

export default POIs;
