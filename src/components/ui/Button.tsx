import { cn } from "../../lib/utils";
import { IconLoading } from "../icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent text-accent-fg hover:opacity-80 active:scale-[0.98] disabled:bg-button-primary-disabled",
    secondary: "bg-bg-tertiary text-text-primary hover:opacity-80 active:scale-[0.98]",
    ghost: "text-text-secondary hover:opacity-80",
    outline: "border border-border-light text-text-primary hover:opacity-80 active:scale-[0.98]",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <IconLoading size={14} />}
      {children}
    </button>
  );
}
