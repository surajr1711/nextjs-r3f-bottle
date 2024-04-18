import React from "react";
import PropType from "prop-types";
import buttonStyles from "../Button/Button.module.css";
import styles from "./IconButton.module.css";
import Icon from "../Icon/Icon";

const IconButton = ({ icon = "search", filled = true, ...props }) => {
	return (
		<button
			className={`${buttonStyles.button} ${styles.iconButton} ${!filled ? styles.iconOnly : null}`}
			type="button"
			{...props}
		>
			<Icon name={icon} style={{ color: "inherit" }} />
		</button>
	);
};

IconButton.propTypes = {
	icon: PropType.string,
	filled: PropType.bool,
};

export default IconButton;
