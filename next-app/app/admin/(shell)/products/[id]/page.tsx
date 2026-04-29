"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Camera,
  Code,
  Download,
  Eye,
  FolderUp,
  Image as ImageIcon,
  Link2,
  Trash2,
} from "lucide-react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { LangTabs, type Lang } from "@/components/admin/forms/LangTabs";
import { ChipMulti } from "@/components/admin/forms/ChipMulti";
import { Pill } from "@/components/admin/atoms/Pill";
import { showToast } from "@/lib/admin/showToast";

const RTE_TOOLBAR: Array<{ key: string; el: ReactNode }> = [
  { key: "b",   el: <b>B</b> },
  { key: "i",   el: <i>I</i> },
  { key: "u",   el: <u>U</u> },
  { key: "h1",  el: "H1" },
  { key: "h2",  el: "H2" },
  { key: "ul",  el: "•" },
  { key: "ol",  el: "1." },
  { key: "lnk", el: <Link2 size={14} /> },
  { key: "img", el: <ImageIcon size={14} /> },
  { key: "code", el: <Code size={14} /> },
];

type AppMatrix = Record<string, boolean>;

interface DocFile {
  name: string;
  size: string;
  type: string;
  date: string;
}

const INITIAL_MATRIX: AppMatrix = {
  "Sơn nước":   true,
  "Sơn dầu":    false,
  "Sơn bóng":   true,
  "Mực in nước": true,
  "Mực in dầu": false,
  "Nhựa":       false,
  "Masterbatch": false,
};

const INITIAL_DOCS: DocFile[] = [
  { name: "AGITAN-120-MSDS-VN.pdf",  size: "247 KB", type: "MSDS",     date: "20/04/2026" },
  { name: "AGITAN-120-Brochure.pdf", size: "1.2 MB", type: "Brochure", date: "15/04/2026" },
];

const TRANSLATIONS = [
  { lang: "🇻🇳 Tiếng Việt (gốc)", status: "Hoàn chỉnh",   cls: "pill--success" },
  { lang: "🇬🇧 English",          status: "Hoàn chỉnh",   cls: "pill--success" },
  { lang: "🇨🇳 中文",              status: "Thiếu mô tả",  cls: "pill--warn" },
];

const STATS = [
  { lbl: "Lượt xem 30 ngày",  val: "1,249" },
  { lbl: "Yêu cầu báo giá",   val: "23" },
  { lbl: "Tải MSDS",          val: "87" },
  { lbl: "Compare",           val: "14" },
];

export default function ProductDetailAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [lang, setLang]             = useState<Lang>("vn");
  const [industries, setIndustries] = useState<string[]>(["Sơn nước", "Mực in nước"]);
  const [problems, setProblems]     = useState<string[]>(["Bọt"]);
  const [appMatrix, setAppMatrix]   = useState<AppMatrix>(INITIAL_MATRIX);
  const [docs, setDocs]             = useState<DocFile[]>(INITIAL_DOCS);

  const back = () => router.push("/admin/products");

  return (
    <>
      <DetailHeader
        breadcrumb="Sản phẩm"
        backHref="/admin/products"
        title={isNew ? "Thêm sản phẩm mới" : "AGITAN® 120"}
        sub={
          isNew
            ? "Điền đầy đủ thông tin sản phẩm cho cả 3 ngôn ngữ trước khi xuất bản."
            : "Defoamer · MÜNZING · Cập nhật lần cuối 29/04/2026 14:32 bởi Văn A"
        }
        badge={!isNew ? <Pill status="published" /> : undefined}
        actions={
          <>
            {!isNew && (
              <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
                <Download size={14} /> Xuất COA
              </button>
            )}
            {!isNew && (
              <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
                <Eye size={14} /> Xem trên website
              </button>
            )}
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã lưu sản phẩm thành công");
                back();
              }}
            >
              {isNew ? "Tạo & xuất bản" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Thông tin cơ bản">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field">
                <label>Tên sản phẩm <span className="req">*</span></label>
                <input
                  className="input"
                  defaultValue={
                    lang === "vn" ? "AGITAN® 120" : lang === "en" ? "AGITAN® 120" : "AGITAN® 120 消泡剂"
                  }
                />
              </div>
              <div className="field">
                <label>Slug URL</label>
                <input className="input" defaultValue="agitan-120" />
                <div className="text-[11px] text-n-500">stromann.vn/san-pham/<b>agitan-120</b></div>
              </div>
            </div>
            <div className="field">
              <label>Mô tả ngắn (hiển thị trên card listing)</label>
              <textarea
                className="input"
                rows={2}
                defaultValue={
                  lang === "vn"
                    ? "Defoamer hiệu suất cao cho hệ sơn nước và mực in gốc nước. Khử bọt nhanh, không làm ảnh hưởng độ bóng."
                    : lang === "en"
                    ? "High-performance defoamer for waterborne coatings and inks. Fast knockdown, no gloss reduction."
                    : "用于水性涂料和墨水的高性能消泡剂。快速消泡,不影响光泽度。"
                }
              />
            </div>
            <div className="field">
              <label>Mô tả chi tiết</label>
              <div className="border border-n-300 rounded-lg overflow-hidden">
                <div className="p-1.5 bg-n-50 border-b border-n-200 flex gap-0.5 items-center">
                  {RTE_TOOLBAR.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      className="px-2 py-1 text-xs font-semibold text-n-700 rounded inline-flex items-center"
                    >
                      {t.el}
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full border-none p-3 min-h-[120px] text-[13px] outline-none resize-y"
                  defaultValue="AGITAN® 120 là defoamer dạng nhũ tương dầu khoáng, được phát triển cho các hệ sơn nước có hàm lượng pigment cao. Sản phẩm hoạt động hiệu quả ngay cả ở liều thấp 0.1-0.5%, giúp loại bỏ bọt khí phát sinh trong quá trình khuấy trộn và thi công..."
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Phân loại & gắn tag">
            <div className="field-row-3">
              <div className="field">
                <label>Nhóm chức năng <span className="req">*</span></label>
                <select className="input" defaultValue="Defoamer">
                  <option>Defoamer</option>
                  <option>Dispersant</option>
                  <option>Wetting Agent</option>
                  <option>Rheology Modifier</option>
                  <option>Wax Additive</option>
                </select>
              </div>
              <div className="field">
                <label>Thương hiệu</label>
                <select className="input" defaultValue="MÜNZING">
                  <option>MÜNZING</option>
                  <option>AddWorks</option>
                </select>
              </div>
              <div className="field">
                <label>Khu vực có hiệu lực</label>
                <select className="input" defaultValue="Asia/Oceania">
                  <option>EMEA · Americas · Asia/Oceania</option>
                  <option>EMEA</option>
                  <option>Americas</option>
                  <option>Asia/Oceania</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Ngành ứng dụng</label>
              <ChipMulti
                options={["Sơn nước", "Sơn dầu", "Sơn bóng", "Mực in nước", "Mực in dầu", "Nhựa", "Masterbatch", "Keo dán"]}
                selected={industries}
                onChange={setIndustries}
              />
            </div>
            <div className="field">
              <label>Vấn đề kỹ thuật giải quyết</label>
              <ChipMulti
                options={["Bọt", "Phân tán", "Độ nhớt", "Bề mặt", "Lên màu", "Lưu biến", "Thấm ướt"]}
                selected={problems}
                onChange={setProblems}
              />
            </div>
          </FormSection>

          <FormSection
            title="Bảng ứng dụng"
            desc="Tích chọn các ô loại sản phẩm cuối phù hợp — hiển thị thành matrix trên trang chi tiết."
          >
            <table className="tbl border border-n-200 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-n-50">Loại sản phẩm cuối</th>
                  <th className="bg-n-50 text-center w-[100px]">Phù hợp</th>
                  <th className="bg-n-50 w-[200px]">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(appMatrix).map((k) => (
                  <tr key={k}>
                    <td className="tbl__name">{k}</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={appMatrix[k]}
                        onChange={(e) =>
                          setAppMatrix({ ...appMatrix, [k]: e.target.checked })
                        }
                        className="w-[18px] h-[18px]"
                      />
                    </td>
                    <td>
                      <input
                        className="input px-2 py-1 text-xs"
                        placeholder="Liều dùng / lưu ý..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FormSection>

          <FormSection title="Tài liệu" desc="MSDS · Brochure · COA. Bỏ TDS theo yêu cầu.">
            <div className="mb-3">
              {docs.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 border border-n-200 rounded-lg mb-2"
                >
                  <div className="w-9 h-11 bg-[#FEE2E2] text-[#DC2626] rounded flex items-center justify-center font-bold text-[10px]">
                    PDF
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[13px]">{d.name}</div>
                    <div className="text-[11px] text-n-500">
                      {d.type} · {d.size} · Tải lên {d.date}
                    </div>
                  </div>
                  <span className="pill pill--info">{d.type}</span>
                  <button type="button" className="tbl__act" title="Tải xuống" aria-label="Tải xuống">
                    <Download size={14} strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    className="tbl__act danger"
                    title="Xóa"
                    aria-label="Xóa"
                    onClick={() => setDocs(docs.filter((_, x) => x !== i))}
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-2 border-dashed border-n-300 rounded-lg p-6 text-center text-n-500 text-[13px]">
              <FolderUp size={20} className="inline mr-2 -mt-0.5" />
              Kéo thả file PDF vào đây hoặc{" "}
              <a className="text-brand-500 font-semibold cursor-pointer">chọn từ máy</a>
              <div className="text-[11px] mt-1">Tối đa 10MB · Hỗ trợ PDF</div>
            </div>
          </FormSection>

          <FormSection
            title="Sản phẩm tương tự"
            desc="Hiển thị ở cuối trang chi tiết. Để trống = tự đề xuất theo nhóm + ngành."
          >
            <div className="grid grid-cols-2 gap-2">
              {["EDAPLAN® 470", "METOLAT® 358", "AGITAN® 282", "TAFIGEL® PUR 80"].map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-2 p-2.5 border border-n-200 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={["EDAPLAN® 470", "AGITAN® 282"].includes(p)}
                  />
                  <div className="thumb thumb--brand w-8 h-8"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs">{p}</div>
                    <div className="text-[11px] text-n-500">MÜNZING</div>
                  </div>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field">
              <label>Meta title</label>
              <input
                className="input"
                defaultValue="AGITAN® 120 — Defoamer cho sơn nước | Stromann VN"
              />
            </div>
            <div className="field">
              <label>Meta description</label>
              <textarea
                className="input"
                rows={2}
                defaultValue="Defoamer hiệu suất cao MÜNZING AGITAN® 120 — khử bọt nhanh trong sơn nước, mực in. Liên hệ Stromann để nhận mẫu thử và báo giá."
              />
            </div>
            <div className="field">
              <label>OG image (1200×630)</label>
              <div className="border-2 border-dashed border-n-300 rounded-lg p-4 text-center text-xs text-n-500 inline-flex items-center justify-center gap-1.5 w-full">
                <Camera size={14} /> Chọn ảnh OG
              </div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card mb-4">
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
                <div
                  className="border border-n-200 rounded-lg flex items-center justify-center gap-1.5 text-n-500 text-xs"
                  style={{
                    aspectRatio: "1",
                    background:
                      "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)",
                  }}
                >
                  <Camera size={14} /> Chọn ảnh chính
                </div>
              </div>
              <div className="field">
                <label>Ảnh phụ (gallery)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-n-100 rounded-md flex items-center justify-center text-n-400 text-[11px] border border-dashed border-n-300"
                      style={{ aspectRatio: "1" }}
                    >
                      +
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card__head"><h3>Trạng thái dịch</h3></div>
            <div className="card__body p-0">
              {TRANSLATIONS.map((t, i) => (
                <div
                  key={i}
                  className={
                    "flex items-center px-4 py-3 " + (i ? "border-t border-n-100" : "")
                  }
                >
                  <div className="flex-1 text-xs">{t.lang}</div>
                  <span className={`pill ${t.cls}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className={
                      "flex justify-between py-2 " +
                      (i ? "border-t border-n-100" : "")
                    }
                  >
                    <span className="text-xs text-n-600">{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button
              type="button"
              className="btn btn--danger w-full mt-4 justify-center inline-flex items-center gap-1.5"
              style={{ border: "1px solid #FCA5A5", background: "#FEF2F2" }}
            >
              <Trash2 size={14} /> Xóa sản phẩm này
            </button>
          )}
        </div>
      </div>
    </>
  );
}
