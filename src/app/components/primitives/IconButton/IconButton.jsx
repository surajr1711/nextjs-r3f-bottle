import React from "react";
import PropType from "prop-types";
import buttonStyles from "../Button/Button.module.css";
import styles from "./IconButton.module.css";
import Icon from "../Icon/Icon";

const IconButton = ({ icon = "search", ...props }) => {
	return (
		<button className={`${buttonStyles.button} ${styles.iconButton}`} type="button" {...props}>
			<Icon name={icon} />
		</button>
	);
};

IconButton.propTypes = {
	icon: PropType.string,
};

export default IconButton;
