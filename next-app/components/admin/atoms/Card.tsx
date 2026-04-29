import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={["card", className ?? ""].filter(Boolean).join(" ")}>{children}</div>;
}

function CardHead({
  title,
  desc,
  action,
}: {
  title?: ReactNode;
  desc?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="card__head">
      <div>
        {title && <h3>{title}</h3>}
        {desc && <div className="text-xs text-n-500 mt-0.5">{desc}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function CardBody({
  children,
  flush = false,
  className,
}: {
  children: ReactNode;
  flush?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "card__body",
        flush ? "p-0" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

Card.Head = CardHead;
Card.Body = CardBody;
