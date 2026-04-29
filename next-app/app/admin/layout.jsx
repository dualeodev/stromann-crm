import "./admin.css";

export const metadata = {
  title: "Stromann Admin — CMS",
};

export default function AdminLayout({ children }) {
  return <div className="admin-root" style={{ background: "#F5F6F8" }}>{children}</div>;
}
