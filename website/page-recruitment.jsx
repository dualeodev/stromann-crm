// page-recruitment.jsx
const { Tag, Btn, IndustryImage } = window.SUI;
const { Breadcrumb } = window.SLAYOUT;

const JOBS = [
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

const BENEFITS = [
  { icon: "💰", title: "Lương + thưởng cạnh tranh", desc: "Lương cứng tốt, thưởng theo doanh số, thưởng cuối năm 1–3 tháng." },
  { icon: "🏥", title: "Bảo hiểm sức khoẻ cao cấp", desc: "Bảo hiểm Bảo Việt / PVI cho nhân viên + người thân." },
  { icon: "🎓", title: "Đào tạo & du lịch quốc tế", desc: "Hỗ trợ học chuyên môn; cơ hội training tại MÜNZING (Đức)." },
  { icon: "📅", title: "Nghỉ phép & WFH linh hoạt", desc: "15 ngày phép/năm + WFH 2 ngày/tuần với vị trí phù hợp." },
  { icon: "🚀", title: "Thăng tiến rõ ràng", desc: "Lộ trình từ Junior → Senior → Manager trong 2–4 năm." },
  { icon: "🤝", title: "Văn hoá kỹ thuật", desc: "Đội ngũ có chuyên môn sâu, sẵn sàng chia sẻ và học hỏi." },
];

const VALUES = [
  { num: "01", title: "Chuyên môn", desc: "Chúng tôi tin một câu trả lời đúng kỹ thuật quan trọng hơn một lời chào hàng hay." },
  { num: "02", title: "Tin cậy", desc: "Đúng hàng, đúng thời gian, đúng chứng từ — không có ngoại lệ." },
  { num: "03", title: "Đồng hành", desc: "Khách hàng thành công thì chúng tôi mới thành công. Cam kết dài hạn, không bán xong là xong." },
];

function PageRecruitment() {
  const [dept, setDept] = React.useState("Tất cả");
  const [loc, setLoc] = React.useState("Tất cả");

  const filtered = JOBS.filter(j =>
    (dept === "Tất cả" || j.dept === dept) &&
    (loc === "Tất cả" || j.location === loc)
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Tuyển dụng" }]} />

      {/* Hero */}
      <div className="ind-hero">
        <div>
          <Tag>TUYỂN DỤNG</Tag>
          <h1 style={{ marginTop: 16 }}>Cùng Stromann xây dựng<br/>nền công nghiệp Việt Nam</h1>
          <p style={{ color: "var(--n-300)", fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 540 }}>
            Chúng tôi đang tìm những đồng đội đam mê hoá học và sản xuất công nghiệp. Tại Stromann, bạn sẽ làm việc cùng đội ngũ kỹ thuật giàu kinh nghiệm, học hỏi từ MÜNZING (Đức) và đóng góp trực tiếp vào sự phát triển của ngành sơn, mực in, nhựa Việt Nam.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Btn variant="primary" size="lg" as="a" href="#jobs">Xem vị trí đang mở →</Btn>
            <Btn variant="secondary" size="lg" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} as="a" href="mailto:hr@stromann.vn">Gửi CV chủ động</Btn>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{JOBS.length}</div>
              <div style={{ fontSize: 12, color: "var(--n-400)" }}>Vị trí đang tuyển</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>40+</div>
              <div style={{ fontSize: 12, color: "var(--n-400)" }}>Nhân viên hiện tại</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>4.6/5</div>
              <div style={{ fontSize: 12, color: "var(--n-400)" }}>Mức độ hài lòng nội bộ</div>
            </div>
          </div>
        </div>
        <div className="ind-hero__media"><IndustryImage label="team photo · Stromann office" dark /></div>
      </div>

      {/* Values */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }}>
          <div>
            <Tag variant="brand-soft">GIÁ TRỊ CỐT LÕI</Tag>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              Chúng tôi tin vào điều gì
            </h2>
            <p style={{ color: "var(--n-600)", lineHeight: 1.6 }}>
              Ba giá trị này không phải khẩu hiệu — chúng là cách chúng tôi tuyển người, đánh giá công việc và ra quyết định mỗi ngày.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VALUES.map(v => (
              <div key={v.num} className="why-row">
                <div className="why-row__num">{v.num}</div>
                <div>
                  <div className="why-row__title">{v.title}</div>
                  <div className="why-row__desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--alt">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag variant="brand-soft">QUYỀN LỢI</Tag>
          <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0 0", letterSpacing: "-0.01em" }}>Tại sao bạn sẽ thích Stromann</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{ background: "#fff", border: "1px solid var(--n-200)", borderRadius: 12, padding: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: "var(--accent-bg)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14
              }}>{b.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--n-900)" }}>{b.title}</div>
              <div style={{ fontSize: 13, color: "var(--n-600)", marginTop: 6, lineHeight: 1.55 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Job listings */}
      <section className="section" id="jobs">
        <div className="sect-head sect-head--row" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Tag variant="brand-soft">VỊ TRÍ ĐANG TUYỂN</Tag>
            <h2 className="sect-head__title" style={{ margin: 0 }}>{filtered.length} cơ hội đang chờ bạn</h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <select className="input" style={{ height: 40, width: "auto", padding: "0 12px" }}
              value={dept} onChange={e => setDept(e.target.value)}>
              <option>Tất cả</option><option>Kinh doanh</option><option>Kỹ thuật</option>
              <option>Vận hành</option><option>Marketing</option>
            </select>
            <select className="input" style={{ height: 40, width: "auto", padding: "0 12px" }}
              value={loc} onChange={e => setLoc(e.target.value)}>
              <option>Tất cả</option><option>TP.HCM</option><option>Hà Nội</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(j => (
            <a key={j.id} href={`#/recruitment/${j.id}`} className="card" style={{
              padding: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  {j.hot && <Tag variant="brand">🔥 HOT</Tag>}
                  <Tag variant="neutral">{j.dept}</Tag>
                  {j.tags.map(t => <Tag key={t} variant="brand-soft">{t}</Tag>)}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--n-900)", margin: "4px 0 6px" }}>{j.title}</h3>
                <p style={{ color: "var(--n-600)", fontSize: 13, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>{j.summary}</p>
                <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: "var(--n-500)", flexWrap: "wrap" }}>
                  <span>📍 {j.location}</span>
                  <span>⏰ {j.type}</span>
                  <span>💰 {j.salary}</span>
                  <span>📅 Hạn: {j.deadline}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <Btn variant="primary">Ứng tuyển ngay</Btn>
                <span style={{ color: "var(--n-500)", fontSize: 12 }}>Xem chi tiết →</span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--n-500)" }}>
            Không có vị trí phù hợp — gửi CV chủ động đến <a href="mailto:hr@stromann.vn" style={{ color: "var(--accent)", fontWeight: 700 }}>hr@stromann.vn</a>
          </div>
        )}
      </section>

      {/* Process */}
      <section className="section section--alt">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag variant="brand-soft">QUY TRÌNH</Tag>
          <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0 0", letterSpacing: "-0.01em" }}>4 bước để gia nhập Stromann</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative" }}>
          {[
            { n: "01", t: "Gửi CV", d: "Qua website hoặc email hr@stromann.vn" },
            { n: "02", t: "Phỏng vấn HR", d: "Trao đổi 30 phút về văn hoá, kỳ vọng" },
            { n: "03", t: "Phỏng vấn chuyên môn", d: "Với trưởng phòng + bài kiểm tra ngắn" },
            { n: "04", t: "Offer & Onboarding", d: "Phản hồi trong 5 ngày làm việc" },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{ background: "#fff", border: "1px solid var(--n-200)", borderRadius: 12, padding: 24 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "var(--accent)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12
                }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--n-900)" }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "var(--n-600)", marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  position: "absolute", top: 36, right: -16, width: 32, height: 2,
                  background: "var(--n-300)", zIndex: 1
                }}></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div>
          <h2 className="cta-banner__title">Không thấy vị trí phù hợp?</h2>
          <p className="cta-banner__sub">Gửi CV chủ động — chúng tôi luôn mở cửa cho người giỏi.</p>
        </div>
        <div className="cta-banner__ctas">
          <Btn variant="white" as="a" href="mailto:hr@stromann.vn">Gửi CV: hr@stromann.vn</Btn>
          <Btn variant="dark" as="a" href="#/contact">Liên hệ HR</Btn>
        </div>
      </section>
    </>
  );
}

window.PageRecruitment = PageRecruitment;
