import React, { useEffect } from "react";
import { poiData } from "../../data/poiData";
import { MathUtils } from "three";
import { Html } from "@react-three/drei";
import styles from "./POI.module.css";
import { cameraCoordinates } from "../../data/cameraCoordinates";

const POIs = ({
	hoveredMesh,
	activeMesh,
	setActiveMesh,
	setCameraControls,
	//  animateCamera,
	...props
}) => {
	const handleClick = (e, poi) => {
		e.stopPropagation();
		// animateCamera(e, poi.camPos, poi.lookAt);
		setCameraControls(cameraCoordinates[poi.title.toLowerCase()]);
		setActiveMesh(poi.title.toLowerCase());
		// console.log(poi.title, "clicked");
	};

	return (
		<>
			{poiData.map((poi) => (
				<Html key={MathUtils.generateUUID()} position={[poi.position.x, poi.position.y, poi.position.z]} {...props}>
					<button
						// when mesh is hovered, adds class hover so that poi will pulse otherwise check if mesh is the active one and make poi active else dont add additional classes
						className={`${styles.poi} ${
							hoveredMesh === poi.title.toLowerCase()
								? styles.hover
								: activeMesh === poi.title.toLowerCase()
									? styles.focus
									: ""
						}`}
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
