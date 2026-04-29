import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";

export type InputSize = "md" | "lg";

interface FieldChromeProps {
  label?: ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

function fieldClass(className?: string) {
  return ["field", className ?? ""].filter(Boolean).join(" ");
}

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label>
      {children}
      {required && <span className="req"> *</span>}
    </label>
  );
}

function HelpRow({ error, hint }: { error?: string; hint?: string }) {
  if (error) {
    return <div className="text-[11px] mt-1" style={{ color: "#B00020" }}>{error}</div>;
  }
  if (hint) {
    return <div className="text-[11px] text-n-500 mt-1">{hint}</div>;
  }
  return null;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    FieldChromeProps {
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, required, error, hint, className, size = "md", ...rest },
  ref,
) {
  const inputCls = ["input", size === "lg" ? "input--lg" : ""].filter(Boolean).join(" ");
  return (
    <div className={fieldClass(className)}>
      {label && <Label required={required}>{label}</Label>}
      <input ref={ref} className={inputCls} required={required} {...rest} />
      <HelpRow error={error} hint={hint} />
    </div>
  );
});

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    FieldChromeProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, required, error, hint, className, rows = 3, ...rest },
  ref,
) {
  return (
    <div className={fieldClass(className)}>
      {label && <Label required={required}>{label}</Label>}
      <textarea ref={ref} className="input" rows={rows} required={required} {...rest} />
      <HelpRow error={error} hint={hint} />
    </div>
  );
});
