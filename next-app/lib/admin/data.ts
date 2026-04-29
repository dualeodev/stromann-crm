import {
  Bell,
  Briefcase,
  DollarSign,
  Factory,
  FileText,
  Globe,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Mail,
  Newspaper,
  Package,
  ScrollText,
  Search,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import type {
  ActivityEntry,
  AdminNotification,
  AdminProduct,
  AdminStatus,
  NavEntry,
  StatusLabel,
  Submission,
} from "./types";

export const NAV: NavEntry[] = [
  { group: "Tổng quan" },
  { id: "dashboard",     label: "Dashboard",       icon: LayoutDashboard },
  { id: "notifications", label: "Thông báo",        icon: Bell,       count: 12, hot: true },
  { id: "submissions",   label: "Form gửi đến",     icon: Inbox,      count: 28, hot: true },

  { group: "Nội dung" },
  { id: "banners",       label: "Banner trang chủ", icon: ImageIcon },
  { id: "products",      label: "Sản phẩm",         icon: Package,    count: 72 },
  { id: "industries",    label: "Ngành ứng dụng",   icon: Factory,    count: 3 },
  { id: "tech",          label: "Vấn đề kỹ thuật",  icon: Wrench,     count: 4 },
  { id: "news",          label: "Tin tức",          icon: Newspaper,  count: 24 },
  { id: "recruitment",   label: "Tuyển dụng",       icon: Briefcase,  count: 6 },

  { group: "Hệ thống" },
  { id: "users",         label: "Người dùng & quyền", icon: Users },
  { id: "languages",     label: "Đa ngôn ngữ",       icon: Globe },
  { id: "seo",           label: "SEO",                icon: Search },
  { id: "logs",          label: "Log hoạt động",     icon: ScrollText },
  { id: "settings",      label: "Cấu hình",          icon: Settings },
];

export const NOTIFICATIONS: AdminNotification[] = [
  { id: 1, type: "quote",   icon: DollarSign, title: "Yêu cầu báo giá mới — Cty Sơn Nippon VN", sub: "AGITAN® 120 (200kg) + EDAPLAN® 470 (50kg)", time: "2 phút trước",  unread: true,  target: { page: "submissions", id: "SUB-2026-0429-001" } },
  { id: 2, type: "tech",    icon: Wrench,     title: "Tư vấn kỹ thuật — Anh Tuấn (Đại Bàng Paint)",    sub: "Vấn đề bọt khí trên mực in flexo gốc nước",       time: "12 phút trước", unread: true,  target: { page: "submissions", id: "SUB-2026-0429-002" } },
  { id: 3, type: "cv",      icon: FileText,   title: "CV ứng tuyển — Lab Engineer",                     sub: "Nguyễn Thanh Hà — 3 năm KN MÜNZING",              time: "28 phút trước", unread: true,  target: { page: "recruitment", id: 1 } },
  { id: 4, type: "contact", icon: Mail,       title: "Liên hệ chung — JR Industrial",                   sub: "Yêu cầu mẫu thử HYDROPALAT® WE 3475",             time: "1 giờ trước",   unread: true,  target: { page: "submissions", id: "SUB-2026-0429-004" } },
  { id: 5, type: "quote",   icon: DollarSign, title: "Yêu cầu báo giá — Vinaplast",                     sub: "5 mã wax additive cho masterbatch PE",            time: "2 giờ trước",   unread: false, target: { page: "submissions", id: "SUB-2026-0429-005" } },
  { id: 6, type: "tech",    icon: Wrench,     title: "Tư vấn kỹ thuật — Cty Sơn 4 Oranges",             sub: "Tối ưu công thức sơn xây dựng",                    time: "3 giờ trước",   unread: false, target: { page: "submissions", id: "SUB-2026-0428-021" } },
  { id: 7, type: "cv",      icon: FileText,   title: "CV ứng tuyển — Tech Sales miền Bắc",              sub: "Trần Minh Quân",                                   time: "5 giờ trước",   unread: false, target: { page: "recruitment", id: 3 } },
  { id: 8, type: "quote",   icon: DollarSign, title: "Báo giá đã được Sales tiếp nhận",                 sub: "ĐH#2026-0428-12 chuyển sang trạng thái 'Đang xử lý'", time: "Hôm qua", unread: false, target: { page: "submissions", id: "SUB-2026-0428-019" } },
];

export const SUBMISSIONS: Submission[] = [
  { id: "SUB-2026-0429-001", type: "Báo giá",   company: "Sơn Nippon VN", contact: "Phạm Thị Lan",     email: "lan.pt@nippon.vn",       date: "29/04/2026 14:32", status: "new",          assignee: null },
  { id: "SUB-2026-0429-002", type: "Tư vấn KT", company: "Đại Bàng Paint", contact: "Lê Văn Tuấn",      email: "tuan.lv@daibang.com",     date: "29/04/2026 14:18", status: "new",          assignee: null },
  { id: "SUB-2026-0429-003", type: "Ứng tuyển", company: "—",              contact: "Nguyễn Thanh Hà",  email: "hanguyen@gmail.com",      date: "29/04/2026 14:02", status: "new",          assignee: "HR" },
  { id: "SUB-2026-0429-004", type: "Liên hệ",   company: "JR Industrial",  contact: "Mark Chen",        email: "mark@jr-industrial.cn",   date: "29/04/2026 13:30", status: "in-progress",  assignee: "Sales 1" },
  { id: "SUB-2026-0429-005", type: "Báo giá",   company: "Vinaplast",      contact: "Trần Quốc Bảo",    email: "bao.tq@vinaplast.vn",     date: "29/04/2026 12:45", status: "in-progress",  assignee: "Sales 2" },
  { id: "SUB-2026-0428-021", type: "Tư vấn KT", company: "4 Oranges",      contact: "Nguyễn Văn Hùng",  email: "hung.nv@4oranges.vn",     date: "28/04/2026 17:15", status: "in-progress",  assignee: "Tech 1" },
  { id: "SUB-2026-0428-019", type: "Báo giá",   company: "Akzo Nobel VN",  contact: "Sarah Lim",        email: "sarah.lim@akzo.com",      date: "28/04/2026 11:00", status: "done",         assignee: "Sales 1" },
  { id: "SUB-2026-0428-015", type: "Liên hệ",   company: "Mực in Việt Đức", contact: "Lý Hoàng An",      email: "an.lh@vietduc.vn",        date: "28/04/2026 09:22", status: "done",         assignee: "Sales 2" },
];

export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id: "agitan-120",      name: "AGITAN® 120",         group: "Defoamer",         brand: "MÜNZING", industries: ["Sơn nước", "Mực in nước"], status: "published", lang: { vn: true,  en: true,  cn: false }, updated: "29/04/2026" },
  { id: "edaplan-470",     name: "EDAPLAN® 470",        group: "Dispersant",       brand: "MÜNZING", industries: ["Sơn nước", "Mực in"],      status: "published", lang: { vn: true,  en: true,  cn: true  }, updated: "28/04/2026" },
  { id: "metolat-358",     name: "METOLAT® 358",        group: "Wetting Agent",    brand: "MÜNZING", industries: ["Sơn nước"],                status: "published", lang: { vn: true,  en: true,  cn: false }, updated: "27/04/2026" },
  { id: "hydropalat-3475", name: "HYDROPALAT® WE 3475", group: "Rheology Modifier", brand: "MÜNZING", industries: ["Sơn nước", "Mực in"],     status: "published", lang: { vn: true,  en: false, cn: false }, updated: "26/04/2026" },
  { id: "agitan-282",      name: "AGITAN® 282",         group: "Defoamer",         brand: "MÜNZING", industries: ["Sơn dầu"],                status: "draft",     lang: { vn: true,  en: false, cn: false }, updated: "25/04/2026" },
  { id: "tafigel-pur-80",  name: "TAFIGEL® PUR 80",     group: "Rheology Modifier", brand: "MÜNZING", industries: ["Sơn nước"],              status: "published", lang: { vn: true,  en: true,  cn: false }, updated: "24/04/2026" },
  { id: "metolat-we-4150", name: "METOLAT® WE 4150",    group: "Wax Additive",     brand: "MÜNZING", industries: ["Nhựa"],                   status: "scheduled", lang: { vn: true,  en: false, cn: false }, updated: "23/04/2026" },
];

export const ACTIVITY: ActivityEntry[] = [
  { who: "Bạn",          what: "đã cập nhật sản phẩm",         target: "AGITAN® 120",                         time: "10 phút trước" },
  { who: "Sales 1",      what: "đã xử lý yêu cầu báo giá",     target: "ĐH#2026-0428-12",                     time: "1 giờ trước"   },
  { who: "Tech 1",       what: "đã trả lời tư vấn kỹ thuật",   target: "4 Oranges",                            time: "2 giờ trước"   },
  { who: "Content",      what: "đã đăng bài viết mới",         target: "5 lưu ý chọn defoamer cho sơn nước",   time: "3 giờ trước"   },
  { who: "HR",           what: "đã thêm vị trí tuyển dụng",    target: "Lab Engineer",                         time: "Hôm qua"       },
  { who: "Super Admin",  what: "đã cập nhật banner",           target: "AGITAN® thế hệ mới",                  time: "Hôm qua"       },
];

export const STATUS_LABELS: Record<AdminStatus, StatusLabel> = {
  new:           { lbl: "Mới",         cls: "pill--brand"   },
  "in-progress": { lbl: "Đang xử lý",  cls: "pill--info"    },
  done:          { lbl: "Đã xử lý",    cls: "pill--success" },
  active:        { lbl: "Đang chạy",   cls: "pill--success" },
  scheduled:     { lbl: "Đã lên lịch", cls: "pill--info"    },
  expired:       { lbl: "Hết hạn",     cls: "pill--neutral" },
  disabled:      { lbl: "Tắt",         cls: "pill--neutral" },
  published:     { lbl: "Đã xuất bản", cls: "pill--success" },
  draft:         { lbl: "Nháp",        cls: "pill--neutral" },
};
