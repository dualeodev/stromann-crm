import { Eye, Pencil, Trash2 } from "lucide-react";

export function ActionRow() {
  return (
    <div className="tbl__actions">
      <button type="button" className="tbl__act" title="Xem" aria-label="Xem">
        <Eye size={16} strokeWidth={1.75} />
      </button>
      <button type="button" className="tbl__act" title="Sửa" aria-label="Sửa">
        <Pencil size={16} strokeWidth={1.75} />
      </button>
      <button type="button" className="tbl__act danger" title="Xóa" aria-label="Xóa">
        <Trash2 size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}
