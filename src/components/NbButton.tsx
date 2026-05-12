import * as React from "react";

type Variant = "default" | "yellow" | "blue" | "green" | "red" | "orange" | "purple" | "ghost";
const colors: Record<Variant, string> = {
  default: "bg-white text-black",
  yellow: "bg-[var(--brand-yellow)] text-black",
  blue: "bg-[var(--brand-blue)] text-white",
  green: "bg-[var(--brand-green)] text-white",
  red: "bg-[var(--brand-red)] text-white",
  orange: "bg-[var(--brand-orange)] text-white",
  purple: "bg-[var(--brand-purple)] text-white",
  ghost: "bg-transparent text-black",
};

interface NbButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}
export const NbButton = React.forwardRef<HTMLButtonElement, NbButtonProps>(
  ({ variant = "default", size = "md", className = "", children, ...rest }, ref) => {
    const sizeCls =
      size === "sm" ? "px-3 py-1.5 text-sm" :
      size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";
    return (
      <button
        ref={ref}
        className={`nb-interactive font-bold uppercase tracking-wide disabled:opacity-50 disabled:pointer-events-none ${colors[variant]} ${sizeCls} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
NbButton.displayName = "NbButton";
