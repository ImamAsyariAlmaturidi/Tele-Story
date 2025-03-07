import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

export default function Avatar({
  className,
  imageUrl,
}: {
  className?: ClassValue;
  imageUrl: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={cn(
        "h-6 w-6 rounded-full border-2 border-border dark:border-darkBorder bg-cover bg-center",
        className
      )}
    ></div>
  );
}
