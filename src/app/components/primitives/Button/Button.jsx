import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import Text from "../Text/Text";

const Button = ({ label = "Button", ...props }) => {
	return (
		<button className={`${styles.button} ${styles.default}`} type="button" {...props}>
			{/* <Text as="span" type="caption-l"> */}
			{label}
			{/* </Text> */}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string,
};

export default Button;
