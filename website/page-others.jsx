// page-others.jsx — About, Industries, Contact, News listing
const { Tag, Btn, IndustryImage, ProductImage } = window.SUI;
const { Breadcrumb } = window.SLAYOUT;
const { TIMELINE, STATS, INDUSTRIES, NEWS, PRODUCTS } = window.STROMANN_DATA;

function PageAbout() {
  return (
    <>
      <Breadcrumb items={[{ label: "Giới thiệu" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>VỀ CHÚNG TÔI</Tag>
        <h1>Stromann Việt Nam — đối tác phụ gia bạn có thể tin cậy</h1>
        <p>Hơn 10 năm đồng hành cùng các nhà sản xuất sơn, mực in và nhựa hàng đầu Việt Nam, mang đến giải pháp phụ gia chất lượng cao từ MÜNZING (Đức).</p>
      </div>

      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, margin: 0, letterSpacing: "-0.01em" }}>
              Sứ mệnh: nâng tầm chất lượng sản xuất công nghiệp Việt Nam
            </h2>
            <p style={{ color: "var(--n-600)", lineHeight: 1.7, marginTop: 20 }}>
              Stromann tin rằng các nhà sản xuất tại Việt Nam xứng đáng được tiếp cận với những phụ gia chuyên dụng và dịch vụ kỹ thuật ở tiêu chuẩn quốc tế. Chúng tôi không chỉ bán sản phẩm — chúng tôi đồng hành cùng khách hàng từ R&D đến sản xuất quy mô lớn.
            </p>
            <p style={{ color: "var(--n-600)", lineHeight: 1.7 }}>
              Phòng lab kỹ thuật riêng tại TP.HCM cho phép chúng tôi thử nghiệm công thức cùng khách hàng, đề xuất phụ gia phù hợp và tối ưu chi phí mà không phải gửi mẫu ra nước ngoài.
            </p>
          </div>
          <div style={{ height: 400, borderRadius: 16, overflow: "hidden" }}>
            <IndustryImage label="company photo" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="stat-grid">
          {STATS.map(s => (
            <div key={s.lbl} className="stat-card">
              <div className="stat-card__num">{s.num}</div>
              <div className="stat-card__lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }}>
          <div>
            <Tag variant="brand-soft">HÀNH TRÌNH</Tag>
            <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, margin: "12px 0 0", letterSpacing: "-0.01em" }}>
              Cột mốc của chúng tôi
            </h2>
            <p style={{ color: "var(--n-600)", marginTop: 16, lineHeight: 1.6 }}>
              Từ một nhà phân phối nhỏ tại TP.HCM đến đối tác chính thức của MÜNZING (Đức) với mạng lưới khách hàng B2B trên toàn quốc.
            </p>
          </div>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div key={t.year} className="timeline__item">
                <span className="timeline__dot"></span>
                <div>
                  <div className="timeline__year">{t.year}</div>
                  <div className="timeline__title">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ height: 320, borderRadius: 16, overflow: "hidden" }}>
            <IndustryImage label="MÜNZING factory · Germany" />
          </div>
          <div>
            <Tag variant="brand">ĐỐI TÁC CHIẾN LƯỢC</Tag>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0", letterSpacing: "-0.01em" }}>MÜNZING — hơn 180 năm chuyên gia phụ gia</h2>
            <p style={{ color: "var(--n-600)", lineHeight: 1.7 }}>
              Thành lập 1830 tại Đức, MÜNZING là nhà sản xuất phụ gia hiệu suất cao hàng đầu thế giới. Stromann là đối tác phân phối chính thức tại Việt Nam từ 2016, đảm bảo nguồn gốc và chất lượng từng lô hàng.
            </p>
            <Btn variant="dark" style={{ marginTop: 16 }} as="a" href="https://munzing.com" target="_blank">Tìm hiểu MÜNZING →</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

function PageIndustries() {
  return (
    <>
      <Breadcrumb items={[{ label: "Ngành ứng dụng" }]} />
      <div className="ind-hero">
        <div>
          <Tag>NGÀNH ỨNG DỤNG</Tag>
          <h1 style={{ marginTop: 16 }}>Giải pháp phụ gia cho<br/>3 ngành công nghiệp</h1>
          <p style={{ color: "var(--n-300)", fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 540 }}>
            Mỗi ngành có những thách thức kỹ thuật riêng — từ kiểm soát bọt khí trong sơn nước đến tối ưu phân tán pigment trong masterbatch. Stromann có giải pháp chuyên biệt cho từng nhu cầu.
          </p>
        </div>
        <div className="ind-hero__media"><IndustryImage label="industries · 3 ngành" dark /></div>
      </div>

      {INDUSTRIES.map((ind, i) => (
        <section key={ind.id} className={`section${i % 2 === 1 ? " section--alt" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 48, alignItems: "center" }}>
            {i % 2 === 0 ? (
              <>
                <div style={{ height: 360, borderRadius: 16, overflow: "hidden" }}><IndustryImage label={ind.title} /></div>
                <IndContent ind={ind} />
              </>
            ) : (
              <>
                <IndContent ind={ind} />
                <div style={{ height: 360, borderRadius: 16, overflow: "hidden" }}><IndustryImage label={ind.title} /></div>
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function IndContent({ ind }) {
  const problems = [
    { num: "01", title: "Bọt khí trong khâu phối trộn", desc: "Kiểm soát bọt vi mô và bọt thô ở cả khâu sản xuất lẫn thi công." },
    { num: "02", title: "Phân tán pigment kém", desc: "Cải thiện ổn định của hệ huyền phù, giảm sa lắng theo thời gian." },
    { num: "03", title: "Bề mặt và độ trải", desc: "Wetting agent giúp lan tỏa đều, không gây hiệu ứng cratering." },
    { num: "04", title: "Độ nhớt và rheology", desc: "Tối ưu profile lưu biến cho gia công và lưu trữ." },
  ];
  return (
    <div>
      <Tag variant="brand-soft">{ind.code === "S" ? "COATINGS" : ind.code === "M" ? "PRINTING INKS" : "PLASTICS"}</Tag>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0", letterSpacing: "-0.01em" }}>{ind.title}</h2>
      <p style={{ color: "var(--n-600)", lineHeight: 1.6, marginBottom: 24 }}>{ind.desc}</p>
      <h4 style={{ marginBottom: 16 }}>Vấn đề Stromann có thể giải quyết:</h4>
      <div className="problem-grid">
        {problems.map(p => (
          <div key={p.num} className="problem-card">
            <div className="problem-card__num">{p.num}</div>
            <div>
              <div className="problem-card__title">{p.title}</div>
              <div className="problem-card__desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="primary" style={{ marginTop: 24 }} as="a" href="#/products">Xem sản phẩm cho ngành này →</Btn>
    </div>
  );
}

function PageContact() {
  return (
    <>
      <Breadcrumb items={[{ label: "Liên hệ" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>LIÊN HỆ</Tag>
        <h1>Tư vấn kỹ thuật & Báo giá</h1>
        <p>Đội ngũ kỹ sư Stromann sẵn sàng tư vấn về công thức, sản phẩm phù hợp và báo giá cạnh tranh. Phản hồi trong 4h làm việc.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3 style={{ fontSize: 22, margin: 0 }}>Liên hệ trực tiếp</h3>
          <div className="contact-row">
            <div className="contact-row__icon">📍</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Trụ sở chính — TP.HCM</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>19 Nguyễn Văn Trỗi, P.11, Q.Phú Nhuận, TP.HCM</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">📍</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Văn phòng Hà Nội</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>Tầng 8, Toà CMC Tower, 11 Duy Tân, Cầu Giấy, Hà Nội</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">📞</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Hotline</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>+84 28 36200703 — info@stromann.vn</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">⏰</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Giờ làm việc</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>T2–T6: 8:00 – 17:30 · T7: 8:00 – 12:00</p>
            </div>
          </div>
          <div className="map-wrap" style={{ marginTop: 16 }}>
            <div className="map-pin">
              <div className="map-pin__lbl">Stromann VN</div>
              <div className="map-pin__dot"></div>
            </div>
          </div>
        </div>

        <form style={{ background: "#fff", border: "1px solid var(--n-200)", borderRadius: 16, padding: 32 }}>
          <h3 style={{ marginTop: 0, fontSize: 22 }}>Gửi yêu cầu</h3>
          <p style={{ color: "var(--n-600)", marginBottom: 24 }}>Điền thông tin bên dưới — đội kỹ thuật sẽ phản hồi trong 4h làm việc.</p>
          <div className="form-grid-2">
            <div className="form-row"><label>Họ tên <span className="req">*</span></label><input className="input" placeholder="Nguyễn Văn A" /></div>
            <div className="form-row"><label>Công ty <span className="req">*</span></label><input className="input" placeholder="Tên công ty" /></div>
          </div>
          <div className="form-grid-2">
            <div className="form-row"><label>Email <span className="req">*</span></label><input className="input" type="email" placeholder="email@congty.com" /></div>
            <div className="form-row"><label>Điện thoại</label><input className="input" placeholder="+84 ..." /></div>
          </div>
          <div className="form-row">
            <label>Loại yêu cầu</label>
            <select className="input">
              <option>Tư vấn kỹ thuật</option>
              <option>Yêu cầu báo giá</option>
              <option>Yêu cầu mẫu thử</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="form-row">
            <label>Sản phẩm quan tâm</label>
            <input className="input" placeholder="VD: AGITAN® 120, Defoamer cho sơn nước..." />
          </div>
          <div className="form-row">
            <label>Mô tả chi tiết <span className="req">*</span></label>
            <textarea className="input" placeholder="Vui lòng mô tả nhu cầu, hệ sản xuất, vấn đề đang gặp..."></textarea>
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, fontSize: 13, color: "var(--n-600)" }}>
            <input type="checkbox" defaultChecked /> Tôi đồng ý nhận thông tin sản phẩm và kỹ thuật từ Stromann
          </label>
          <Btn variant="primary" size="lg" style={{ width: "100%" }}>Gửi yêu cầu →</Btn>
        </form>
      </div>
    </>
  );
}

function PageNews() {
  return (
    <>
      <Breadcrumb items={[{ label: "Tin tức" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>NEWSROOM</Tag>
        <h1>Tin tức & Kiến thức kỹ thuật</h1>
        <p>Cập nhật sản phẩm mới, kiến thức về phụ gia và case study thực tế từ ngành sơn, mực in và nhựa.</p>
      </div>

      <div style={{ padding: "0 80px" }}>
        <div className="toolbar">
          <div className="toolbar__chips">
            {["Tất cả", "Kiến thức kỹ thuật", "Sản phẩm", "Sự kiện", "Công ty"].map((c, i) => (
              <button key={c} className={`chip${i === 0 ? " active" : ""}`}>{c}</button>
            ))}
          </div>
          <input className="input" placeholder="Tìm kiếm bài viết..." style={{ width: 260 }} />
        </div>
      </div>

      <div className="news-listing-grid">
        {NEWS.map(n => (
          <a key={n.id} className="news-card" href={`#/news/${n.id}`}>
            <div className="news-card__media"><IndustryImage label={n.tag.toLowerCase()} /></div>
            <div className="news-card__body">
              <Tag variant="brand-soft">{n.tag}</Tag>
              <h3 className="news-card__title">{n.title}</h3>
              <div className="news-card__meta" style={{ marginTop: "auto" }}>
                <span>{n.date}</span><span>•</span><span>{n.read}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination" style={{ paddingBottom: 64 }}>
        {[1,2,3,4,5].map(n => <button key={n} className={`pg${n === 1 ? " active" : ""}`}>{n}</button>)}
        <button className="pg">›</button>
      </div>
    </>
  );
}

window.PageAbout = PageAbout;
window.PageIndustries = PageIndustries;
window.PageContact = PageContact;
window.PageNews = PageNews;
