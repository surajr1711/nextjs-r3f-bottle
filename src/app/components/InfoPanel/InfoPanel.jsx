import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { MathUtils } from "three";

const InfoPanel = ({ info }) => {
	const specs = (
		<dl>
			{info.specs.map((arr) => (
				<div key={MathUtils.generateUUID()} className={styles.specs}>
					<dt>{arr[0]}:&nbsp;</dt>
					<dd>{arr[1]}</dd>
				</div>
			))}
		</dl>
	);

	const features = (
		<ul>
			{info.features.map((feat) => (
				<li key={MathUtils.generateUUID()}>{feat}</li>
			))}
		</ul>
	);

	const button = info.hasOwnProperty("link") ? <a href={info.link.url}>{info.link.text}</a> : null;

	return (
		<div>
			<span className={styles.title}>{info.name}</span>

			<span>Specifications</span>
			{specs}

			<span>Features</span>
			{features}

			{button}
		</div>
	);
};

export default InfoPanel;
