import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface CardPageProps {
	children?: ReactNode;
}

export default function CardPage({ children }: CardPageProps) {
	return (
		<div>
			CardPage
			{children}
		</div>
	);
}
