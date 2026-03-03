import { cn } from "../../lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", pulse = false, children, className }: BadgeProps) {
  const variants = {
    default: "bg-bg-tertiary text-text-secondary",
    success: "bg-alert-positive/10 text-alert-positive border border-alert-positive/20",
    warning: "bg-other-bg text-other-primary border border-other-border-secondary",
    danger: "bg-alert-negative/10 text-alert-negative border border-alert-negative/20",
    info: "bg-booking-bg text-booking-primary border border-booking-border-secondary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variants[variant],
        pulse && "animate-pulse",
        className
      )}
    >
      {children}
    </span>
  );
}
