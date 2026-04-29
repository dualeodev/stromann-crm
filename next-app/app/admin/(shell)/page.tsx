"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { ACTIVITY, NOTIFICATIONS } from "@/lib/admin/data";
import { showToast } from "@/lib/admin/showToast";

const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const data = [12, 19, 8, 24, 16, 9, 5];
const max = Math.max(...data);

const TOP_PRODUCTS: Array<{ name: string; group: string; views: number }> = [
  { name: "AGITAN® 120",         group: "Defoamer",   views: 1249 },
  { name: "EDAPLAN® 470",        group: "Dispersant", views: 892 },
  { name: "METOLAT® 358",        group: "Wetting",    views: 671 },
  { name: "HYDROPALAT® WE 3475", group: "Rheology",   views: 540 },
];

export default function DashboardPage() {
  useEffect(() => {
    const t = setTimeout(
      () => showToast("Yêu cầu báo giá mới — Cty Sơn Nippon VN"),
      2500,
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Dashboard</span></div>
          <h1>Chào bạn 👋</h1>
          <p>Đây là tổng quan hoạt động website Stromann hôm nay.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn--secondary">Xuất báo cáo</button>
          <button type="button" className="btn btn--primary inline-flex items-center gap-1.5">
            <Plus size={14} /> Thêm nội dung
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat stat--accent">
          <div className="stat__lbl">Yêu cầu mới hôm nay</div>
          <div className="stat__num">12</div>
          <div className="stat__delta inline-flex items-center gap-1"><TrendingUp size={12} /> +4 so với hôm qua</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Tổng sản phẩm</div>
          <div className="stat__num">72</div>
          <div className="stat__delta up inline-flex items-center gap-1"><TrendingUp size={12} /> +3 tuần này</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Lượt truy cập / 7 ngày</div>
          <div className="stat__num">8,432</div>
          <div className="stat__delta up inline-flex items-center gap-1"><TrendingUp size={12} /> +12.4%</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Tỷ lệ chuyển đổi</div>
          <div className="stat__num">3.8%</div>
          <div className="stat__delta down inline-flex items-center gap-1"><TrendingDown size={12} /> -0.3%</div>
        </div>
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card__head">
            <h3>Yêu cầu gửi đến — 7 ngày qua</h3>
            <button type="button" className="btn btn--ghost btn--sm">Tuần này ▾</button>
          </div>
          <div className="card__body">
            <div className="chart">
              {data.map((v, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{ height: (v / max) * 140 + "px" }}
                >
                  <span className="bar__lbl">{days[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-9 text-xs text-n-600">
              <div><b className="text-brand-500">●</b> Báo giá: 38</div>
              <div><b className="text-brand-500">●</b> Tư vấn KT: 24</div>
              <div><b className="text-brand-500">●</b> Liên hệ: 19</div>
              <div><b className="text-brand-500">●</b> Ứng tuyển: 12</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Thông báo gần nhất</h3>
            <Link href="/admin/notifications" className="btn btn--ghost btn--sm inline-flex items-center gap-1">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="card__body p-0">
            {NOTIFICATIONS.slice(0, 4).map((n) => {
              const href = n.target ? `/admin/${n.target.page}/${n.target.id}` : "#";
              const Icon = n.icon;
              return (
                <Link
                  key={n.id}
                  href={href}
                  className={`notif ${n.unread ? "unread" : ""} pl-4 cursor-pointer`}
                >
                  <div className={`notif__icon ${n.type}`}><Icon size={16} strokeWidth={2} /></div>
                  <div className="notif__body">
                    <div className="notif__title">{n.title}</div>
                    <div className="notif__sub">{n.sub}</div>
                    <div className="notif__time">{n.time}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row-2 mt-5">
        <div className="card">
          <div className="card__head">
            <h3>Sản phẩm xem nhiều nhất</h3>
          </div>
          <div className="card__body p-0">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Nhóm</th>
                  <th className="text-right">Lượt xem</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((p) => (
                  <tr key={p.name}>
                    <td className="tbl__name">{p.name}</td>
                    <td>{p.group}</td>
                    <td className="text-right font-bold">
                      {p.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Hoạt động gần đây</h3>
          </div>
          <div className="card__body">
            <div className="activity">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity__row">
                  <span className="activity__dot"></span>
                  <div>
                    <div className="activity__txt">
                      <b>{a.who}</b> {a.what} <b>{a.target}</b>
                    </div>
                    <div className="activity__time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
