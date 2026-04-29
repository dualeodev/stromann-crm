import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: ReactNode;
  /** Cell renderer. Return string/number/JSX. */
  cell: (row: T) => ReactNode;
  /** Tailwind className applied to <th> and <td>. */
  className?: string;
  /** Right-align numeric columns, etc. */
  align?: "left" | "center" | "right";
  /** Width like "120px" or "20%". */
  width?: string;
}

const ALIGN_CLASS: Record<NonNullable<Column<unknown>["align"]>, string> = {
  left: "",
  center: "text-center",
  right: "text-right",
};

export interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  /** Stable key per row. */
  rowKey: (row: T) => string | number;
  /** Wrap each row in a Link? Returns an href, or null to render plain row. */
  rowHref?: (row: T) => string | null;
  empty?: ReactNode;
  className?: string;
}

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  rowHref,
  empty,
  className,
}: DataTableProps<T>) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>;
  }
  return (
    <table className={["tbl", className ?? ""].filter(Boolean).join(" ")}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              className={[ALIGN_CLASS[c.align ?? "left"], c.className ?? ""].filter(Boolean).join(" ")}
              style={c.width ? { width: c.width } : undefined}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const href = rowHref?.(row) ?? null;
          return (
            <tr key={rowKey(row)} className={href ? "cursor-pointer" : undefined}>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={[ALIGN_CLASS[c.align ?? "left"], c.className ?? ""].filter(Boolean).join(" ")}
                >
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
