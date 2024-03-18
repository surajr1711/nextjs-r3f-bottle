import React, { useContext } from "react";
import { Html } from "@react-three/drei";
import styles from "./styles.module.css";

const POI = ({ children, label, position, changeColorOf, colors, setColors, ...props }) => {
	// const [colors, setColors] = useContext(Context);

	// allows to set capTop and capBottom as cap color
	// const part = changeColorOf === "capTop" || "capBottom" ? "cap" : changeColorOf;

	return (
		<Html position={position} occlude {...props}>
			<div className={styles.poi}>
				<div className={styles.circle} />
				<div className={styles.content}>
					<strong>{label}</strong>

					<input
						className={styles.colorPicker}
						type="color"
						value={colors[changeColorOf]}
						onChange={(e) => setColors({ ...colors, [changeColorOf]: e.target.value })}
					/>

					{children}
				</div>
			</div>
		</Html>
	);
};

export default POI;
