import React, { useState } from "react";
import styles from "./PanelSection.module.css";

const PanelSection = ({ title = "title", open = true, children, ...props }) => {
	const [isOpen, setIsOpen] = useState(open);

	const contentStyles = `${styles.content} ${!isOpen && styles.close}`;

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.section} {...props}>
			<div className={styles.header}>
				<span className={styles.title}>{title}</span>
				<button className={styles.button} onClick={handleClick}>
					Open/Close
				</button>
			</div>

			<div className={contentStyles}>{children}</div>
		</div>
	);
};

const UserInstructionsSection = () => {
	return (
		<PanelSection title="User Instructions" open={false}>
			<ul>
				<li>Click on screen and drag to rotate the bottle.</li>
				<li>Scroll the mousewheel to zoom in and out.</li>
				<li>Click on a Point of Interest to focus on a part.</li>
				<li>Click anywhere on the background to refocus on the whole bottle.</li>
				<li>
					Use the animation buttons on the right side panel to see the functionality of the bottle.
					<ul>
						<li>Open/close the cap.</li>
						<li>Remove the cap.</li>
						<li>Disassemble all parts; cap, silicone gasket, mouthpiece.</li>
						<li>Do a full product tour explaining all features part by part.</li>
					</ul>
				</li>
				<li>
					Use the action buttons to control the scene.
					<ul>
						<li>Reset the camera.</li>
						<li>Change the background.</li>
						<li>Rotate the model.</li>
						<li>Turn on confetti or dust or water spray or mini bottles</li>
						<li>Hide the turntable</li>
						<li>Select different camera angles.</li>
					</ul>
				</li>
				<li>
					Customize the bottle.
					<ul>
						<li>Change the colors.</li>
						<li>Change the capacity/size.</li>
						<li>Change the logo colors and style.</li>
						<li>Add a print to the bottle.</li>
						<li>Place stickers anywhere.</li>
						<li>Add oil smudges, dirt, scratches, dents.</li>
						<li>Engrave your name.</li>
					</ul>
				</li>
			</ul>
		</PanelSection>
	);
};

export default PanelSection;
export { UserInstructionsSection };
