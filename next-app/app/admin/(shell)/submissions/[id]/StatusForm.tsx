"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/admin/showToast";
import { updateSubmissionStatus, deleteSubmission } from "@/lib/admin/submissions-actions";
import type { SubmissionStatus } from "@/lib/admin/types";

export default function StatusForm({
  id,
  status,
}: {
  id: string;
  status: SubmissionStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const change = (next: SubmissionStatus) => {
    startTransition(async () => {
      const r = await updateSubmissionStatus(id, next);
      if (r.ok) showToast("Đã cập nhật trạng thái");
      else showToast(r.error ?? "Có lỗi xảy ra");
    });
  };

  const onDelete = () => {
    if (!confirm("Xoá form này? Hành động không thể hoàn tác.")) return;
    startTransition(async () => {
      const r = await deleteSubmission(id);
      if (r.ok) {
        showToast("Đã xoá");
        router.push("/admin/submissions");
      } else {
        showToast(r.error ?? "Có lỗi xảy ra");
      }
    });
  };

  return (
    <div className="card mb-4">
      <div className="card__head"><h3>Trạng thái xử lý</h3></div>
      <div className="card__body">
        <div className="field">
          <label>Trạng thái</label>
          <select
            className="input"
            value={status}
            disabled={pending}
            onChange={(e) => change(e.target.value as SubmissionStatus)}
          >
            <option value="new">Mới</option>
            <option value="in-progress">Đang xử lý</option>
            <option value="done">Đã xử lý</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn--secondary w-full mt-3"
          onClick={onDelete}
          disabled={pending}
        >
          🗑 Xoá form
        </button>
      </div>
    </div>
  );
}
