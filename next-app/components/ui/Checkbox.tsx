import type { ChangeEventHandler } from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  count?: number;
}

export function Checkbox({ checked, onChange, label, count }: CheckboxProps) {
  return (
    <label
      className={
        "group flex items-center justify-between py-1.5 cursor-pointer select-none"
      }
    >
      <span
        className={
          "flex items-center gap-2 text-[13px] " +
          (checked
            ? "text-n-900 font-semibold"
            : "text-n-700 group-hover:text-n-900")
        }
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 m-0 cursor-pointer accent-brand-500"
        />
        {label}
      </span>
      {count != null && (
        <span className="text-xs text-n-400">({count})</span>
      )}
    </label>
  );
}
