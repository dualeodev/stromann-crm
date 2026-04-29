import { Placeholder } from "./Placeholder";

export interface ProductImageProps {
  name?: string;
  dark?: boolean;
  src?: string | null;
}

export function ProductImage({ name, dark, src }: ProductImageProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name ?? "Product"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <Placeholder variant={dark ? "dark" : "brand"} className="w-full h-full">
      <svg
        viewBox="0 0 200 180"
        className="w-3/5 max-w-[160px]"
        style={{ opacity: dark ? 0.7 : 0.9 }}
        aria-hidden="true"
      >
        <rect x="74" y="20" width="52" height="20" rx="3" fill="var(--n-700)" opacity="0.4" />
        <rect x="60" y="40" width="80" height="120" rx="6" fill="var(--n-300)" opacity="0.5" />
        <rect x="68" y="78" width="64" height="36" rx="3" fill="#fff" opacity="0.95" />
        <rect x="76" y="86" width="48" height="6" rx="1" fill="var(--accent)" />
        <rect x="76" y="98" width="36" height="4" rx="1" fill="var(--n-500)" />
        <rect x="76" y="106" width="24" height="3" rx="1" fill="var(--n-500)" />
      </svg>
      <span
        className={
          "absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.05em] " +
          "px-2 py-1 rounded border " +
          (dark
            ? "text-n-400 bg-black/60 border-n-700"
            : "text-n-500 bg-white/85 border-n-200")
        }
      >
        {name || "Product"}
      </span>
    </Placeholder>
  );
}
