import type { ReactNode } from "react";
import { Tag, type TagVariant } from "./Tag";

export interface SectHeadProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  right?: ReactNode;
  row?: boolean;
  eyebrowVariant?: TagVariant;
}

export function SectHead({
  eyebrow,
  title,
  sub,
  center,
  right,
  row,
  eyebrowVariant = "brand-soft",
}: SectHeadProps) {
  const wrap =
    "flex flex-col gap-3" +
    (center ? " text-center items-center" : "") +
    (row ? " flex-row items-end justify-between" : "");

  const inner =
    "flex flex-col gap-3" +
    (center ? " items-center" : " items-start");

  return (
    <div className={wrap}>
      <div className={inner}>
        {eyebrow && <Tag variant={eyebrowVariant}>{eyebrow}</Tag>}
        <h2 className="m-0 text-[36px] font-bold leading-[1.15] tracking-[-0.015em] text-n-900">
          {title}
        </h2>
        {sub && <p className="m-0 text-base text-n-600 max-w-[640px]">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
