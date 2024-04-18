import React, { useEffect, useState } from "react";
import styles from "./SidePanel.module.css";
import PropType from "prop-types";
import IconButton from "../primitives/IconButton/IconButton";
import Text from "../primitives/Text/Text";

const SidePanel = ({ title, left = true, open = true, children, ...props }) => {
	const [isOpen, setIsOpen] = useState(open);

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	const wrapperStyles = `${styles.wrapper} ${left ? styles.left : styles.right} ${!isOpen && styles.close}`;

	const buttonStyles = `${styles.button} ${left ? styles.left : styles.right} ${!isOpen && styles.close}`;

	const contentStyles = `${styles.content} ${left ? styles.left : styles.right} `;

	const titleDivStyles = `${left ? null : styles.titleDivRight}`;

	const icon = left ? (isOpen ? "chevron_left" : "chevron_right") : isOpen ? "chevron_right" : "chevron_left";

	const handleClick = () => {
		setIsOpen(!isOpen);
		// console.log(left ? "left" : "right", isOpen ? "open" : "closed");
	};

	return (
		<div className={wrapperStyles}>
			<div className={contentStyles} {...props}>
				<div className={titleDivStyles}>
					<Text as="span" type="title-l">
						{title}
					</Text>
				</div>
				{children}
			</div>

			<div className={buttonStyles}>
				<IconButton icon={icon} onClick={handleClick} />
			</div>
		</div>
	);
};

SidePanel.propTypes = {
	title: PropType.string,
	left: PropType.bool,
	open: PropType.bool,
};

export default SidePanel;
