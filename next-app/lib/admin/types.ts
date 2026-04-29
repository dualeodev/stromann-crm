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
  icon: string;
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
  icon: string;
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

export type BannerStatus = "active" | "scheduled" | "expired";

export interface Banner {
  id: number;
  title: string;
  from: string;
  to: string;
  status: BannerStatus;
  lang: LangFlags;
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
