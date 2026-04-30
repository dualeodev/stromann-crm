"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionStatus } from "./types";

export interface UpdateResult {
  ok: boolean;
  error?: string;
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): Promise<UpdateResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/submissions");
  revalidatePath(`/admin/submissions/${id}`);
  return { ok: true };
}

export async function deleteSubmission(id: string): Promise<UpdateResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("submissions").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/submissions");
  return { ok: true };
}
