import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ label = "Button", ...props }) => {
	return (
		<button className={`${styles.button} ${styles.default}`} type="button" {...props}>
			{label}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string,
};

export default Button;
