import React from "react";
import { HexColorPicker } from "react-colorful";
import styles from "./ColorPicker.module.css";

const ColorPicker = ({ activeMesh, colors, setColors, ...props }) => {
	// const snap = useSnapshot(state);

	return (
		<div {...props}>
			<h1>{activeMesh ? activeMesh : "Select a part of the bottle."}</h1>
			<div className={!activeMesh ? styles.disabled : null}>
				<HexColorPicker
					color={colors[activeMesh]}
					onChange={(color) => setColors({ ...colors, [activeMesh]: color })}
				/>
			</div>
		</div>
	);
};

export default ColorPicker;
