// page-home.jsx
const { Tag, Btn, LinkArrow, SectHead, ProductImage, IndustryImage } = window.SUI;
const { INDUSTRIES, WHY_ROWS, PRODUCTS, NEWS, STATS } = window.STROMANN_DATA;

function HomeHero({ variant }) {
  if (variant === "centered") {
    return (
      <div className="hero" style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "100px 80px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <Tag>STROMANN VIỆT NAM</Tag>
          <h1 className="hero__title">Phụ gia hiệu suất cao<br/>cho ngành <em>sơn, mực in và nhựa</em></h1>
          <p className="hero__sub" style={{ textAlign: "center" }}>Giải pháp hóa chất giúp tối ưu công thức, nâng cao chất lượng và đảm bảo độ ổn định trong sản xuất. Đối tác chiến lược của MÜNZING (Đức) tại Việt Nam.</p>
          <div className="hero__ctas">
            <Btn variant="primary" size="lg" as="a" href="#/about">Tìm hiểu về chúng tôi</Btn>
            <Btn variant="secondary" size="lg" as="a" href="#/products" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>Khám phá sản phẩm</Btn>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="hero hero--figma">
      <div className="hero__left">
        <Tag>STROMANN VIỆT NAM</Tag>
        <h1 className="hero__title">Phụ gia hiệu suất cao<br/>cho ngành sơn, mực in và nhựa</h1>
        <p className="hero__sub">Giải pháp hóa chất giúp tối ưu công thức, nâng cao chất lượng và đảm bảo độ ổn định trong sản xuất. Đối tác chiến lược của MÜNZING (Đức) tại Việt Nam.</p>
        <div className="hero__ctas">
          <Btn variant="primary" as="a" href="#/about">TÌM HIỂU VỀ CHÚNG TÔI</Btn>
          <Btn as="a" href="#/products" style={{ background: "transparent", color: "#fff", border: "none", padding: "12px 0" }}>KHÁM PHÁ SẢN PHẨM →</Btn>
        </div>
      </div>
      <div className="hero__right">
        <div className="hero-banner">
          <div className="hero-banner__caption">[ Banner slideshow — admin có thể đổi theo từng chiến dịch ]</div>
        </div>
        <a href="#/contact" className="hero-cta-card">
          <div className="hero-cta-card__icon">▢</div>
          <div>
            <div className="hero-cta-card__title">Tư vấn kỹ thuật miễn phí</div>
            <div className="hero-cta-card__sub">Hotline khẩn: +84 28 36200703</div>
          </div>
          <div className="hero-cta-card__arrow">→</div>
        </a>
      </div>
    </div>
  );
}

function PageHome({ heroVariant }) {
  return (
    <>
      <HomeHero variant={heroVariant} />

      {/* Industries — Paint Chip Catalog */}
      <section className="section section--alt section--swatch">
        <div className="swatch-head">
          <div className="swatch-head__l">
            <div className="swatch-head__eyebrow">
              <span className="swatch-head__sq"></span>
              NGÀNH ỨNG DỤNG · COLOR CATALOG
            </div>
            <h2 className="swatch-head__title">Phụ gia chuyên biệt cho<br/>3 ngành công nghiệp</h2>
          </div>
          <div className="swatch-head__r">
            <div className="swatch-head__meta">
              <span>EDITION</span><b>2026 / VN</b>
            </div>
            <div className="swatch-head__meta">
              <span>SHEETS</span><b>03 / 03</b>
            </div>
          </div>
        </div>

        <div className="swatch-grid">
          {INDUSTRIES.map((ind, i) => (
            <a key={ind.id} href="#/industries" className="swatch-card" style={{ "--sw": ind.swatch }}>
              <div className="swatch-card__chip">
                <div className="swatch-card__paint"></div>
                <div className="swatch-card__brush"></div>
                <div className="swatch-card__drip"><span></span><span></span><span></span></div>
                <div className="swatch-card__index">N° 0{i + 1}</div>
                <div className="swatch-card__paintname">{ind.paint}</div>
              </div>

              <div className="swatch-card__label">
                <div className="swatch-card__row">
                  <div className="swatch-card__code">{ind.code}</div>
                  <div className="swatch-card__finish">{ind.finish}</div>
                </div>
                <h3 className="swatch-card__title">{ind.title}</h3>
                <p className="swatch-card__desc">{ind.desc}</p>

                <div className="swatch-card__hex">
                  <span className="swatch-card__hex-dot"></span>
                  HEX {ind.swatch.toUpperCase()}
                  <span className="swatch-card__hex-sep">·</span>
                  {ind.products} SKU
                </div>

                <div className="swatch-card__chips">
                  {ind.chips.map(c => <span key={c} className="swatch-card__pill">{c}</span>)}
                </div>

                <div className="swatch-card__cta">
                  Mở swatch ngành <span className="swatch-card__arrow">→</span>
                </div>
              </div>

              <div className="swatch-card__perf">— Thử mẫu / yêu cầu báo giá</div>
            </a>
          ))}
        </div>
      </section>

      {/* Why Stromann — Lab spec sheet */}
      <section className="section why-sect">
        <div className="why-spec">
          <div className="why-spec__head">
            <div className="why-spec__eyebrow">
              <span className="why-spec__sq"></span>
              TẠI SAO CHỌN STROMANN · TECHNICAL DOSSIER
            </div>
            <div className="why-spec__doc">DOC · STM-VN-2026 / REV 04</div>
          </div>

          <div className="why-spec__hero">
            <div className="why-spec__title-col">
              <h2 className="why-spec__title">
                Đối tác <em>hóa chất</em><br/>
                đáng tin cậy cho<br/>
                sản xuất công nghiệp.
              </h2>
              <p className="why-spec__lede">
                Hơn 10 năm đồng hành cùng các nhà sản xuất sơn, mực in, nhựa hàng đầu Việt Nam. Phân phối chính hãng các thương hiệu phụ gia chuyên biệt từ <b>MÜNZING (Đức)</b>.
              </p>
              <div style={{ marginTop: 24 }}>
                <Btn variant="dark" as="a" href="#/about">Tìm hiểu thêm về chúng tôi →</Btn>
              </div>
            </div>

            <div className="why-spec__beaker" aria-hidden="true">
              <svg viewBox="0 0 240 320" width="100%" height="100%">
                <defs>
                  <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B5C"/>
                    <stop offset="100%" stopColor="#C8332D"/>
                  </linearGradient>
                  <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="rgba(0,0,0,0.18)"/>
                  </pattern>
                </defs>
                {/* Beaker outline */}
                <path d="M70 40 L70 80 L40 260 Q40 290 70 290 L170 290 Q200 290 200 260 L170 80 L170 40 Z"
                  fill="none" stroke="#0F1115" strokeWidth="3" strokeLinejoin="round"/>
                {/* Liquid */}
                <path d="M62 160 L48 260 Q48 282 70 282 L170 282 Q192 282 192 260 L178 160 Z"
                  fill="url(#liquid)"/>
                {/* Bubbles */}
                <circle cx="90" cy="200" r="6" fill="rgba(255,255,255,0.55)"/>
                <circle cx="130" cy="220" r="4" fill="rgba(255,255,255,0.4)"/>
                <circle cx="155" cy="180" r="5" fill="rgba(255,255,255,0.5)"/>
                <circle cx="105" cy="245" r="3" fill="rgba(255,255,255,0.6)"/>
                {/* Liquid surface highlight */}
                <ellipse cx="120" cy="160" rx="58" ry="4" fill="rgba(255,255,255,0.4)"/>
                {/* Tick marks */}
                <g stroke="#0F1115" strokeWidth="1.5" opacity="0.5">
                  <line x1="170" y1="100" x2="180" y2="100"/>
                  <line x1="170" y1="130" x2="180" y2="130"/>
                  <line x1="170" y1="160" x2="180" y2="160"/>
                  <line x1="170" y1="190" x2="180" y2="190"/>
                  <line x1="170" y1="220" x2="180" y2="220"/>
                </g>
                {/* Top dots overlay */}
                <rect x="40" y="40" width="160" height="120" fill="url(#dots)" opacity="0.6"/>
                {/* Label */}
                <rect x="60" y="200" width="60" height="44" fill="#fff" stroke="#0F1115" strokeWidth="2"/>
                <text x="90" y="220" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0F1115">SAMPLE</text>
                <text x="90" y="234" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" textAnchor="middle" fill="#C8332D">STM-001</text>
              </svg>
            </div>
          </div>

          {/* Big stats row */}
          <div className="why-stats">
            <div className="why-stats__item">
              <div className="why-stats__num">10<sup>+</sup></div>
              <div className="why-stats__lbl">Năm có mặt tại Việt Nam</div>
              <div className="why-stats__bar"><span style={{ width: "85%" }}></span></div>
            </div>
            <div className="why-stats__item">
              <div className="why-stats__num">200<sup>+</sup></div>
              <div className="why-stats__lbl">Khách hàng B2B trên cả nước</div>
              <div className="why-stats__bar"><span style={{ width: "92%" }}></span></div>
            </div>
            <div className="why-stats__item">
              <div className="why-stats__num">24<sub>h</sub></div>
              <div className="why-stats__lbl">Giao hàng tại HCM &amp; Hà Nội</div>
              <div className="why-stats__bar"><span style={{ width: "78%" }}></span></div>
            </div>
            <div className="why-stats__item">
              <div className="why-stats__num">04<sub>h</sub></div>
              <div className="why-stats__lbl">Phản hồi báo giá / yêu cầu mẫu</div>
              <div className="why-stats__bar"><span style={{ width: "98%" }}></span></div>
            </div>
          </div>

          {/* Pillars — annotated rows */}
          <div className="why-pillars">
            {WHY_ROWS.map((r, i) => (
              <div key={r.num} className="why-pillar">
                <div className="why-pillar__head">
                  <span className="why-pillar__num">{r.num}</span>
                  <span className="why-pillar__dot"></span>
                </div>
                <h4 className="why-pillar__title">{r.title}</h4>
                <p className="why-pillar__desc">{r.desc}</p>
                <span className="why-pillar__chk">✓ Verified</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="why-marquee" aria-hidden="true">
          <div className="why-marquee__track">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="why-marquee__group">
                <span>★ MÜNZING DISTRIBUTOR</span>
                <span>· COA &amp; MSDS ON EVERY BATCH ·</span>
                <span>★ ISO 9001 LOGISTICS</span>
                <span>· R&amp;D LAB SUPPORT ·</span>
                <span>★ SAMPLE WITHIN 4H</span>
                <span>· VN-WIDE DELIVERY ·</span>
                <span>★ 200+ B2B CUSTOMERS</span>
                <span>· SINCE 2014 ·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section section--alt">
        <SectHead row eyebrow="SẢN PHẨM" title="Phụ gia chuyên biệt nổi bật"
          right={<a href="#/products" className="link-arrow">Xem tất cả sản phẩm →</a>} />
        <div className="product-grid mt-48">
          {PRODUCTS.filter(p => p.featured).map(p => (
            <a key={p.id} href={`#/products/${p.id}`} className="prod-card">
              <div className="prod-card__media"><ProductImage name={p.name} /></div>
              <div className="prod-card__body">
                <Tag variant="brand">{p.group}</Tag>
                <h3 className="prod-card__name">{p.name}</h3>
                <p className="prod-card__desc">{p.desc}</p>
                <div className="prod-card__foot">
                  <span className="prod-card__cta">Xem chi tiết →</span>
                  <span className="prod-card__compare">+ Compare</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="section">
        <SectHead row eyebrow="TIN TỨC" title="Cập nhật mới từ Stromann"
          right={<a href="#/news" className="link-arrow">Xem tất cả tin →</a>} />
        <div className="news-grid mt-48">
          {NEWS.slice(0, 3).map(n => (
            <a key={n.id} href={`#/news/${n.id}`} className="news-card">
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
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div>
          <h2 className="cta-banner__title">Bạn đang gặp vấn đề trong công thức?</h2>
          <p className="cta-banner__sub">Liên hệ đội ngũ kỹ thuật Stromann để được tư vấn giải pháp phù hợp.</p>
        </div>
        <div className="cta-banner__ctas">
          <Btn variant="white" as="a" href="#/contact">Tư vấn kỹ thuật</Btn>
          <Btn variant="dark" as="a" href="#/quote">Yêu cầu báo giá</Btn>
        </div>
      </section>
    </>
  );
}

window.PageHome = PageHome;
