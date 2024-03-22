import React, { useContext } from "react";
import { Html } from "@react-three/drei";
// import styles from "./styles.module.css";
import styles from "./POI.module.css";
import { pois } from "./pois";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "@/app/state/state";
import { MathUtils } from "three";

const POI = () => {
	/* // LEVA
	const { x, y, z } = useControls("POI", {
		x: pois[0].camPos.x,
		y: pois[0].camPos.y,
		z: pois[0].camPos.z,
	}); */
	const snap = useSnapshot(state);

	return (
		<>
			{pois.map((poi) => (
				<Html
					key={MathUtils.generateUUID()}
					as="span"
					className={`${styles.poi} ${
						snap.active?.toLowerCase() === poi.title.toLowerCase()
							? styles.active
							: snap.hovered?.toLowerCase() === poi.title.toLowerCase() && styles.hover
					}`}
					position={[poi.camPos.x, poi.camPos.y, poi.camPos.z]}
				>
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

export default POI;
