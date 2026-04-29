import type { LucideIcon } from "lucide-react";

export type AdminRole = "super_admin" | "editor" | "viewer";

export type AdminUser = {
  username: string;
  full_name: string;
  role: AdminRole;
};

export type AdminPageId =
  | "dashboard"
  | "notifications"
  | "submissions"
  | "banners"
  | "categories"
  | "products"
  | "industries"
  | "tech"
  | "news"
  | "recruitment"
  | "users"
  | "languages"
  | "seo"
  | "logs"
  | "settings";

export interface NavGroup {
  group: string;
}

export interface NavItem {
  id: AdminPageId;
  label: string;
  icon: LucideIcon;
  count?: number;
  hot?: boolean;
}

export type NavEntry = NavGroup | NavItem;

export interface NotifTarget {
  page: AdminPageId;
  id: string | number;
}

export type NotifType = "quote" | "tech" | "cv" | "contact";

export interface AdminNotification {
  id: number;
  type: NotifType;
  icon: LucideIcon;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
  target?: NotifTarget;
}

export type SubmissionStatus = "new" | "in-progress" | "done";

export interface Submission {
  id: string;
  type: string;
  company: string;
  contact: string;
  email: string;
  date: string;
  status: SubmissionStatus;
  assignee: string | null;
}

export interface LangFlags {
  vn: boolean;
  en: boolean;
  cn: boolean;
}

export type ProductAdminStatus = "published" | "draft" | "scheduled";

export interface AdminProduct {
  id: string;
  name: string;
  group: string;
  brand: string;
  industries: string[];
  status: ProductAdminStatus;
  lang: LangFlags;
  updated: string;
}

export type BannerStatus = "active" | "scheduled" | "expired" | "disabled";
export type BannerPosition = "hero_home" | "product_hero" | "home_mid";

export interface BannerRow {
  id: string;
  title: string;
  description: string | null;
  cta_label: string | null;
  cta_href: string | null;
  image_path: string | null;
  position: BannerPosition;
  sort_order: number;
  starts_at: string | null;
  ends_at: string | null;
  is_enabled: boolean;
  lang_vn: boolean;
  lang_en: boolean;
  lang_cn: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActivityEntry {
  who: string;
  what: string;
  target: string;
  time: string;
}

export type AdminStatus =
  | "new"
  | "in-progress"
  | "disabled"
  | "done"
  | "active"
  | "scheduled"
  | "expired"
  | "published"
  | "draft";

export interface StatusLabel {
  lbl: string;
  cls: string;
}
