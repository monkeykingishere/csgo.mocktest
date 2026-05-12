import * as React from "react";

interface NbInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const NbInput = React.forwardRef<HTMLInputElement, NbInputProps>(
  ({ label, error, className = "", id, ...rest }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-bold uppercase tracking-wide">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={`nb-input ${className}`} {...rest} />
        {error && <p className="text-xs font-semibold text-[var(--brand-red)]">{error}</p>}
      </div>
    );
  },
);
NbInput.displayName = "NbInput";
