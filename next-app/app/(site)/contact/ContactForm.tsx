"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Btn } from "@/components/ui";
import BasicInfoFields from "@/components/forms/BasicInfoFields";
import { submitContactForm, type SubmitResult } from "@/lib/submissions";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Btn variant="primary" size="lg" className="w-full" as="button" type="submit" disabled={pending}>
      {pending ? "Đang gửi..." : "Gửi yêu cầu →"}
    </Btn>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState<SubmitResult | null, FormData>(submitContactForm, null);

  if (state?.ok) {
    return (
      <div className="bg-white border border-n-200 rounded-r-16 p-8">
        <h3 className="mt-0 text-[22px] text-success">✓ Đã gửi liên hệ</h3>
        <p className="text-n-600">Cảm ơn bạn — Stromann sẽ phản hồi trong vòng 4h làm việc.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white border border-n-200 rounded-r-16 p-8">
      <h3 className="mt-0 text-[22px]">Gửi yêu cầu</h3>
      <p className="text-n-600 mb-6">
        Điền thông tin bên dưới — đội Stromann sẽ phản hồi trong 4h làm việc.
      </p>

      <BasicInfoFields />

      <div className="form-row">
        <label>Lời nhắn <span className="req">*</span></label>
        <textarea
          className="input"
          name="message"
          rows={5}
          placeholder="Vui lòng mô tả nhu cầu của bạn..."
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
