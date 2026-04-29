export function PageGeneric({
  title,
  breadcrumb,
  desc,
}: {
  title: string;
  breadcrumb: string;
  desc: string;
}) {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">{breadcrumb} / <span>{title}</span></div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
      <div className="card">
        <div className="card__body">
          <div className="empty">
            Trang quản lý {title.toLowerCase()} — bố cục tương tự các trang nội dung khác (table + filter + form thêm/sửa).
          </div>
        </div>
      </div>
    </>
  );
}
