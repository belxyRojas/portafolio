import Image from "next/image";
import { cn } from "@/lib/utils";

type KnotMarkProps = {
  className?: string;
  title?: string;
  priority?: boolean;
  sizes?: string;
};

export function KnotMark({
  className,
  title = "bkrojas.dev",
  priority = false,
  sizes = "40px",
}: KnotMarkProps) {
  return (
    <Image
      src="/logo.png"
      alt={title}
      width={640}
      height={640}
      sizes={sizes}
      priority={priority}
      className={cn("h-8 w-8 object-contain", className)}
    />
  );
}
