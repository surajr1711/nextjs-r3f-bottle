import React from "react";
import { HexColorPicker } from "react-colorful";
import { state } from "@/app/state/state";
import { useSnapshot } from "valtio";
import styles from "./ColorPicker.module.css";

const ColorPicker = () => {
	const snap = useSnapshot(state);

	return (
		<div>
			<h1>{snap.active ? snap.active : "Select a part of the bottle."}</h1>
			<div className={!snap.active ? styles.disabled : null}>
				<HexColorPicker color={snap.colors[snap.active]} onChange={(color) => (state.colors[snap.active] = color)} />
			</div>
		</div>
	);
};

export default ColorPicker;
