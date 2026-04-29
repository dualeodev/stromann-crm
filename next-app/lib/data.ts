import type {
  Benefit,
  CompanyValue,
  Industry,
  Job,
  NavProductGroup,
  NewsItem,
  Product,
  Stat,
  TimelineItem,
  WhyRow,
} from "./types";

export const NAV_PRODUCTS: NavProductGroup[] = [
  { group: "Defoamer", count: 22 },
  { group: "Dispersant", count: 18 },
  { group: "Wetting Agent", count: 12 },
  { group: "Rheology Modifier", count: 9 },
  { group: "Wax Additives", count: 7 },
  { group: "Emulsifier", count: 5 },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "coatings", code: "S-2845", title: "Sơn (Coatings)",
    swatch: "#C8332D",
    paint: "Industrial Red",
    finish: "MATT / GLOSS",
    desc: "Cải thiện độ phân tán, độ trải và độ bền màng sơn. Defoamer, dispersant, wetting & leveling agent.",
    chips: ["Defoamer", "Dispersant", "Wetting"],
    products: 28,
  },
  {
    id: "ink", code: "M-1170", title: "Mực in (Printing Inks)",
    swatch: "#1B3A8E",
    paint: "Process Cyan",
    finish: "FLEXO / GRAVURE",
    desc: "Tăng độ bóng, độ mịn và chất lượng in. Phụ gia chuyên cho mực gốc nước & gốc dầu.",
    chips: ["Wetting", "Defoamer", "Rheology"],
    products: 18,
  },
  {
    id: "plastic", code: "N-0734", title: "Nhựa & Masterbatch",
    swatch: "#E8B22F",
    paint: "Yellow Pigment",
    finish: "EXTRUSION / INJECTION",
    desc: "Tối ưu gia công và độ ổn định màu. Wax additives, dispersant cho pigment.",
    chips: ["Wax", "Dispersant"],
    products: 14,
  },
];

export const WHY_ROWS: WhyRow[] = [
  { num: "01", title: "Nguồn cung ổn định", desc: "Tồn kho lớn tại VN, giao hàng nhanh trong 24–48h." },
  { num: "02", title: "Có hỗ trợ kỹ thuật", desc: "Đội kỹ sư riêng phục vụ R&D + xử lý sự cố công thức." },
  { num: "03", title: "COA / MSDS đầy đủ", desc: "Mỗi lô hàng có chứng từ kỹ thuật chuẩn quốc tế." },
  { num: "04", title: "Phản hồi nhanh", desc: "Cam kết phản hồi báo giá / yêu cầu mẫu trong vòng 4h làm việc." },
];

export const PRODUCTS: Product[] = [
  { id: "agitan-120", group: "DEFOAMER", name: "AGITAN® 120", desc: "Defoamer hiệu quả cao cho sơn nước, mực in gốc nước.", brand: "MÜNZING", featured: true },
  { id: "edaplan-470", group: "DISPERSANT", name: "EDAPLAN® 470", desc: "Dispersant hiệu quả cao cho sơn nước, mực in.", brand: "MÜNZING", featured: true },
  { id: "metolat-358", group: "WETTING AGENT", name: "METOLAT® 358", desc: "Wetting agent đa năng cho sơn nước.", brand: "MÜNZING", featured: true },
  { id: "hydropalat-3475", group: "RHEOLOGY", name: "HYDROPALAT® WE 3475", desc: "Rheology modifier cho sơn nước, mực in.", brand: "MÜNZING", featured: true },
  { id: "agitan-282", group: "DEFOAMER", name: "AGITAN® 282", desc: "Defoamer mạnh cho sơn epoxy 2K hệ dung môi.", brand: "MÜNZING" },
  { id: "agitan-df-6863", group: "DEFOAMER", name: "AGITAN® DF 6863", desc: "Defoamer silicon-free cho sơn xây dựng.", brand: "MÜNZING" },
  { id: "agitan-305", group: "DEFOAMER", name: "AGITAN® 305", desc: "Defoamer cho mực in flexo gốc nước.", brand: "MÜNZING" },
  { id: "agitan-731", group: "DEFOAMER", name: "AGITAN® 731", desc: "Defoamer cho sơn industrial 1K.", brand: "MÜNZING" },
  { id: "edaplan-480", group: "DISPERSANT", name: "EDAPLAN® 480", desc: "Dispersant cho mực in flexo gốc nước.", brand: "MÜNZING" },
  { id: "metolat-388", group: "LEVELING", name: "METOLAT® 388", desc: "Leveling agent cho sơn UV, sơn 2K PU.", brand: "MÜNZING" },
  { id: "metolat-we-4150", group: "WAX", name: "METOLAT® WE 4150", desc: "Wax additive cho sơn lót, sơn dầu.", brand: "MÜNZING" },
  { id: "tafigel-pur-80", group: "RHEOLOGY", name: "TAFIGEL® PUR 80", desc: "PU rheology modifier cho sơn nước cao cấp.", brand: "MÜNZING" },
];

export const NEWS: NewsItem[] = [
  { id: "n1", tag: "KIẾN THỨC KỸ THUẬT", title: "5 lưu ý chọn defoamer cho sơn nước hệ acrylic", date: "25 Apr 2026", read: "5 phút đọc" },
  { id: "n2", tag: "ỨNG DỤNG THỰC TẾ", title: "Case study: tối ưu công thức mực in flexo bằng dispersant mới", date: "18 Apr 2026", read: "7 phút đọc" },
  { id: "n3", tag: "SẢN PHẨM", title: "MÜNZING ra mắt dòng AGITAN® thế hệ mới — đã có hàng tại Việt Nam", date: "10 Apr 2026", read: "4 phút đọc" },
  { id: "n4", tag: "SỰ KIỆN", title: "Stromann tham gia VietnamCoatings Expo 2026 tại SECC", date: "02 Apr 2026", read: "3 phút đọc" },
  { id: "n5", tag: "KIẾN THỨC KỸ THUẬT", title: "Wetting agent: cách chọn đúng cho từng loại pigment", date: "28 Mar 2026", read: "6 phút đọc" },
  { id: "n6", tag: "CÔNG TY", title: "Mở rộng kho miền Bắc — giao hàng 24h cho khách Hà Nội & lân cận", date: "15 Mar 2026", read: "2 phút đọc" },
];

export const TIMELINE: TimelineItem[] = [
  { year: "2014", title: "Thành lập Stromann Việt Nam tại TP.HCM" },
  { year: "2016", title: "Trở thành đối tác phân phối chính thức của MÜNZING (Đức)" },
  { year: "2019", title: "Khai trương phòng lab kỹ thuật riêng — hỗ trợ R&D cho khách" },
  { year: "2022", title: "Mở rộng kho miền Bắc, phục vụ thị trường Hà Nội & lân cận" },
  { year: "2025", title: "Đạt mốc 200+ khách hàng B2B trên toàn quốc" },
];

export const STATS: Stat[] = [
  { num: "10+", lbl: "Năm kinh nghiệm tại Việt Nam" },
  { num: "200+", lbl: "Khách hàng B2B" },
  { num: "70+", lbl: "Mã sản phẩm phụ gia" },
  { num: "24h", lbl: "Phản hồi báo giá / mẫu" },
];

export const JOBS: Job[] = [
  {
    id: "tech-sales",
    title: "Kỹ sư Bán hàng Kỹ thuật (Technical Sales)",
    dept: "Kinh doanh",
    location: "TP.HCM",
    type: "Full-time",
    salary: "20 – 35 triệu + hoa hồng",
    deadline: "30/05/2026",
    tags: ["Sơn", "Mực in", "B2B"],
    summary: "Phụ trách phát triển khách hàng B2B trong ngành sơn và mực in tại khu vực phía Nam. Tư vấn giải pháp phụ gia, phối hợp cùng phòng kỹ thuật để xử lý vấn đề công thức của khách.",
    hot: true,
  },
  {
    id: "lab-engineer",
    title: "Kỹ sư Phòng Lab (R&D / Application)",
    dept: "Kỹ thuật",
    location: "TP.HCM",
    type: "Full-time",
    salary: "18 – 28 triệu",
    deadline: "15/06/2026",
    tags: ["R&D", "Lab", "Hoá học"],
    summary: "Thực hiện các thử nghiệm phụ gia trong hệ sơn nước, sơn dầu và mực in. Hỗ trợ khách hàng tối ưu công thức và xử lý sự cố sản xuất tại lab.",
    hot: true,
  },
  {
    id: "sales-hn",
    title: "Nhân viên Kinh doanh — Khu vực Hà Nội",
    dept: "Kinh doanh",
    location: "Hà Nội",
    type: "Full-time",
    salary: "15 – 25 triệu + hoa hồng",
    deadline: "10/06/2026",
    tags: ["B2B", "Miền Bắc"],
    summary: "Phát triển và chăm sóc khách hàng tại khu vực Hà Nội & các tỉnh miền Bắc. Phối hợp với kho miền Bắc để đảm bảo giao hàng đúng tiến độ.",
  },
  {
    id: "logistics",
    title: "Chuyên viên Logistics & XNK",
    dept: "Vận hành",
    location: "TP.HCM",
    type: "Full-time",
    salary: "Thoả thuận",
    deadline: "20/05/2026",
    tags: ["Logistics", "XNK"],
    summary: "Quản lý quy trình nhập khẩu hoá chất, làm việc với cảng, hải quan và đối tác MÜNZING. Đảm bảo chứng từ COA/MSDS đầy đủ cho mỗi lô hàng.",
  },
  {
    id: "marketing",
    title: "Chuyên viên Marketing B2B",
    dept: "Marketing",
    location: "TP.HCM",
    type: "Full-time",
    salary: "15 – 22 triệu",
    deadline: "30/05/2026",
    tags: ["Content", "B2B"],
    summary: "Lên kế hoạch và triển khai content kỹ thuật, sự kiện ngành (VietnamCoatings Expo), case study và quản lý kênh LinkedIn / website.",
  },
  {
    id: "warehouse",
    title: "Nhân viên Kho — Phía Bắc",
    dept: "Vận hành",
    location: "Hà Nội",
    type: "Full-time",
    salary: "10 – 14 triệu",
    deadline: "20/05/2026",
    tags: ["Kho", "Vận hành"],
    summary: "Quản lý xuất/nhập tồn kho hoá chất tại kho Hà Nội. Đảm bảo điều kiện bảo quản an toàn theo MSDS.",
  },
];

export const BENEFITS: Benefit[] = [
  { icon: "💰", title: "Lương + thưởng cạnh tranh", desc: "Lương cứng tốt, thưởng theo doanh số, thưởng cuối năm 1–3 tháng." },
  { icon: "🏥", title: "Bảo hiểm sức khoẻ cao cấp", desc: "Bảo hiểm Bảo Việt / PVI cho nhân viên + người thân." },
  { icon: "🎓", title: "Đào tạo & du lịch quốc tế", desc: "Hỗ trợ học chuyên môn; cơ hội training tại MÜNZING (Đức)." },
  { icon: "📅", title: "Nghỉ phép & WFH linh hoạt", desc: "15 ngày phép/năm + WFH 2 ngày/tuần với vị trí phù hợp." },
  { icon: "🚀", title: "Thăng tiến rõ ràng", desc: "Lộ trình từ Junior → Senior → Manager trong 2–4 năm." },
  { icon: "🤝", title: "Văn hoá kỹ thuật", desc: "Đội ngũ có chuyên môn sâu, sẵn sàng chia sẻ và học hỏi." },
];

export const VALUES: CompanyValue[] = [
  { num: "01", title: "Chuyên môn", desc: "Chúng tôi tin một câu trả lời đúng kỹ thuật quan trọng hơn một lời chào hàng hay." },
  { num: "02", title: "Tin cậy", desc: "Đúng hàng, đúng thời gian, đúng chứng từ — không có ngoại lệ." },
  { num: "03", title: "Đồng hành", desc: "Khách hàng thành công thì chúng tôi mới thành công. Cam kết dài hạn, không bán xong là xong." },
];
