import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

interface ISvgColorProps {
  className?: string;
  src: string;
}

export default forwardRef<HTMLSpanElement, ISvgColorProps>(function SvgColor(
  { className, src },
  ref
) {
  return (
    <span
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      ref={ref}
      className={cn("w-6 h-6 inline-block bg-current", className)}
    />
  );
});
