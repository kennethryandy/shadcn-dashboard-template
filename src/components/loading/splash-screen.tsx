import React from "react";
import Logo from "../logo"; // Assuming Logo component exists

export default function SplashScreen() {
	return (
		<div className="fixed right-0 bottom-0 w-full h-full z-9998 flex items-center justify-center bg-background">
			<div className="animate-logo-ping origin-center w-16 h-16">
				<Logo className="w-16 h-16" />
			</div>
			<div className="absolute animate-spin-inner rounded-full border-primary/25 border-[5px] w-[100px] h-[100px]" />
			<div className="absolute animate-spin-outer rounded-full border-primary/25 border-[5px] w-[120px] h-[120px]" />
		</div>
	);
}
