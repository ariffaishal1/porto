import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "emerald" | "outline" | "subtle";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";

  const variants = {
    default:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700",
    emerald:
      "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50",
    outline:
      "bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300",
    subtle:
      "bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-transparent",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
