import React from "react";
import PropType from "prop-types";
import styles from "./Text.module.css";

const Text = ({ as: Element = "p", type, children, ...props }) => {
	// If type is not provided set default Element styling else apply specified type style
	const textStyles = !type ? styles[Element] : styles[type];

	return (
		<Element className={textStyles} {...props}>
			{children || `${Element} text`}
		</Element>
	);
};

Text.propTypes = {
	/** what html element should be rendered. p, h1-6, label, span */
	as: PropType.string,
	/** what styling do you want to use. p, h1-6, label, small */
	type: PropType.string,
	/** Children should always be string */
	children: PropType.string,
};

export default Text;
