import type { ReactNode } from "react";

export function FormSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="card mb-4">
      <div className="card__head">
        <div>
          <h3>{title}</h3>
          {desc && (
            <div className="text-xs text-n-500 mt-0.5">{desc}</div>
          )}
        </div>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}
