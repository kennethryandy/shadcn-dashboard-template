"use client";
import EmptyContent from "@/components/empty-content";
import { Card, CardContent } from "@/components/ui/card";

// ----------------------------------------------------------------------

interface ProfileGalleryProps {}

export default function ProfileGallery({}: ProfileGalleryProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-2xl font-bold text-common">Gallery</h3>
			<Card>
				<CardContent className="p-0 h-[400px]">
					<EmptyContent className="size-full" />
				</CardContent>
			</Card>
		</div>
	);
}
