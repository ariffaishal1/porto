import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 space-y-3",
        centered ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="text-[clamp(1.875rem,4vw,2.25rem)] font-bold tracking-[-0.025em] leading-[1.15] text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
