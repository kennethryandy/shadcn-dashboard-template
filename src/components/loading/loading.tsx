// ----------------------------------------------------------------------

export default function Loading() {
	return (
		<div className="w-full h-full max-h-screen flex items-center justify-center px-8">
			<div className="h-1.5 rounded-s-sm rounded-e-sm w-full max-w-sm overflow-hidden bg-muted-foreground/10">
				<div className="animate-progress w-full h-full bg-muted-foreground left-right origin-left-right"></div>
			</div>
		</div>
	);
}
