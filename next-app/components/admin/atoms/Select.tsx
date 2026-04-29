import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

export interface SelectOption<V extends string = string> {
  value: V;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
  options?: SelectOption[];
  placeholder?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    required,
    error,
    hint,
    options,
    placeholder,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div className={["field", className ?? ""].filter(Boolean).join(" ")}>
      {label && (
        <label>
          {label}
          {required && <span className="req"> *</span>}
        </label>
      )}
      <select ref={ref} className="input" required={required} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
      {error ? (
        <div className="text-[11px] mt-1" style={{ color: "#B00020" }}>{error}</div>
      ) : hint ? (
        <div className="text-[11px] text-n-500 mt-1">{hint}</div>
      ) : null}
    </div>
  );
});
