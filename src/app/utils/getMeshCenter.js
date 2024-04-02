import * as THREE from "three";

export const getMeshCenter = (e) => {
	// calculate mesh center for use in orbit
	const vector = new THREE.Vector3();
	const center = e.object.geometry.boundingBox.getCenter(vector);
	// console.log(`${e.object.name} mesh center`, center);
	return center;
};
