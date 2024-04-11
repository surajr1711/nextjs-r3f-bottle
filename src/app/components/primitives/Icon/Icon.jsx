import React from "react";
import PropType from "prop-types";

const Icon = ({ name = "search", size = "1.25rem", style, ...props }) => {
	return (
		<span style={{ fontSize: `${size}`, ...style }} className="material-icons-outlined" {...props}>
			{name}
		</span>
	);
};

Icon.propTypes = {
	name: PropType.string,
	size: PropType.string,
};

export default Icon;
