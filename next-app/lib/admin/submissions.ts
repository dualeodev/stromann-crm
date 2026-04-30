import { createClient } from "@/lib/supabase/server";
import type {
  Submission,
  SubmissionStatus,
  SubmissionType,
  QuoteProduct,
} from "./types";

export const TYPE_LABELS: Record<SubmissionType, string> = {
  quote:     "Báo giá",
  technical: "Tư vấn KT",
  contact:   "Liên hệ",
};

export interface SubmissionListFilter {
  status?: SubmissionStatus;
  type?: SubmissionType;
}

export interface SubmissionStats {
  newCount: number;
  inProgressCount: number;
  doneRecentCount: number;
}

const SELECT_WITH_ISSUE =
  "*, technical_issue:technical_issues!submissions_technical_issue_id_fkey(id,name,slug)";

interface JoinedRow {
  id: string;
  type: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  address: string | null;
  message: string | null;
  technical_issue_id: string | null;
  technical_issue: { id: string; name: string; slug: string } | null;
  products: QuoteProduct[] | null;
  general_note: string | null;
  status: string;
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
}

function rowToSubmission(row: JoinedRow): Submission {
  return {
    id:                   row.id,
    type:                 row.type as SubmissionType,
    full_name:            row.full_name,
    company:              row.company,
    email:                row.email,
    phone:                row.phone,
    address:              row.address ?? null,
    message:              row.message ?? null,
    technical_issue_id:   row.technical_issue_id ?? null,
    technical_issue_name: row.technical_issue?.name ?? null,
    technical_issue_slug: row.technical_issue?.slug ?? null,
    products:             row.products ?? null,
    general_note:         row.general_note ?? null,
    status:               row.status as SubmissionStatus,
    assignee_id:          row.assignee_id ?? null,
    created_at:           row.created_at,
    updated_at:           row.updated_at,
  };
}

export async function listSubmissions(filter: SubmissionListFilter = {}): Promise<Submission[]> {
  const supabase = await createClient();
  let q = supabase
    .from("submissions")
    .select(SELECT_WITH_ISSUE)
    .order("created_at", { ascending: false });

  if (filter.status) q = q.eq("status", filter.status);
  if (filter.type)   q = q.eq("type", filter.type);

  const { data, error } = await q;
  if (error) {
    console.error("listSubmissions:", error);
    return [];
  }
  return ((data ?? []) as unknown as JoinedRow[]).map(rowToSubmission);
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select(SELECT_WITH_ISSUE)
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return rowToSubmission(data as unknown as JoinedRow);
}

export async function getSubmissionStats(): Promise<SubmissionStats> {
  const supabase = await createClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [newRes, inProgRes, doneRes] = await Promise.all([
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "in-progress"),
    supabase.from("submissions").select("id", { count: "exact", head: true })
      .eq("status", "done").gte("updated_at", sevenDaysAgo),
  ]);

  return {
    newCount:        newRes.count ?? 0,
    inProgressCount: inProgRes.count ?? 0,
    doneRecentCount: doneRes.count ?? 0,
  };
}

export function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
