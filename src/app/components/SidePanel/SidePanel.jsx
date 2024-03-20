import React, { useState } from "react";
import styles from "./SidePanel.module.css";

const SidePanel = ({ title, left = true, open = true, children, ...props }) => {
	const [isOpen, setIsOpen] = useState(open);

	const sidePanelStyles = `${styles.sidePanel} ${left ? styles.left : styles.right} ${!isOpen && styles.close}`;
	const buttonStyles = `${styles.button} ${left ? styles.leftSidePanel : styles.rightSidePanel}`;

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={sidePanelStyles} {...props}>
			<span className={styles.title}>{title}</span>

			<button className={buttonStyles} onClick={handleClick}>
				Open/Close
			</button>

			{children}
		</div>
	);
};

export default SidePanel;
