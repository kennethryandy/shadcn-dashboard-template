import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ----------------------------------------------------------------------

interface ILogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export default function Logo({
  className,
  height = 40,
  width = 40,
}: ILogoProps) {
  const logo = (
    <div
      className={cn(
        "inline-flex h-10 w-10",
        className,
        height && `h-[${height}px]`,
        width && `w-[${width}px]`
      )}
    >
      <Image src="/vercel.svg" alt="Logo" height={height} width={width} />
    </div>
  );
  return (
    <Link href="/" className="contents">
      {logo}
    </Link>
  );
}
