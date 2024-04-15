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

	const sidePanelStyles = `${styles.sidePanel} ${left ? styles.left : styles.right} ${!isOpen && styles.close}`;
	const buttonStyles = `${styles.button} ${left ? styles.leftSidePanel : styles.rightSidePanel} ${!isOpen && styles.close}`;

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={sidePanelStyles} {...props}>
			<div className={buttonStyles}>
				<IconButton icon="expand_more" onClick={handleClick} />
			</div>

			<div className={styles.content}>
				<Text as="span" type="heading-m">
					{title}
				</Text>
				{/* <span className={styles.title}>{title}</span> */}
				{children}
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
