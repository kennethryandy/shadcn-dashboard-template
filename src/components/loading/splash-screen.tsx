"use client";
import { motion } from "framer-motion";
import Logo from "../logo";
import { useEffect, useState } from "react";

export default function SplashScreen() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="fixed right-0 bottom-0 w-full h-full z-9998 flex items-center justify-center bg-background">
			<motion.div
				animate={{
					scale: [1, 0.9, 0.9, 1, 1],
					opacity: [1, 0.48, 0.48, 1, 1],
				}}
				transition={{
					duration: 2,
					ease: "easeInOut",
					repeatDelay: 1,
					repeat: Infinity,
				}}
				className="w-16 h-16">
				<Logo className="w-16 h-16" disabled />
			</motion.div>
			<motion.div
				animate={{
					scale: [1.6, 1, 1, 1.6, 1.6],
					rotate: [270, 0, 0, 270, 270],
					opacity: [0.25, 1, 1, 1, 0.25],
					borderRadius: ["25%", "25%", "50%", "50%", "25%"],
				}}
				transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
				className="absolute border-primary/25 border-[5px] w-[100px] h-[100px]"></motion.div>
			<motion.div
				animate={{
					scale: [1, 1.2, 1.2, 1, 1],
					rotate: [0, 270, 270, 0, 0],
					opacity: [1, 0.25, 0.25, 0.25, 1],
					borderRadius: ["25%", "25%", "50%", "50%", "25%"],
				}}
				transition={{
					ease: "linear",
					duration: 3.2,
					repeat: Infinity,
				}}
				className="absolute border-primary/25 border-[5px] w-[120px] h-[120px]"></motion.div>
		</div>
	);
	// return (
	// 	<div className="fixed right-0 bottom-0 w-full h-full z-9998 flex items-center justify-center bg-background">
	// 		<div className="animate-logo-ping origin-center w-16 h-16">
	// 			<Logo className="w-16 h-16" />
	// 		</div>
	// 		<div className="absolute animate-spin-inner rounded-full border-primary/25 border-[5px] w-[100px] h-[100px]" />
	// 		<div className="absolute animate-spin-outer rounded-full border-primary/25 border-[5px] w-[120px] h-[120px]" />
	// 	</div>
	// );
}
