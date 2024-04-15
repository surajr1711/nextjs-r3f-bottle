import React, { useEffect, useId, useState } from "react";
import PropType from "prop-types";
import styles from "./Checkbox.module.css";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";

const Checkbox = ({ id, name, label, ...props }) => {
	const generatedId = useId();

	return (
		<label className={styles.label} htmlFor={id || generatedId}>
			{/* hidden checkbox */}
			<input className={styles.input} type="checkbox" id={id || generatedId} name={name} {...props} />

			{/* custom checkbox */}
			<div className={styles.checkbox}>
				<div className={styles.checkIconWrapper}>
					<Icon name="check" size="0.75rem" color="white" />
				</div>
			</div>

			<Text as="span" type="caption-l">
				{label}
			</Text>
		</label>
	);
};

Checkbox.propTypes = {
	label: PropType.string.isRequired,
	name: PropType.string.isRequired,
};

export default Checkbox;
