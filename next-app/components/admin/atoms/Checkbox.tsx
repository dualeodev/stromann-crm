import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, className, ...rest },
  ref,
) {
  return (
    <label className={["flex items-start gap-2 text-[13px] cursor-pointer", className ?? ""].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" className="mt-0.5" {...rest} />
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span>{label}</span>}
          {description && <span className="text-[11px] text-n-500 mt-0.5">{description}</span>}
        </span>
      )}
    </label>
  );
});
