// ============================================================================
// ADMIN DETAIL PAGES — for stromann/admin.html
// Each page accepts { id, goBack, goTo } props for navigation
// ============================================================================

const { useState } = React;

// ----------------------------------------------------------------------------
// Shared atoms
// ----------------------------------------------------------------------------

function DetailHeader({ breadcrumb, title, sub, badge, goBack, actions }) {
  return (
    <div className="page-h" style={{ marginBottom: 24 }}>
      <div>
        <div className="crumb">
          <a onClick={goBack} style={{ cursor: "pointer", color: "var(--brand-500)" }}>← {breadcrumb}</a> / <span>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
          <h1 style={{ margin: 0 }}>{title}</h1>
          {badge}
        </div>
        {sub && <p>{sub}</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>{actions}</div>
    </div>
  );
}

function FormSection({ title, desc, children }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card__head">
        <div>
          <h3>{title}</h3>
          {desc && <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 2 }}>{desc}</div>}
        </div>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}

function LangTabs({ lang, setLang }) {
  return (
    <div style={{ display: "inline-flex", gap: 0, background: "var(--n-100)", padding: 3, borderRadius: 8, marginBottom: 16 }}>
      {[
        { id: "vn", label: "🇻🇳 Tiếng Việt", flag: "VN" },
        { id: "en", label: "🇬🇧 English", flag: "EN" },
        { id: "cn", label: "🇨🇳 中文", flag: "CN" },
      ].map(t => (
        <button key={t.id} onClick={() => setLang(t.id)}
          style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: 6,
            background: lang === t.id ? "#fff" : "transparent",
            color: lang === t.id ? "var(--n-900)" : "var(--n-600)",
            boxShadow: lang === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function ChipMulti({ options, selected, onChange }) {
  const toggle = v => {
    if (selected.includes(v)) onChange(selected.filter(x => x !== v));
    else onChange([...selected, v]);
  };
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map(o => {
        const on = selected.includes(o);
        return (
          <button key={o} onClick={() => toggle(o)}
            style={{
              padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 999,
              border: on ? "1px solid var(--brand-500)" : "1px solid var(--n-300)",
              background: on ? "#FFE4E6" : "#fff",
              color: on ? "var(--brand-700)" : "var(--n-700)",
            }}>
            {on && "✓ "}{o}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// PRODUCT DETAIL — Edit form
// ============================================================================

function PageProductDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const [industries, setIndustries] = useState(["Sơn nước", "Mực in nước"]);
  const [problems, setProblems] = useState(["Bọt"]);
  const [appMatrix, setAppMatrix] = useState({
    "Sơn nước": true, "Sơn dầu": false, "Sơn bóng": true,
    "Mực in nước": true, "Mực in dầu": false, "Nhựa": false, "Masterbatch": false
  });
  const [docs, setDocs] = useState([
    { name: "AGITAN-120-MSDS-VN.pdf", size: "247 KB", type: "MSDS", date: "20/04/2026" },
    { name: "AGITAN-120-Brochure.pdf", size: "1.2 MB", type: "Brochure", date: "15/04/2026" },
  ]);

  const isNew = id === "new";

  return (
    <>
      <DetailHeader
        breadcrumb="Sản phẩm"
        title={isNew ? "Thêm sản phẩm mới" : "AGITAN® 120"}
        sub={isNew ? "Điền đầy đủ thông tin sản phẩm cho cả 3 ngôn ngữ trước khi xuất bản." : "Defoamer · MÜNZING · Cập nhật lần cuối 29/04/2026 14:32 bởi Văn A"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            {!isNew && <button className="btn btn--secondary">⤓ Xuất COA</button>}
            {!isNew && <button className="btn btn--secondary">👁 Xem trên website</button>}
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu sản phẩm thành công"); goBack(); }}>
              {isNew ? "Tạo & xuất bản" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Thông tin cơ bản">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field">
                <label>Tên sản phẩm <span className="req">*</span></label>
                <input className="input" defaultValue={lang === "vn" ? "AGITAN® 120" : lang === "en" ? "AGITAN® 120" : "AGITAN® 120 消泡剂"} />
              </div>
              <div className="field">
                <label>Slug URL</label>
                <input className="input" defaultValue="agitan-120" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>stromann.vn/san-pham/<b>agitan-120</b></div>
              </div>
            </div>
            <div className="field">
              <label>Mô tả ngắn (hiển thị trên card listing)</label>
              <textarea className="input" rows={2} defaultValue={lang === "vn"
                ? "Defoamer hiệu suất cao cho hệ sơn nước và mực in gốc nước. Khử bọt nhanh, không làm ảnh hưởng độ bóng."
                : lang === "en"
                ? "High-performance defoamer for waterborne coatings and inks. Fast knockdown, no gloss reduction."
                : "用于水性涂料和墨水的高性能消泡剂。快速消泡,不影响光泽度。"} />
            </div>
            <div className="field">
              <label>Mô tả chi tiết</label>
              <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: 6, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 2 }}>
                  {["B","I","U","H1","H2","•","1.","🔗","📷","</>"].map(t => (
                    <button key={t} style={{ padding: "4px 8px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>
                  ))}
                </div>
                <textarea style={{ width: "100%", border: "none", padding: 12, minHeight: 120, fontSize: 13, outline: "none", resize: "vertical" }}
                  defaultValue="AGITAN® 120 là defoamer dạng nhũ tương dầu khoáng, được phát triển cho các hệ sơn nước có hàm lượng pigment cao. Sản phẩm hoạt động hiệu quả ngay cả ở liều thấp 0.1-0.5%, giúp loại bỏ bọt khí phát sinh trong quá trình khuấy trộn và thi công..."></textarea>
              </div>
            </div>
          </FormSection>

          <FormSection title="Phân loại & gắn tag">
            <div className="field-row-3">
              <div className="field">
                <label>Nhóm chức năng <span className="req">*</span></label>
                <select className="input" defaultValue="Defoamer">
                  <option>Defoamer</option><option>Dispersant</option><option>Wetting Agent</option>
                  <option>Rheology Modifier</option><option>Wax Additive</option>
                </select>
              </div>
              <div className="field">
                <label>Thương hiệu</label>
                <select className="input" defaultValue="MÜNZING"><option>MÜNZING</option><option>AddWorks</option></select>
              </div>
              <div className="field">
                <label>Khu vực có hiệu lực</label>
                <select className="input" defaultValue="Asia/Oceania">
                  <option>EMEA · Americas · Asia/Oceania</option>
                  <option>EMEA</option><option>Americas</option><option>Asia/Oceania</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Ngành ứng dụng</label>
              <ChipMulti
                options={["Sơn nước", "Sơn dầu", "Sơn bóng", "Mực in nước", "Mực in dầu", "Nhựa", "Masterbatch", "Keo dán"]}
                selected={industries} onChange={setIndustries}
              />
            </div>
            <div className="field">
              <label>Vấn đề kỹ thuật giải quyết</label>
              <ChipMulti
                options={["Bọt", "Phân tán", "Độ nhớt", "Bề mặt", "Lên màu", "Lưu biến", "Thấm ướt"]}
                selected={problems} onChange={setProblems}
              />
            </div>
          </FormSection>

          <FormSection title="Bảng ứng dụng" desc="Đánh dấu ✓ ở các ô loại sản phẩm cuối phù hợp — hiển thị thành matrix trên trang chi tiết.">
            <table className="tbl" style={{ border: "1px solid var(--n-200)", borderRadius: 8, overflow: "hidden" }}>
              <thead>
                <tr>
                  <th style={{ background: "#FAFAFA" }}>Loại sản phẩm cuối</th>
                  <th style={{ background: "#FAFAFA", textAlign: "center", width: 100 }}>Phù hợp</th>
                  <th style={{ background: "#FAFAFA", width: 200 }}>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(appMatrix).map(k => (
                  <tr key={k}>
                    <td className="tbl__name">{k}</td>
                    <td style={{ textAlign: "center" }}>
                      <input type="checkbox" checked={appMatrix[k]} onChange={e => setAppMatrix({ ...appMatrix, [k]: e.target.checked })} style={{ width: 18, height: 18 }} />
                    </td>
                    <td><input className="input" placeholder="Liều dùng / lưu ý..." style={{ padding: "4px 8px", fontSize: 12 }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FormSection>

          <FormSection title="Tài liệu" desc="MSDS · Brochure · COA. Bỏ TDS theo yêu cầu.">
            <div style={{ marginBottom: 12 }}>
              {docs.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid var(--n-200)", borderRadius: 8, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 44, background: "#FEE2E2", color: "#DC2626", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10 }}>PDF</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>{d.type} · {d.size} · Tải lên {d.date}</div>
                  </div>
                  <span className="pill pill--info">{d.type}</span>
                  <button className="tbl__act" title="Tải xuống">⤓</button>
                  <button className="tbl__act danger" title="Xóa" onClick={() => setDocs(docs.filter((_, x) => x !== i))}>🗑</button>
                </div>
              ))}
            </div>
            <div style={{ border: "2px dashed var(--n-300)", borderRadius: 8, padding: 24, textAlign: "center", color: "var(--n-500)", fontSize: 13 }}>
              📁 Kéo thả file PDF vào đây hoặc <a style={{ color: "var(--brand-500)", fontWeight: 600, cursor: "pointer" }}>chọn từ máy</a>
              <div style={{ fontSize: 11, marginTop: 4 }}>Tối đa 10MB · Hỗ trợ PDF</div>
            </div>
          </FormSection>

          <FormSection title="Sản phẩm tương tự" desc="Hiển thị ở cuối trang chi tiết. Để trống = tự đề xuất theo nhóm + ngành.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["EDAPLAN® 470", "METOLAT® 358", "AGITAN® 282", "TAFIGEL® PUR 80"].map(p => (
                <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={["EDAPLAN® 470", "AGITAN® 282"].includes(p)} />
                  <div className="thumb thumb--brand" style={{ width: 32, height: 32 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{p}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>MÜNZING</div>
                  </div>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="AGITAN® 120 — Defoamer cho sơn nước | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2} defaultValue="Defoamer hiệu suất cao MÜNZING AGITAN® 120 — khử bọt nhanh trong sơn nước, mực in. Liên hệ Stromann để nhận mẫu thử và báo giá."></textarea></div>
            <div className="field"><label>OG image (1200×630)</label>
              <div style={{ border: "2px dashed var(--n-300)", borderRadius: 8, padding: 16, textAlign: "center", fontSize: 12, color: "var(--n-500)" }}>📷 Chọn ảnh OG</div>
            </div>
          </FormSection>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Hiển thị</label>
                <select className="input" defaultValue="published">
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Nháp</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              <div className="field">
                <label>Ảnh sản phẩm</label>
                <div style={{ aspectRatio: "1", background: "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)", border: "1px solid var(--n-200)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 12 }}>
                  📷 Chọn ảnh chính
                </div>
              </div>
              <div className="field">
                <label>Ảnh phụ (gallery)</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ aspectRatio: "1", background: "var(--n-100)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-400)", fontSize: 11, border: "1px dashed var(--n-300)" }}>+</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái dịch</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { lang: "🇻🇳 Tiếng Việt (gốc)", status: "Hoàn chỉnh", cls: "pill--success" },
                { lang: "🇬🇧 English", status: "Hoàn chỉnh", cls: "pill--success" },
                { lang: "🇨🇳 中文", status: "Thiếu mô tả", cls: "pill--warn" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                  <div style={{ flex: 1, fontSize: 12 }}>{t.lang}</div>
                  <span className={`pill ${t.cls}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body">
                {[
                  { lbl: "Lượt xem 30 ngày", val: "1,249" },
                  { lbl: "Yêu cầu báo giá", val: "23" },
                  { lbl: "Tải MSDS", val: "87" },
                  { lbl: "Compare", val: "14" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button className="btn btn--danger" style={{ width: "100%", marginTop: 16, justifyContent: "center", border: "1px solid #FCA5A5", background: "#FEF2F2" }}>
              🗑 Xóa sản phẩm này
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// SUBMISSION DETAIL — Xem & trả lời form gửi đến
// ============================================================================

function PageSubmissionDetail({ id, goBack }) {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("in-progress");
  const [assignee, setAssignee] = useState("Sales 1");

  return (
    <>
      <DetailHeader
        breadcrumb="Form gửi đến"
        title="Yêu cầu báo giá #SUB-2026-0429-001"
        sub="Cty Sơn Nippon VN · Phạm Thị Lan · 29/04/2026 14:32"
        badge={<Pill status={status} />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--secondary">📞 Gọi ngay</button>
            <button className="btn btn--secondary">⤓ Xuất PDF</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã gửi phản hồi đến khách"); goBack(); }}>📤 Gửi phản hồi</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div>
          {/* Customer info */}
          <FormSection title="Thông tin khách">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { lbl: "Họ tên", val: "Phạm Thị Lan" },
                { lbl: "Công ty", val: "Cty CP Sơn Nippon Việt Nam" },
                { lbl: "Email", val: "lan.pt@nippon.vn", link: "mailto:lan.pt@nippon.vn" },
                { lbl: "Số điện thoại", val: "+84 909 123 456", link: "tel:+84909123456" },
                { lbl: "Địa chỉ", val: "Khu CN Amata, Biên Hòa, Đồng Nai" },
                { lbl: "Vai trò", val: "R&D Manager" },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.06 }}>{f.lbl}</div>
                  <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500 }}>
                    {f.link ? <a href={f.link} style={{ color: "var(--brand-500)" }}>{f.val}</a> : f.val}
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          {/* Products requested */}
          <FormSection title="Sản phẩm yêu cầu báo giá">
            <table className="tbl">
              <thead><tr><th>Mã sản phẩm</th><th>Số lượng</th><th>Đơn vị</th><th>Ghi chú</th></tr></thead>
              <tbody>
                <tr>
                  <td><div className="tbl__name">AGITAN® 120</div><div className="tbl__sub">Defoamer · MÜNZING</div></td>
                  <td><b>200</b></td>
                  <td>kg</td>
                  <td style={{ fontSize: 12, color: "var(--n-600)" }}>Cần MSDS bản tiếng Anh</td>
                </tr>
                <tr>
                  <td><div className="tbl__name">EDAPLAN® 470</div><div className="tbl__sub">Dispersant · MÜNZING</div></td>
                  <td><b>50</b></td>
                  <td>kg</td>
                  <td style={{ fontSize: 12, color: "var(--n-600)" }}>—</td>
                </tr>
              </tbody>
            </table>
          </FormSection>

          {/* Technical notes */}
          <FormSection title="Ghi chú kỹ thuật từ khách">
            <div style={{ padding: 16, background: "#FAFAFA", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: "var(--n-700)" }}>
              "Chúng tôi đang phát triển dòng sơn nước nội thất mới với hàm lượng pigment cao (PVC ~75%). Đang gặp vấn đề bọt khí trong quá trình khuấy ở tốc độ 1500 rpm. Đã thử AGITAN® 282 nhưng hiệu quả không đủ. Mong được tư vấn và gửi mẫu thử AGITAN® 120 và EDAPLAN® 470 trước khi đặt lô lớn. Cần báo giá CIF Cát Lái, thanh toán LC 60 ngày."
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--n-600)" }}>
              📎 <b>company-spec.pdf</b> · 432 KB · <a style={{ color: "var(--brand-500)" }}>Tải xuống</a>
            </div>
          </FormSection>

          {/* Conversation thread */}
          <FormSection title="Lịch sử trao đổi">
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, background: "var(--n-200)" }}></div>
              {[
                { who: "Khách", color: "#1E40AF", bg: "#DBEAFE", msg: "Gửi yêu cầu báo giá lần đầu", time: "29/04/2026 14:32", initial: true },
                { who: "Hệ thống", color: "#52525B", bg: "var(--n-100)", msg: "Tự động gửi email xác nhận đến khách", time: "29/04/2026 14:32" },
                { who: "Văn A (Admin)", color: "var(--brand-700)", bg: "#FFE4E6", msg: "Gán cho Sales 1", time: "29/04/2026 14:35" },
                { who: "Sales 1", color: "#166534", bg: "#DCFCE7", msg: "Đã liên hệ khách qua điện thoại — xác nhận thông số", time: "29/04/2026 15:12" },
              ].map((m, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 16 }}>
                  <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", background: m.color, border: "2px solid #fff" }}></div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{m.who}</span>
                    <span style={{ fontSize: 11, color: "var(--n-500)" }}>{m.time}</span>
                  </div>
                  <div style={{ padding: 10, background: m.bg, borderRadius: 8, fontSize: 13, color: "var(--n-800)" }}>{m.msg}</div>
                </div>
              ))}
            </div>
          </FormSection>

          {/* Reply box */}
          <FormSection title="Phản hồi khách">
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {["📧 Email báo giá", "📞 Đã gọi xác nhận", "📋 Yêu cầu thêm thông tin", "✅ Hoàn tất giao dịch"].map(t => (
                <button key={t} className="chip" style={{ fontSize: 11 }}>{t}</button>
              ))}
            </div>
            <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: 6, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 2 }}>
                {["B","I","U","🔗","📷","📎","💰 Bảng giá"].map(t => (
                  <button key={t} style={{ padding: "4px 8px", fontSize: 11, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>
                ))}
              </div>
              <textarea value={reply} onChange={e => setReply(e.target.value)}
                style={{ width: "100%", border: "none", padding: 12, minHeight: 100, fontSize: 13, outline: "none", resize: "vertical" }}
                placeholder="Soạn nội dung phản hồi cho khách... (sẽ gửi qua email + lưu vào lịch sử)"
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <label style={{ fontSize: 12, color: "var(--n-600)", display: "flex", gap: 6, alignItems: "center" }}>
                <input type="checkbox" defaultChecked /> CC bộ phận kỹ thuật
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn--secondary">Lưu nháp</button>
                <button className="btn btn--primary" onClick={() => showToast("Đã gửi phản hồi đến khách")}>📤 Gửi phản hồi</button>
              </div>
            </div>
          </FormSection>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái xử lý</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="new">Mới</option>
                  <option value="in-progress">Đang xử lý</option>
                  <option value="done">Đã xử lý</option>
                </select>
              </div>
              <div className="field">
                <label>Người phụ trách</label>
                <select className="input" value={assignee} onChange={e => setAssignee(e.target.value)}>
                  <option>Chưa gán</option>
                  <option>Sales 1 — Trần Văn B</option>
                  <option>Sales 2 — Lê Thị C</option>
                  <option>Tech 1 — Nguyễn D</option>
                </select>
              </div>
              <div className="field">
                <label>Mức độ ưu tiên</label>
                <div style={{ display: "flex", gap: 4 }}>
                  {["Thấp", "Bình thường", "Cao", "Khẩn"].map(p => (
                    <button key={p} className="chip" style={{ flex: 1, padding: "6px 0", fontSize: 11, ...(p === "Cao" ? { background: "var(--brand-500)", color: "#fff", borderColor: "var(--brand-500)" } : {}) }}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Tags</label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span className="pill pill--brand">Khách lớn</span>
                  <span className="pill pill--info">Sơn nước</span>
                  <span className="pill pill--neutral">+ Thêm tag</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Lịch sử khách</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { date: "29/04/2026", text: "Yêu cầu báo giá hiện tại", current: true },
                { date: "15/03/2026", text: "Đã đặt 100kg AGITAN® 282" },
                { date: "10/01/2026", text: "Tư vấn kỹ thuật về dispersant" },
                { date: "20/11/2025", text: "Liên hệ lần đầu qua website" },
              ].map((h, i) => (
                <div key={i} style={{ padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none", background: h.current ? "#FFF8F8" : "transparent" }}>
                  <div style={{ fontSize: 12, color: "var(--n-500)" }}>{h.date}</div>
                  <div style={{ fontSize: 13, fontWeight: h.current ? 600 : 400, marginTop: 2 }}>{h.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hành động nhanh</h3></div>
            <div className="card__body" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>📋 Tạo báo giá chính thức</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>🧪 Tạo phiếu gửi mẫu thử</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>👥 Chuyển sang Tech</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>🚫 Đánh dấu spam</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// BANNER DETAIL
// ============================================================================

function PageBannerDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  return (
    <>
      <DetailHeader
        breadcrumb="Banner trang chủ"
        title={isNew ? "Tạo banner mới" : "AGITAN® thế hệ mới — đã có hàng tại VN"}
        sub={isNew ? "Banner sẽ tự động bật/tắt theo thời gian hiệu lực." : "Đang chạy · Hiệu lực 01/04 → 30/06/2026"}
        badge={!isNew && <Pill status="active" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu banner"); goBack(); }}>{isNew ? "Tạo banner" : "Lưu thay đổi"}</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Hình ảnh & nội dung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field">
              <label>Ảnh banner (1920×800)</label>
              <div style={{ aspectRatio: "1920/800", background: "linear-gradient(135deg, #E11D2C, #931017)", borderRadius: 8, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 20px, transparent 20px 40px)" }}></div>
                <button style={{ position: "absolute", top: 12, right: 12, padding: "6px 12px", background: "rgba(255,255,255,0.95)", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>📷 Đổi ảnh</button>
                <div style={{ position: "absolute", bottom: 24, left: 32, color: "#fff" }}>
                  <div style={{ fontSize: 10, opacity: 0.8, fontWeight: 700, letterSpacing: 0.1 }}>NEW PRODUCT LINE</div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>AGITAN® thế hệ mới</div>
                </div>
              </div>
            </div>
            <div className="field"><label>Tiêu đề chính</label><input className="input" defaultValue="AGITAN® thế hệ mới — đã có hàng tại VN" /></div>
            <div className="field"><label>Mô tả</label><textarea className="input" rows={2} defaultValue="Defoamer hiệu suất cao, không silicone, phù hợp cho mọi hệ sơn nước"></textarea></div>
            <div className="field-row">
              <div className="field"><label>Text nút CTA</label><input className="input" defaultValue="Khám phá sản phẩm" /></div>
              <div className="field"><label>Link đích</label><input className="input" defaultValue="/san-pham/agitan-120" /></div>
            </div>
          </FormSection>

          <FormSection title="Thời gian hiệu lực" desc="Banner sẽ tự động hiển thị/ẩn theo thời gian này.">
            <div className="field-row">
              <div className="field"><label>Bắt đầu <span className="req">*</span></label><input className="input" type="datetime-local" defaultValue="2026-04-01T00:00" /></div>
              <div className="field"><label>Kết thúc</label><input className="input" type="datetime-local" defaultValue="2026-06-30T23:59" /></div>
            </div>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, marginTop: 8 }}>
              <input type="checkbox" /> Không có thời hạn (luôn hiển thị)
            </label>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Vị trí & thứ tự</h3></div>
            <div className="card__body">
              <div className="field"><label>Vị trí trang</label><select className="input"><option>Hero homepage</option><option>Hero trang sản phẩm</option><option>Banner giữa trang chủ</option></select></div>
              <div className="field"><label>Thứ tự hiển thị</label><input className="input" type="number" defaultValue="1" /></div>
              <div className="field">
                <label>Bật/tắt</label>
                <Toggle on={true} onChange={() => {}} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hiệu suất banner</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { lbl: "Lượt hiển thị", val: "12,432" },
                { lbl: "Lượt click", val: "847" },
                { lbl: "CTR", val: "6.8%", up: true },
                { lbl: "Báo giá phát sinh", val: "23" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                  <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                  <b style={{ color: s.up ? "#16A34A" : "var(--n-900)" }}>{s.val}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// NEWS DETAIL — Rich editor
// ============================================================================

function PageNewsDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  return (
    <>
      <DetailHeader
        breadcrumb="Tin tức"
        title={isNew ? "Viết bài mới" : "5 lưu ý chọn defoamer cho sơn nước hệ acrylic"}
        sub={isNew ? "Bài viết hỗ trợ rich text, ảnh, video, embed." : "Kiến thức KT · Tech Team · Đăng 25/04/2026 · 1,240 lượt xem"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--secondary">👁 Xem trước</button>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã xuất bản bài viết"); goBack(); }}>📰 Xuất bản</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Nội dung bài viết">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field"><label>Tiêu đề <span className="req">*</span></label><input className="input" style={{ fontSize: 18, fontWeight: 600 }} defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic" /></div>
            <div className="field"><label>Slug URL</label><input className="input" defaultValue="5-luu-y-chon-defoamer-cho-son-nuoc" /></div>
            <div className="field">
              <label>Ảnh đại diện (1200×630)</label>
              <div style={{ aspectRatio: "1200/630", background: "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)", border: "1px solid var(--n-200)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 13 }}>
                📷 Chọn ảnh đại diện
              </div>
            </div>
            <div className="field"><label>Mô tả ngắn (excerpt)</label><textarea className="input" rows={2} defaultValue="Hướng dẫn nhanh cho R&D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước, kèm ví dụ thực tế."></textarea></div>

            <div className="field">
              <label>Nội dung bài viết</label>
              <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: 8, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {["¶ Đoạn", "H2", "H3"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4, background: "#fff", border: "1px solid var(--n-200)" }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["B","I","U","S"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["• Bullet","1. Số","❝ Trích","</> Code"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["🔗 Link","📷 Ảnh","🎬 Video","📊 Bảng","📎 File"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                </div>
                <div style={{ padding: 20, minHeight: 320, fontSize: 14, lineHeight: 1.7, color: "var(--n-800)" }} contentEditable suppressContentEditableWarning>
                  <h2 style={{ marginTop: 0 }}>1. Hệ sơn của bạn là gì?</h2>
                  <p>Trước khi chọn defoamer, cần xác định hệ nhựa (acrylic, vinyl, alkyd...) và hàm lượng pigment. AGITAN® 120 phù hợp cho hệ acrylic PVC trung-cao.</p>
                  <h2>2. Bọt đại thể hay bọt vi mô?</h2>
                  <p>Bọt đại thể (macro) dễ xử lý hơn bọt vi mô (micro). Đối với bọt vi mô gây pinhole, cần defoamer có hoạt tính mạnh hơn.</p>
                  <p style={{ padding: 12, background: "#FFF8F8", borderLeft: "3px solid var(--brand-500)", borderRadius: 4 }}>
                    💡 <b>Mẹo từ chuyên gia:</b> Luôn test ở cả 2 mức liều — khuyến nghị và 1.5× để xác định "vùng an toàn".
                  </p>
                  <h2>3. Tương thích với các phụ gia khác</h2>
                  <p>Defoamer mạnh có thể gây co màng (cratering) khi kết hợp với một số wetting agent. Cần kiểm tra DOI...</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--n-500)" }}>
                <span>Đã lưu tự động lúc 14:32</span>
                <span>1,247 từ · ~5 phút đọc</span>
              </div>
            </div>
          </FormSection>

          <FormSection title="SEO & Open Graph">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2}></textarea></div>
            <div style={{ padding: 12, background: "#FAFAFA", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--n-500)", marginBottom: 8 }}>👁 Xem trước Google</div>
              <div style={{ fontSize: 18, color: "#1a0dab", fontWeight: 400 }}>5 lưu ý chọn defoamer cho sơn nước hệ acrylic</div>
              <div style={{ fontSize: 12, color: "#006621" }}>stromann.vn › tin-tuc › 5-luu-y-chon-defoamer</div>
              <div style={{ fontSize: 13, color: "#4d5156", marginTop: 4 }}>Hướng dẫn nhanh cho R&D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước...</div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Phân loại</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Chuyên mục <span className="req">*</span></label>
                <select className="input"><option>Kiến thức kỹ thuật</option><option>Ứng dụng thực tế</option><option>Sản phẩm</option><option>Tin công ty</option></select>
              </div>
              <div className="field">
                <label>Tags</label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: 4, border: "1px solid var(--n-300)", borderRadius: 8 }}>
                  {["#defoamer", "#sơn-nước", "#acrylic"].map(t => (
                    <span key={t} style={{ padding: "2px 8px", background: "var(--n-100)", borderRadius: 4, fontSize: 12 }}>{t} <span style={{ color: "var(--n-500)", cursor: "pointer" }}>×</span></span>
                  ))}
                  <input style={{ flex: 1, minWidth: 80, border: "none", outline: "none", fontSize: 12 }} placeholder="Thêm tag..." />
                </div>
              </div>
              <div className="field">
                <label>Sản phẩm liên kết</label>
                <select className="input" multiple style={{ height: 80 }}>
                  <option>AGITAN® 120</option><option>AGITAN® 282</option><option>EDAPLAN® 470</option>
                </select>
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>Hiển thị ở cuối bài viết</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Xuất bản</h3></div>
            <div className="card__body">
              <div className="field"><label>Trạng thái</label>
                <select className="input"><option>Đã xuất bản</option><option>Nháp</option><option>Lên lịch</option></select>
              </div>
              <div className="field"><label>Ngày đăng</label><input className="input" type="datetime-local" defaultValue="2026-04-25T09:00" /></div>
              <div className="field"><label>Tác giả</label>
                <select className="input"><option>Tech Team</option><option>Marketing</option><option>Văn A</option></select>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}><input type="checkbox" defaultChecked /> Cho phép comment</label>
              <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, marginTop: 6 }}><input type="checkbox" defaultChecked /> Bài nổi bật</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// JOB DETAIL — Recruitment
// ============================================================================

function PageJobDetail({ id, goBack, goTo }) {
  const isNew = id === "new";
  const [tab, setTab] = useState("info");

  return (
    <>
      <DetailHeader
        breadcrumb="Tuyển dụng"
        title={isNew ? "Thêm vị trí tuyển dụng" : "Lab Engineer"}
        sub={isNew ? "" : "Kỹ thuật · TP.HCM · Full-time · Hạn 31/05/2026"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu vị trí"); goBack(); }}>{isNew ? "Đăng tuyển" : "Lưu thay đổi"}</button>
          </>
        }
      />

      {!isNew && (
        <div className="tabs">
          <div className={`tab ${tab === "info" ? "active" : ""}`} onClick={() => setTab("info")}>Thông tin vị trí</div>
          <div className={`tab ${tab === "applicants" ? "active" : ""}`} onClick={() => setTab("applicants")}>Ứng viên (12)</div>
        </div>
      )}

      {tab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            <FormSection title="Thông tin chung">
              <div className="field-row">
                <div className="field"><label>Tên vị trí <span className="req">*</span></label><input className="input" defaultValue="Lab Engineer" /></div>
                <div className="field"><label>Slug URL</label><input className="input" defaultValue="lab-engineer" /></div>
              </div>
              <div className="field-row-3">
                <div className="field"><label>Phòng ban <span className="req">*</span></label>
                  <select className="input"><option>Kỹ thuật</option><option>Kinh doanh</option><option>Marketing</option><option>Kho vận</option><option>HR</option></select>
                </div>
                <div className="field"><label>Địa điểm</label>
                  <select className="input"><option>TP.HCM</option><option>Hà Nội</option><option>Remote</option></select>
                </div>
                <div className="field"><label>Hình thức</label>
                  <select className="input"><option>Full-time</option><option>Part-time</option><option>Intern</option></select>
                </div>
              </div>
              <div className="field-row">
                <div className="field"><label>Mức lương</label><input className="input" defaultValue="15-25 triệu (thỏa thuận)" /></div>
                <div className="field"><label>Hạn nộp</label><input className="input" type="date" defaultValue="2026-05-31" /></div>
              </div>
            </FormSection>

            <FormSection title="Mô tả công việc">
              <div className="field"><label>Mô tả ngắn</label><textarea className="input" rows={2} defaultValue="Tham gia phát triển, test và đánh giá các sản phẩm phụ gia trong lab; hỗ trợ kỹ thuật cho khách hàng B2B."></textarea></div>
              <div className="field">
                <label>Trách nhiệm chính</label>
                <textarea className="input" rows={6} defaultValue={"• Pha chế và test mẫu sản phẩm sơn/mực in/nhựa với phụ gia MÜNZING\n• Đo các chỉ tiêu: độ nhớt, độ phủ, độ bóng, đo bọt khí\n• Viết báo cáo test cho khách hàng và nội bộ\n• Hỗ trợ trực tiếp khách hàng tại nhà máy khi cần\n• Cập nhật tài liệu kỹ thuật, COA, MSDS"}></textarea>
              </div>
              <div className="field">
                <label>Yêu cầu</label>
                <textarea className="input" rows={5} defaultValue={"• Tốt nghiệp ĐH chuyên ngành Hóa, Polyme, Vật liệu\n• 1-3 năm kinh nghiệm trong lab sơn/mực in/nhựa\n• Tiếng Anh đọc hiểu tài liệu kỹ thuật\n• Thái độ học hỏi, làm việc nhóm tốt"}></textarea>
              </div>
              <div className="field">
                <label>Quyền lợi</label>
                <textarea className="input" rows={4} defaultValue={"• Lương + thưởng cạnh tranh, review 6 tháng/lần\n• BHXH, BHYT, BHTN đầy đủ\n• Đào tạo chuyên sâu tại MÜNZING (Đức) cho vị trí trọng điểm\n• Du lịch nước ngoài 1 năm/lần"}></textarea>
              </div>
            </FormSection>
          </div>

          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card__head"><h3>Hiển thị</h3></div>
              <div className="card__body">
                <div className="field"><label>Trạng thái</label>
                  <select className="input"><option>Đang tuyển</option><option>Tạm dừng</option><option>Đã đóng</option><option>Nháp</option></select>
                </div>
                <div className="field">
                  <label>Đánh dấu</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" /> 🔥 HOT — Vị trí ưu tiên</label>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" /> Hiển thị ở trang chủ</label>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" defaultChecked /> Cho phép nộp CV online</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__head"><h3>Người tiếp nhận CV</h3></div>
              <div className="card__body">
                <div className="field"><label>HR phụ trách</label>
                  <select className="input"><option>HR — Lê Thị Mai</option></select>
                </div>
                <div className="field"><label>CC tới</label>
                  <input className="input" defaultValue="hr@stromann.vn, lab-manager@stromann.vn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "applicants" && (
        <div className="card">
          <table className="tbl">
            <thead><tr><th>Ứng viên</th><th>Email / SĐT</th><th>Kinh nghiệm</th><th>CV</th><th>Trạng thái</th><th>Ngày nộp</th><th></th></tr></thead>
            <tbody>
              {[
                { name: "Nguyễn Thanh Hà", email: "hanguyen@gmail.com", phone: "0909 111 222", exp: "3 năm — MÜNZING TW", status: "new", date: "29/04/2026" },
                { name: "Trần Minh Tú", email: "tutm@gmail.com", phone: "0911 333 444", exp: "2 năm — Sơn 4 Oranges", status: "in-progress", date: "27/04/2026" },
                { name: "Lê Hoàng An", email: "an.lh@yahoo.com", phone: "0933 555 666", exp: "5 năm — AkzoNobel", status: "in-progress", date: "25/04/2026" },
                { name: "Phạm Thị Nga", email: "nga.pt@gmail.com", phone: "0977 777 888", exp: "Fresh", status: "done", date: "20/04/2026" },
              ].map((a, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFE4E6", color: "var(--brand-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{a.name.split(" ").pop()[0]}</div>
                      <div className="tbl__name">{a.name}</div>
                    </div>
                  </td>
                  <td><div style={{ fontSize: 12 }}>{a.email}</div><div style={{ fontSize: 11, color: "var(--n-500)" }}>{a.phone}</div></td>
                  <td><span style={{ fontSize: 12 }}>{a.exp}</span></td>
                  <td><a style={{ color: "var(--brand-500)", fontSize: 12, fontWeight: 600 }}>📄 CV.pdf</a></td>
                  <td><Pill status={a.status} /></td>
                  <td><span style={{ fontSize: 12 }}>{a.date}</span></td>
                  <td><ActionRow /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ============================================================================
// TECH PROBLEM DETAIL
// ============================================================================

function PageTechDetail({ id, goBack }) {
  const isNew = id === "new";
  const [solutions, setSolutions] = useState([
    { problem: "Pigment kết tụ", solutions: ["Sử dụng dispersant phù hợp", "Điều chỉnh tốc độ khuấy", "Kiểm soát pH hệ"], products: ["EDAPLAN® 470", "DISPERBYK-190"] },
    { problem: "Độ phủ kém", solutions: ["Tăng hàm lượng dispersant", "Tối ưu wetting agent"], products: ["EDAPLAN® 470", "METOLAT® 358"] },
  ]);

  return (
    <>
      <DetailHeader
        breadcrumb="Vấn đề kỹ thuật"
        title={isNew ? "Thêm vấn đề mới" : "Phân tán (Dispersion)"}
        sub="Vấn đề kỹ thuật và các cặp giải pháp ↔ sản phẩm đề xuất"
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu vấn đề KT"); goBack(); }}>Lưu</button>
          </>
        }
      />

      <FormSection title="Thông tin vấn đề chính">
        <div className="field-row">
          <div className="field"><label>Tên vấn đề <span className="req">*</span></label><input className="input" defaultValue="Phân tán (Dispersion)" /></div>
          <div className="field"><label>Icon</label>
            <div style={{ display: "flex", gap: 6 }}>
              {["⚗️","💧","🌀","✨","🎨"].map(e => (
                <button key={e} style={{ width: 36, height: 36, fontSize: 20, border: "1px solid var(--n-300)", borderRadius: 8, ...(e === "⚗️" ? { background: "#FFE4E6", borderColor: "var(--brand-500)" } : { background: "#fff" }) }}>{e}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="field"><label>Mô tả tổng quan</label><textarea className="input" rows={2} defaultValue="Vấn đề liên quan đến độ phân tán của pigment trong hệ sơn, ảnh hưởng đến độ lên màu và tính ổn định công thức."></textarea></div>
      </FormSection>

      <FormSection
        title="Vấn đề con ↔ Giải pháp ↔ Sản phẩm"
        desc="Mỗi cặp 3 yếu tố hiển thị thành 1 block giải pháp trên trang Hỗ trợ kỹ thuật."
      >
        {solutions.map((s, i) => (
          <div key={i} style={{ border: "1px solid var(--n-200)", borderRadius: 12, padding: 16, marginBottom: 12, position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
              <button className="tbl__act">↑</button>
              <button className="tbl__act">↓</button>
              <button className="tbl__act danger" onClick={() => setSolutions(solutions.filter((_, x) => x !== i))}>🗑</button>
            </div>
            <div style={{ display: "inline-block", padding: "2px 8px", background: "var(--brand-500)", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>VẤN ĐỀ #{i + 1}</div>
            <div className="field"><label>Vấn đề con</label><input className="input" defaultValue={s.problem} /></div>
            <div className="field">
              <label>Giải pháp đề xuất (mỗi dòng = 1 giải pháp)</label>
              <textarea className="input" rows={3} defaultValue={s.solutions.join("\n")}></textarea>
            </div>
            <div className="field">
              <label>Sản phẩm đề xuất</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {s.products.map(p => (
                  <span key={p} style={{ padding: "4px 10px", background: "#FFE4E6", color: "var(--brand-700)", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {p} <span style={{ marginLeft: 4, cursor: "pointer" }}>×</span>
                  </span>
                ))}
                <button className="chip" style={{ fontSize: 12 }}>+ Thêm sản phẩm</button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center", border: "1px dashed var(--n-300)" }}
          onClick={() => setSolutions([...solutions, { problem: "Vấn đề mới", solutions: [""], products: [] }])}>
          + Thêm vấn đề con
        </button>
      </FormSection>
    </>
  );
}

// ============================================================================
// INDUSTRY DETAIL — Ngành ứng dụng
// ============================================================================

function PageIndustryDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  const [linkedProducts, setLinkedProducts] = useState(["AGITAN® 120", "EDAPLAN® 470", "METOLAT® 358"]);

  return (
    <>
      <DetailHeader
        breadcrumb="Ngành ứng dụng"
        title={isNew ? "Thêm ngành ứng dụng mới" : "Sơn (Coatings)"}
        sub={isNew ? "Thêm ngành mới — có thể bật/tắt hiển thị bất cứ lúc nào." : "28 sản phẩm · 7 bài viết · Mặc định"}
        badge={!isNew && <Pill status="active" />}
        goBack={goBack}
        actions={
          <>
            {!isNew && <button className="btn btn--secondary">👁 Xem trên website</button>}
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu ngành ứng dụng"); goBack(); }}>{isNew ? "Tạo ngành" : "Lưu thay đổi"}</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Thông tin chung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field"><label>Tên ngành <span className="req">*</span></label>
                <input className="input" defaultValue={lang === "vn" ? "Sơn (Coatings)" : lang === "en" ? "Coatings" : "涂料"} />
              </div>
              <div className="field"><label>Slug URL</label>
                <input className="input" defaultValue="son-coatings" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>stromann.vn/nganh-ung-dung/<b>son-coatings</b></div>
              </div>
            </div>
            <div className="field-row">
              <div className="field"><label>Mã viết tắt</label><input className="input" defaultValue="S" maxLength={2} style={{ width: 80 }} /></div>
              <div className="field"><label>Icon</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {["🎨","🖌","🏭","💧","🧪","✨"].map(e => (
                    <button key={e} style={{ width: 36, height: 36, fontSize: 18, border: "1px solid var(--n-300)", borderRadius: 8, ...(e === "🎨" ? { background: "#FFE4E6", borderColor: "var(--brand-500)" } : { background: "#fff" }) }}>{e}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="field"><label>Mô tả ngắn (hiển thị trên card homepage)</label>
              <textarea className="input" rows={2} defaultValue="Cải thiện độ phân tán, độ trải và độ bền màng sơn"></textarea>
            </div>
            <div className="field"><label>Mô tả tổng quan (trang chi tiết ngành)</label>
              <textarea className="input" rows={5} defaultValue="Stromann cung cấp đầy đủ các phụ gia chuyên dụng cho ngành sơn — từ sơn nước nội ngoại thất, sơn công nghiệp đến sơn gỗ — giúp các nhà sản xuất tối ưu công thức, cải thiện hiệu suất và giảm chi phí sản xuất..."></textarea>
            </div>
          </FormSection>

          <FormSection title="Ảnh đại diện & banner">
            <div className="field">
              <label>Ảnh thumbnail (card homepage, 600×400)</label>
              <div style={{ aspectRatio: "3/2", background: "linear-gradient(135deg, #FFE4E6, #FECACA)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-700)", fontWeight: 700, position: "relative" }}>
                <span>🎨 Sơn</span>
                <button style={{ position: "absolute", top: 8, right: 8, padding: "4px 10px", background: "#fff", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>📷 Đổi ảnh</button>
              </div>
            </div>
            <div className="field">
              <label>Banner trang chi tiết (1920×600)</label>
              <div style={{ aspectRatio: "1920/600", background: "repeating-linear-gradient(45deg, var(--n-100) 0 8px, #fff 8px 16px)", border: "1px dashed var(--n-300)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 13 }}>
                📷 Chọn banner ngành
              </div>
            </div>
          </FormSection>

          <FormSection title="Sản phẩm liên kết" desc="Sản phẩm hiển thị khi khách click vào ngành này.">
            <div style={{ marginBottom: 12 }}>
              {linkedProducts.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, marginBottom: 6 }}>
                  <div className="thumb thumb--brand" style={{ width: 40, height: 40 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>MÜNZING · Defoamer</div>
                  </div>
                  <button className="tbl__act">↑</button>
                  <button className="tbl__act">↓</button>
                  <button className="tbl__act danger" onClick={() => setLinkedProducts(linkedProducts.filter(x => x !== p))}>🗑</button>
                </div>
              ))}
            </div>
            <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center", border: "1px dashed var(--n-300)" }}>
              + Thêm sản phẩm vào ngành
            </button>
            <div style={{ marginTop: 12, padding: 12, background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 8, fontSize: 12, color: "var(--n-700)" }}>
              💡 Sản phẩm cũng có thể tự động liên kết bằng cách gắn ngành này khi sửa từng sản phẩm.
            </div>
          </FormSection>

          <FormSection title="Bài viết liên quan">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "5 lưu ý chọn defoamer cho sơn nước hệ acrylic",
                "Case study: tối ưu công thức sơn xây dựng",
                "Wetting agent: cách chọn đúng cho từng loại pigment",
              ].map(t => (
                <label key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked />
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{t}</div>
                  <span className="pill pill--neutral">Kiến thức KT</span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="Phụ gia ngành Sơn (Coatings) — MÜNZING | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2} defaultValue="Đầy đủ defoamer, dispersant, wetting agent, rheology modifier MÜNZING cho sơn nước, sơn dầu, sơn công nghiệp tại Việt Nam."></textarea></div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Hiển thị</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select className="input" defaultValue="active">
                  <option value="active">Đang hiển thị</option>
                  <option value="hidden">Ẩn (chỉ admin thấy)</option>
                  <option value="draft">Nháp</option>
                </select>
              </div>
              <div className="field">
                <label>Thứ tự</label>
                <input className="input" type="number" defaultValue="1" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>Số nhỏ hơn = hiển thị trước</div>
              </div>
              <div className="field">
                <label>Đánh dấu</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Ngành mặc định (1 trong 3 ngành chính)
                  </label>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Hiển thị trên homepage
                  </label>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Hiển thị trong mega menu
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Màu thương hiệu</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Màu chủ đạo</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["#E11D2C","#1E40AF","#16A34A","#A855F7","#F59E0B","#0EA5E9"].map(c => (
                    <button key={c} style={{ width: 32, height: 32, borderRadius: 6, background: c, border: c === "#E11D2C" ? "3px solid var(--n-900)" : "2px solid #fff", outline: "1px solid var(--n-200)" }}></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body" style={{ padding: 0 }}>
                {[
                  { lbl: "Sản phẩm", val: "28" },
                  { lbl: "Bài viết", val: "7" },
                  { lbl: "Lượt xem 30 ngày", val: "2,431" },
                  { lbl: "Báo giá phát sinh", val: "12" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button className="btn btn--danger" style={{ width: "100%", marginTop: 16, justifyContent: "center", border: "1px solid #FCA5A5", background: "#FEF2F2" }}>
              🗑 Xóa ngành này
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

window.AdminDetailPages = {
  PageProductDetail,
  PageSubmissionDetail,
  PageBannerDetail,
  PageNewsDetail,
  PageJobDetail,
  PageTechDetail,
  PageIndustryDetail,
};
