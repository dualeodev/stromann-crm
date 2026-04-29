import { PageGeneric } from "@/components/admin/pages/PageGeneric";

export default function UsersPage() {
  return (
    <PageGeneric
      title="Người dùng & quyền"
      breadcrumb="Hệ thống"
      desc="Phân quyền theo nhóm: Super Admin · Sales · Kỹ thuật · Content · HR."
    />
  );
}
