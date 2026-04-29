export const NAV_PRODUCTS = [
  { group: "Defoamer", count: 22 },
  { group: "Dispersant", count: 18 },
  { group: "Wetting Agent", count: 12 },
  { group: "Rheology Modifier", count: 9 },
  { group: "Wax Additives", count: 7 },
  { group: "Emulsifier", count: 5 },
];

export const INDUSTRIES = [
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

export const WHY_ROWS = [
  { num: "01", title: "Nguồn cung ổn định", desc: "Tồn kho lớn tại VN, giao hàng nhanh trong 24–48h." },
  { num: "02", title: "Có hỗ trợ kỹ thuật", desc: "Đội kỹ sư riêng phục vụ R&D + xử lý sự cố công thức." },
  { num: "03", title: "COA / MSDS đầy đủ", desc: "Mỗi lô hàng có chứng từ kỹ thuật chuẩn quốc tế." },
  { num: "04", title: "Phản hồi nhanh", desc: "Cam kết phản hồi báo giá / yêu cầu mẫu trong vòng 4h làm việc." },
];

export const PRODUCTS = [
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

export const NEWS = [
  { id: "n1", tag: "KIẾN THỨC KỸ THUẬT", title: "5 lưu ý chọn defoamer cho sơn nước hệ acrylic", date: "25 Apr 2026", read: "5 phút đọc" },
  { id: "n2", tag: "ỨNG DỤNG THỰC TẾ", title: "Case study: tối ưu công thức mực in flexo bằng dispersant mới", date: "18 Apr 2026", read: "7 phút đọc" },
  { id: "n3", tag: "SẢN PHẨM", title: "MÜNZING ra mắt dòng AGITAN® thế hệ mới — đã có hàng tại Việt Nam", date: "10 Apr 2026", read: "4 phút đọc" },
  { id: "n4", tag: "SỰ KIỆN", title: "Stromann tham gia VietnamCoatings Expo 2026 tại SECC", date: "02 Apr 2026", read: "3 phút đọc" },
  { id: "n5", tag: "KIẾN THỨC KỸ THUẬT", title: "Wetting agent: cách chọn đúng cho từng loại pigment", date: "28 Mar 2026", read: "6 phút đọc" },
  { id: "n6", tag: "CÔNG TY", title: "Mở rộng kho miền Bắc — giao hàng 24h cho khách Hà Nội & lân cận", date: "15 Mar 2026", read: "2 phút đọc" },
];

export const TIMELINE = [
  { year: "2014", title: "Thành lập Stromann Việt Nam tại TP.HCM" },
  { year: "2016", title: "Trở thành đối tác phân phối chính thức của MÜNZING (Đức)" },
  { year: "2019", title: "Khai trương phòng lab kỹ thuật riêng — hỗ trợ R&D cho khách" },
  { year: "2022", title: "Mở rộng kho miền Bắc, phục vụ thị trường Hà Nội & lân cận" },
  { year: "2025", title: "Đạt mốc 200+ khách hàng B2B trên toàn quốc" },
];

export const STATS = [
  { num: "10+", lbl: "Năm kinh nghiệm tại Việt Nam" },
  { num: "200+", lbl: "Khách hàng B2B" },
  { num: "70+", lbl: "Mã sản phẩm phụ gia" },
  { num: "24h", lbl: "Phản hồi báo giá / mẫu" },
];
