export function ActionRow() {
  return (
    <div className="tbl__actions">
      <button type="button" className="tbl__act"        title="Xem">👁</button>
      <button type="button" className="tbl__act"        title="Sửa">✎</button>
      <button type="button" className="tbl__act danger" title="Xóa">🗑</button>
    </div>
  );
}
