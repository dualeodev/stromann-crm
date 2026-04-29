"use client";

export function TopBar({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  return (
    <div className="topbar">
      <div className="searchbar">
        <span className="text-n-500">🔍</span>
        <input placeholder="Tìm sản phẩm, bài viết, yêu cầu, người dùng..." />
        <span className="text-[11px] text-n-400 px-1.5 py-0.5 border border-n-300 rounded">
          ⌘K
        </span>
      </div>
      <div className="tb__right">
        <button type="button" className="tb__btn" title="Trợ giúp">?</button>
        <button type="button" className="tb__btn" title="Thông báo" onClick={onOpenDrawer}>
          🔔<span className="dot"></span>
        </button>
        <a className="tb__btn" href="/" title="Xem website" target="_blank" rel="noreferrer">
          ↗
        </a>
        <div className="tb__user">
          <div className="tb__avatar">VA</div>
          <div>
            <div className="text-xs font-bold">Văn A</div>
            <div className="tb__role">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
