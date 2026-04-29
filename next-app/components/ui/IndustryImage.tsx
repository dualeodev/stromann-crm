import { Placeholder } from "./Placeholder";

export interface IndustryImageProps {
  label?: string;
  dark?: boolean;
}

export function IndustryImage({ label, dark }: IndustryImageProps) {
  return (
    <Placeholder
      label={label || "industry photo"}
      variant={dark ? "dark" : "default"}
      className="w-full h-full"
    />
  );
}
