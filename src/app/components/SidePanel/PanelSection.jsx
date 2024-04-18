import React, { useState } from "react";
import styles from "./PanelSection.module.css";
import IconButton from "../primitives/IconButton/IconButton";
import PropType from "prop-types";
import Text from "../primitives/Text/Text";
import { userManual } from "../../data/userManual";
import { HexColorPicker } from "react-colorful";
import Checkbox from "../primitives/Checkbox/Checkbox";
import Button from "../primitives/Button/Button";
import { cameraCoordinates } from "../../data/cameraCoordinates";
import { productColors } from "../../data/productInfo";
import { useModelAnimations } from "../../contexts/ModelAnimations";

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
					<IconButton icon="expand_more" filled={false} onClick={handleClick} />
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

const UserManualSection = () => {
	return (
		<PanelSection title="User Manual" open={false}>
			<>
				{Object?.keys(userManual).map((title) => (
					<ul key={title} className={styles.userInstList}>
						{/* Description */}
						<Text as="span">{userManual[title].description}</Text>

						{/* List items */}
						{userManual[title].body.map((item, i) => (
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
		<PanelSection title="Colors" {...props}>
			<>
				{/* Info area displays active mesh */}
				<div className={styles.infoArea}>
					<Text
						as="span"
						style={activeMesh ? { textTransform: "capitalize" } : null}
						type={activeMesh ? "title-m" : "body-s"}
					>
						{activeMesh ? activeMesh : "Click a part and change its color here."}
					</Text>
				</div>

				{/* Color picker */}
				<div className={!activeMesh ? styles.disabledColorPicker : null}>
					<HexColorPicker
						color={colors[activeMesh]}
						onChange={(color) => setColors({ ...colors, [activeMesh]: color })}
					/>
				</div>

				{/* Reset button */}
				<Button
					label="Reset colors"
					style={{ marginTop: "0.75rem" }}
					onClick={() => setColors(productColors["Navy"])}
				/>
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
	const { modelAnimations } = useModelAnimations();
	return (
		<PanelSection title="Controls" {...props}>
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
						Camera focus
					</Text>
					<div className={styles.flexbox}>
						<Button label="Reset" onClick={() => setCameraControls(cameraCoordinates.initial)} />
						<Button label="Bottle" onClick={() => setCameraControls(cameraCoordinates.bottle)} />
						<Button label="Cap" onClick={() => setCameraControls(cameraCoordinates.cap)} />
						<Button label="Button" onClick={() => setCameraControls(cameraCoordinates.button)} />
					</div>
				</div>

				<div className={styles.padBlockBox}>
					<Text as="span" type="caption-l" style={{ marginBottom: "0.5rem" }}>
						Animations
					</Text>
					<Button label="Toggle cap" onClick={modelAnimations?.toggleCap} />
				</div>
			</>
		</PanelSection>
	);
};

/* const AnimationsSection = () => {
	const { modelAnimations } = useModelAnimations();
	return (
		<PanelSection title="Animations">
			<Button label="Toggle cap" onClick={modelAnimations?.toggleCap} />
		</PanelSection>
	);
}; */

export default PanelSection;
export {
	UserManualSection,
	ProductInfoSection,
	CustomizationSection,
	SceneControlsSection,
	// AnimationsSection
};
