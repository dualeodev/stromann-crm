"use client";

export function ChipMulti({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (v: string) => {
    if (selected.includes(v)) onChange(selected.filter((x) => x !== v));
    else onChange([...selected, v]);
  };
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={
              "px-3 py-1.5 text-xs font-semibold rounded-full border " +
              (on
                ? "border-brand-500 bg-[#FFE4E6] text-brand-700"
                : "border-n-300 bg-white text-n-700")
            }
          >
            {on && "✓ "}
            {o}
          </button>
        );
      })}
    </div>
  );
}
