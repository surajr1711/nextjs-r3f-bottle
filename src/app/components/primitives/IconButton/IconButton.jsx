import React from "react";
import PropTypes from "prop-types";
import buttonStyles from "../Button/Button.module.css";
import styles from "./IconButton.module.css";
import Icon from "../Icon/Icon";

const IconButton = ({ icon = "serach", ...props }) => {
	return (
		<button className={`${buttonStyles.button} ${styles.iconButton}`} type="button" {...props}>
			<Icon name={icon} />
		</button>
	);
};

IconButton.propTypes = {
	icon: PropTypes.string,
};

export default IconButton;
