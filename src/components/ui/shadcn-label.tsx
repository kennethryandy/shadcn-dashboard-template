"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

const shadcnlabelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const ShadcnLabel = forwardRef<
	ElementRef<typeof LabelPrimitive.Root>,
	ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof shadcnlabelVariants>
>(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(shadcnlabelVariants(), className)} {...props} />);
ShadcnLabel.displayName = LabelPrimitive.Root.displayName;

export { ShadcnLabel };
