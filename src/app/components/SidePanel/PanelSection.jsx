import React, { useState } from "react";
import styles from "./PanelSection.module.css";
import IconButton from "../primitives/IconButton/IconButton";
import PropType from "prop-types";
import Text from "../primitives/Text/Text";
import { userInstructions } from "../../data/userInstructions";
import { HexColorPicker } from "react-colorful";
import Checkbox from "../primitives/Checkbox/Checkbox";
import Button from "../primitives/Button/Button";
import { cameraCoordinates } from "../../data/cameraCoordinates";

const PanelSection = ({ title = "Title", open = true, children = <div>Content</div>, ...props }) => {
	const [isOpen, setIsOpen] = useState(open);

	const contentStyles = `${styles.content} ${!isOpen && styles.close}`;

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.section} {...props}>
			<div className={styles.header}>
				<Text as="span" type="title-s">
					{title}
				</Text>

				<div className={`${styles.buttonWrapper} ${!isOpen ? styles.close : null}`}>
					<IconButton icon="expand_more" onClick={handleClick} />
				</div>
			</div>

			<div className={contentStyles}>{children}</div>
		</div>
	);
};

PanelSection.propTypes = {
	title: PropType.string,
	open: PropType.bool,
	children: PropType.element,
};

const UserInstructionsSection = () => {
	return (
		<PanelSection title="User Instructions" open={false}>
			<>
				{Object?.keys(userInstructions).map((title) => (
					<ul key={title} className={styles.userInstList}>
						{/* Description */}
						<Text as="span">{userInstructions[title].description}</Text>

						{/* List items */}
						{userInstructions[title].body.map((item, i) => (
							<li key={i} className={styles.userInstListItem}>
								<Text as="span" type="body-s">
									{item}
								</Text>
							</li>
						))}
					</ul>
				))}
			</>
		</PanelSection>
	);
};

const ProductInfoSection = ({ info, ...props }) => {
	const specs = (
		<dl>
			{info.specs.map((arr, i) => (
				<div key={i} className={styles.specs}>
					<dt>
						<Text type="body-s">{arr[0]}:&nbsp;</Text>
					</dt>
					<dd>
						<Text type="body-s">{Array.isArray(arr[1]) ? arr[1].join(", ") : arr[1]}</Text>
					</dd>
				</div>
			))}
		</dl>
	);

	const features = (
		<ul>
			{info.features.map((feat, i) => (
				<li key={i} className={styles.listItems}>
					<Text type="body-s">{feat}</Text>
				</li>
			))}
		</ul>
	);

	const button = info.hasOwnProperty("link") ? <a href={info.link.url}>{info.link.text}</a> : null;

	return (
		<PanelSection title="Product Details" {...props}>
			<div className={styles.flexboxV}>
				<div>
					<Text type="title-m">{info.name}</Text>
				</div>

				<div>
					<Text type="title-s">Specifications</Text>
					{specs}
				</div>

				<div>
					<Text type="title-s">Features</Text>
					{features}
				</div>

				{button}
			</div>
		</PanelSection>
	);
};

const CustomizationSection = ({ activeMesh, colors, setColors, ...props }) => {
	return (
		<PanelSection title="Customization" {...props}>
			<>
				{/* Info area displays active mesh */}
				<div className={styles.infoArea}>
					<Text
						as="span"
						style={activeMesh ? { textTransform: "capitalize" } : null}
						type={activeMesh ? "title-m" : "body-s"}
					>
						{activeMesh ? activeMesh : "Select a part to change its color."}
					</Text>
				</div>

				{/* Color picker */}
				<div className={!activeMesh ? styles.disabledColorPicker : null}>
					<HexColorPicker
						color={colors[activeMesh]}
						onChange={(color) => setColors({ ...colors, [activeMesh]: color })}
					/>
				</div>
			</>
		</PanelSection>
	);
};

const SceneControlsSection = ({
	backgroundColor,
	setBackgroundColor,
	toggleAutoRotate,
	toggleTransparency,
	togglePOIs,
	setCameraControls,
	toggleParts,
	...props
}) => {
	return (
		<PanelSection title="Scene Controls" {...props}>
			<>
				{/* background color */}
				<div>
					<Text as="span" type="caption-l" style={{ marginBottom: "0.5rem" }}>
						Background color
					</Text>
					<HexColorPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color)} />
				</div>

				{/* Checkboxes */}
				<div className={styles.padBlockBox}>
					<div className={styles.flexbox}>
						<Checkbox label="Autorotate" name="autoRotate" defaultChecked={true} onClick={toggleAutoRotate} />
						<Checkbox label="Transparency" name="transparency" defaultChecked={false} onClick={toggleTransparency} />
					</div>
				</div>

				<div className={styles.padBlockBox}>
					<Text as="span" type="caption-l" style={{ marginBottom: "0.5rem" }}>
						Hide elements
					</Text>
					<div className={styles.flexbox}>
						<Checkbox label="POIs" name="togglePOIs" defaultChecked={false} onClick={togglePOIs} />
						<Checkbox label="Bottle" name="bottle" defaultChecked={false} onClick={toggleParts} />
						<Checkbox label="Cap" name="cap" defaultChecked={false} onClick={toggleParts} />
						<Checkbox label="Button" name="button" defaultChecked={false} onClick={toggleParts} />
					</div>
				</div>

				{/* Buttons */}
				<div className={styles.padBlockBox}>
					<Text as="span" type="caption-l" style={{ marginBottom: "0.5rem" }}>
						Camera position
					</Text>
					<div className={styles.flexbox}>
						<Button label="Reset" onClick={() => setCameraControls(cameraCoordinates.initial)} />
						<Button label="Focus bottle" onClick={() => setCameraControls(cameraCoordinates.bottle)} />
						<Button label="Focus cap" onClick={() => setCameraControls(cameraCoordinates.cap)} />
						<Button label="Focus button" onClick={() => setCameraControls(cameraCoordinates.button)} />
					</div>
				</div>
			</>
		</PanelSection>
	);
};

export default PanelSection;
export { UserInstructionsSection, ProductInfoSection, CustomizationSection, SceneControlsSection };
