import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 overflow-hidden",
        hoverEffect &&
          "transition-[transform,box-shadow,border-color] duration-200 hover:shadow-sm hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
