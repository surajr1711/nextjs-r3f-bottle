"use client";

import { createContext, useContext, useState } from "react";

// create context
const ModelAnimationsContext = createContext();

// create provider
export const ModelAnimationsProvider = (props) => {
	const [modelAnimations, setModelAnimations] = useState({});
	return (
		<ModelAnimationsContext.Provider
			value={{
				modelAnimations,
				setModelAnimations,
			}}
		>
			{props.children}
		</ModelAnimationsContext.Provider>
	);
};

// create hook to use context
export const useModelAnimations = () => {
	return useContext(ModelAnimationsContext);
};
