"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Btn } from "@/components/ui";
import BasicInfoFields from "@/components/forms/BasicInfoFields";
import { submitTechnicalForm, type SubmitResult } from "@/lib/submissions";

export interface IssueOption {
  id: string;
  name: string;
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Btn variant="primary" size="lg" className="w-full" as="button" type="submit" disabled={pending}>
      {pending ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
    </Btn>
  );
}

export default function TechnicalForm({ issues }: { issues: IssueOption[] }) {
  const [state, formAction] = useFormState<SubmitResult | null, FormData>(submitTechnicalForm, null);

  if (state?.ok) {
    return (
      <div className="bg-white border border-n-200 rounded-r-16 p-8">
        <h3 className="mt-0 text-[22px] text-success">✓ Đã gửi yêu cầu tư vấn kỹ thuật</h3>
        <p className="text-n-600">Đội kỹ sư Stromann sẽ phản hồi trong vòng 4h làm việc.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white border border-n-200 rounded-r-16 p-8">
      <h3 className="mt-0 text-[22px]">Yêu cầu tư vấn kỹ thuật</h3>
      <p className="text-n-600 mb-6">
        Mô tả vấn đề bạn đang gặp — đội kỹ sư Stromann sẽ phản hồi trong 4h làm việc.
      </p>

      <BasicInfoFields />

      <div className="form-row">
        <label>Loại vấn đề kỹ thuật <span className="req">*</span></label>
        <select className="input" name="technical_issue_id" defaultValue="" required>
          <option value="" disabled>-- Chọn vấn đề --</option>
          {issues.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Mô tả chi tiết <span className="req">*</span></label>
        <textarea
          className="input"
          name="message"
          rows={5}
          placeholder="Vui lòng mô tả nhu cầu, hệ sản xuất, vấn đề đang gặp..."
          required
        />
      </div>

      {state?.error && (
        <div className="mb-4 p-3 rounded-r-8 bg-danger/10 text-danger text-sm">{state.error}</div>
      )}

      <SubmitBtn />
    </form>
  );
}
