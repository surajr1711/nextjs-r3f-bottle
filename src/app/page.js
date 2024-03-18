"use client";

import { Suspense, useState } from "react";
import Experience from "./components/Experience/Experience";
import { Canvas } from "@react-three/fiber";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import { productInfo } from "./data/info";

export default function Home() {
	const [focus, setFocus] = useState("product");
	return (
		<>
			<Canvas>
				<Suspense fallback={null}>
					<Experience focus={focus} setFocus={setFocus} />
				</Suspense>
			</Canvas>
			<InfoPanel info={productInfo[focus]} />
		</>
	);
}
