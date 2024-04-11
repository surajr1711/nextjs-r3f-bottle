import React, { useEffect, useId, useState } from "react";
import PropType from "prop-types";
import styles from "./Checkbox.module.css";
import Icon from "../Icon/Icon";

const Checkbox = ({ label, name, checked, onClick = () => {}, id, ...props }) => {
	const generatedId = useId();

	const [state, setState] = useState(checked);

	const handleClick = (e) => {
		// e.stopPropagation();
		// console.log(e.target);
		setState(!state);
		if (onClick) onClick(e);
	};

	// if state is changed from outside internal state should change
	useEffect(() => {
		setState(checked);
	}, [checked]);

	return (
		<label className={styles.label}>
			<input
				className={styles.input}
				type="checkbox"
				name={name}
				checked={state}
				// checked={checked}
				onClick={handleClick}
				id={id || generatedId}
				{...props}
			/>
			<div className={styles.checkbox}>
				<Icon name="check" size="0.75rem" style={{ opacity: `${state ? "1" : "0"}` }} />
			</div>
			<span htmlFor={id || generatedId}>{label}</span>
		</label>
		// <div className={styles.wrapper}>
		// 	<input
		// 		className={styles.input}
		// 		type="checkbox"
		// 		name={name}
		// 		checked={state}
		// 		onClick={handleClick}
		// 		id={generatedId}
		// 		{...props}
		// 	/>
		// 	<div className={styles.checkbox}>
		// 		<Icon name="check" size="0.75rem" style={{ opacity: `${state ? "1" : "0"}` }} />
		// 	</div>
		// 	<label htmlFor={generatedId} className={styles.label}>
		// 		{label}
		// 	</label>
		// </div>
	);
};

Checkbox.propTypes = {
	label: PropType.string.isRequired,
	name: PropType.string.isRequired,
	checked: PropType.bool,
	onClick: PropType.func,
};

export default Checkbox;
