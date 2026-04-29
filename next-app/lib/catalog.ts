import { createClient } from "@/lib/supabase/server";

export const PRODUCT_BUCKET = "product-images";
export const PRODUCT_DOC_BUCKET = "product-documents";
export const INDUSTRY_BUCKET = "industry-images";
export const CATEGORY_BUCKET = "category-icons";

export type ProductStatus = "published" | "draft" | "scheduled";

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  region: string | null;
  short_description: string | null;
  detailed_description: string | null;
  status: ProductStatus;
  published_at: string | null;
  is_enabled: boolean;
  is_featured: boolean;
  sort_order: number;
  main_image_path: string | null;
  gallery_paths: string[];
  documents: ProductDoc[];
  meta_title: string | null;
  meta_description: string | null;
  og_image_path: string | null;
  lang_vn: boolean;
  lang_en: boolean;
  lang_cn: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductDoc {
  label: string;
  url: string;
  kind: "msds" | "brochure" | "coa" | "tds" | "other";
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_path: string | null;
  is_enabled: boolean;
  show_in_mega_menu: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  lang_vn: boolean;
  lang_en: boolean;
  lang_cn: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductIndustryRow {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  hex_color: string | null;
  short_description: string | null;
  overview_description: string | null;
  thumbnail_path: string | null;
  banner_path: string | null;
  is_enabled: boolean;
  show_on_homepage: boolean;
  show_in_mega_menu: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  lang_vn: boolean;
  lang_en: boolean;
  lang_cn: boolean;
  created_at: string;
  updated_at: string;
}

export interface TechIssueRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_enabled: boolean;
  show_in_mega_menu: boolean;
  sort_order: number;
  lang_vn: boolean;
  lang_en: boolean;
  lang_cn: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithRelations extends ProductRow {
  categories: CategoryRow[];
  industries: ProductIndustryRow[];
  technical_issues: TechIssueRow[];
}

export function publicAssetUrl(bucket: string, path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

// ── Categories ────────────────────────────────────────────────────────────
export async function listCategories(opts: { enabledOnly?: boolean } = {}): Promise<CategoryRow[]> {
  const supabase = await createClient();
  let q = supabase.from("categories").select("*").order("sort_order", { ascending: true });
  if (opts.enabledOnly) q = q.eq("is_enabled", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as CategoryRow[];
}

export async function listCategoriesPaged(opts: {
  page: number;
  pageSize: number;
}): Promise<{ rows: CategoryRow[]; total: number }> {
  const supabase = await createClient();
  const from = (opts.page - 1) * opts.pageSize;
  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(from, from + opts.pageSize - 1);
  if (error) throw error;
  return { rows: (data ?? []) as CategoryRow[], total: count ?? 0 };
}

export async function getCategory(id: string): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as CategoryRow | null) ?? null;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as CategoryRow | null) ?? null;
}

// ── Product industries ────────────────────────────────────────────────────
export async function listProductIndustries(opts: {
  enabledOnly?: boolean;
  inMegaMenuOnly?: boolean;
} = {}): Promise<ProductIndustryRow[]> {
  const supabase = await createClient();
  let q = supabase.from("product_industries").select("*").order("sort_order", { ascending: true });
  if (opts.enabledOnly) q = q.eq("is_enabled", true);
  if (opts.inMegaMenuOnly) q = q.eq("show_in_mega_menu", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as ProductIndustryRow[];
}

export async function listProductIndustriesPaged(opts: {
  page: number;
  pageSize: number;
}): Promise<{ rows: ProductIndustryRow[]; total: number }> {
  const supabase = await createClient();
  const from = (opts.page - 1) * opts.pageSize;
  const { data, error, count } = await supabase
    .from("product_industries")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(from, from + opts.pageSize - 1);
  if (error) throw error;
  return { rows: (data ?? []) as ProductIndustryRow[], total: count ?? 0 };
}

export async function getProductIndustry(id: string): Promise<ProductIndustryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_industries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as ProductIndustryRow | null) ?? null;
}

export async function getProductIndustryBySlug(slug: string): Promise<ProductIndustryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_industries")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as ProductIndustryRow | null) ?? null;
}

// ── Technical issues ──────────────────────────────────────────────────────
export async function listTechnicalIssues(opts: {
  enabledOnly?: boolean;
  inMegaMenuOnly?: boolean;
} = {}): Promise<TechIssueRow[]> {
  const supabase = await createClient();
  let q = supabase.from("technical_issues").select("*").order("sort_order", { ascending: true });
  if (opts.enabledOnly) q = q.eq("is_enabled", true);
  if (opts.inMegaMenuOnly) q = q.eq("show_in_mega_menu", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as TechIssueRow[];
}

export async function listTechnicalIssuesPaged(opts: {
  page: number;
  pageSize: number;
}): Promise<{ rows: TechIssueRow[]; total: number }> {
  const supabase = await createClient();
  const from = (opts.page - 1) * opts.pageSize;
  const { data, error, count } = await supabase
    .from("technical_issues")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(from, from + opts.pageSize - 1);
  if (error) throw error;
  return { rows: (data ?? []) as TechIssueRow[], total: count ?? 0 };
}

export async function getTechnicalIssue(id: string): Promise<TechIssueRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("technical_issues")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as TechIssueRow | null) ?? null;
}

// ── Products ──────────────────────────────────────────────────────────────
export interface ListProductsFilter {
  search?: string;
  status?: ProductStatus | "all";
  categorySlugs?: string[];
  industrySlugs?: string[];
  techSlugs?: string[];
  brands?: string[];
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  sort?: "newest" | "az" | "za" | "popular";
  page?: number;
  pageSize?: number;
}

export interface ListProductsResult {
  rows: ProductRow[];
  total: number;
  page: number;
  pageSize: number;
}

export async function listProducts(filter: ListProductsFilter = {}): Promise<ListProductsResult> {
  const supabase = await createClient();
  const page = filter.page ?? 1;
  const pageSize = filter.pageSize ?? 24;

  // Resolve slug filters → ids first (subqueries via RLS-aware client).
  const linkedIds = await resolveProductIdsByLinkedSlugs(filter);

  let q = supabase.from("products").select("*", { count: "exact" });

  if (filter.publishedOnly) {
    q = q.eq("is_enabled", true).eq("status", "published");
  } else if (filter.status && filter.status !== "all") {
    q = q.eq("status", filter.status);
  }
  if (filter.featuredOnly) q = q.eq("is_featured", true);
  if (filter.brands?.length) q = q.in("brand", filter.brands);
  if (filter.search) q = q.ilike("name", `%${filter.search}%`);
  if (linkedIds !== null) {
    if (linkedIds.length === 0) {
      return { rows: [], total: 0, page, pageSize };
    }
    q = q.in("id", linkedIds);
  }

  switch (filter.sort) {
    case "az":
      q = q.order("name", { ascending: true });
      break;
    case "za":
      q = q.order("name", { ascending: false });
      break;
    case "popular":
      q = q.order("is_featured", { ascending: false }).order("sort_order", { ascending: true });
      break;
    case "newest":
    default:
      q = q.order("created_at", { ascending: false });
      break;
  }

  const from = (page - 1) * pageSize;
  q = q.range(from, from + pageSize - 1);

  const { data, error, count } = await q;
  if (error) throw error;
  return {
    rows: (data ?? []) as ProductRow[],
    total: count ?? 0,
    page,
    pageSize,
  };
}

async function resolveProductIdsByLinkedSlugs(filter: ListProductsFilter): Promise<string[] | null> {
  const hasFilter =
    (filter.categorySlugs?.length ?? 0) > 0 ||
    (filter.industrySlugs?.length ?? 0) > 0 ||
    (filter.techSlugs?.length ?? 0) > 0;
  if (!hasFilter) return null;

  const supabase = await createClient();
  const sets: Set<string>[] = [];

  if (filter.categorySlugs?.length) {
    const { data: cats } = await supabase
      .from("categories")
      .select("id")
      .in("slug", filter.categorySlugs);
    const ids = (cats ?? []).map((c) => c.id);
    const { data: links } = await supabase
      .from("product_categories")
      .select("product_id")
      .in("category_id", ids);
    sets.push(new Set((links ?? []).map((l) => l.product_id)));
  }
  if (filter.industrySlugs?.length) {
    const { data: inds } = await supabase
      .from("product_industries")
      .select("id")
      .in("slug", filter.industrySlugs);
    const ids = (inds ?? []).map((i) => i.id);
    const { data: links } = await supabase
      .from("product_industry_links")
      .select("product_id")
      .in("product_industry_id", ids);
    sets.push(new Set((links ?? []).map((l) => l.product_id)));
  }
  if (filter.techSlugs?.length) {
    const { data: techs } = await supabase
      .from("technical_issues")
      .select("id")
      .in("slug", filter.techSlugs);
    const ids = (techs ?? []).map((t) => t.id);
    const { data: links } = await supabase
      .from("product_technical_issues")
      .select("product_id")
      .in("technical_issue_id", ids);
    sets.push(new Set((links ?? []).map((l) => l.product_id)));
  }

  // Intersection (a product must match every active filter dimension).
  if (sets.length === 0) return [];
  let acc = sets[0];
  for (let i = 1; i < sets.length; i += 1) {
    acc = new Set([...acc].filter((x) => sets[i].has(x)));
  }
  return [...acc];
}

export async function getProduct(id: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as ProductRow | null) ?? null;
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as ProductRow | null) ?? null;
}

export async function getProductWithRelations(id: string): Promise<ProductWithRelations | null> {
  const product = await getProduct(id);
  if (!product) return null;
  return attachRelations(product);
}

export async function getProductWithRelationsBySlug(
  slug: string,
): Promise<ProductWithRelations | null> {
  const product = await getProductBySlug(slug);
  if (!product) return null;
  return attachRelations(product);
}

async function attachRelations(product: ProductRow): Promise<ProductWithRelations> {
  const supabase = await createClient();
  const [{ data: cats }, { data: inds }, { data: techs }] = await Promise.all([
    supabase
      .from("product_categories")
      .select("category:categories(*)")
      .eq("product_id", product.id),
    supabase
      .from("product_industry_links")
      .select("industry:product_industries(*)")
      .eq("product_id", product.id),
    supabase
      .from("product_technical_issues")
      .select("issue:technical_issues(*)")
      .eq("product_id", product.id),
  ]);

  return {
    ...product,
    categories: (cats ?? []).map((r) => r.category as unknown as CategoryRow),
    industries: (inds ?? []).map((r) => r.industry as unknown as ProductIndustryRow),
    technical_issues: (techs ?? []).map((r) => r.issue as unknown as TechIssueRow),
  };
}

export async function listProductIdsForCategory(categoryId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("product_id")
    .eq("category_id", categoryId);
  if (error) throw error;
  return (data ?? []).map((r) => r.product_id);
}

export async function listProductIdsForIndustry(industryId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_industry_links")
    .select("product_id")
    .eq("product_industry_id", industryId);
  if (error) throw error;
  return (data ?? []).map((r) => r.product_id);
}

export async function listProductIdsForTechIssue(techId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_technical_issues")
    .select("product_id")
    .eq("technical_issue_id", techId);
  if (error) throw error;
  return (data ?? []).map((r) => r.product_id);
}

// ── Mutation helpers (called from server actions) ────────────────────────
export async function setProductCategories(productId: string, categoryIds: string[]): Promise<void> {
  const supabase = await createClient();
  const { error: delErr } = await supabase
    .from("product_categories")
    .delete()
    .eq("product_id", productId);
  if (delErr) throw delErr;
  if (categoryIds.length === 0) return;
  const rows = categoryIds.map((category_id) => ({ product_id: productId, category_id }));
  const { error: insErr } = await supabase.from("product_categories").insert(rows);
  if (insErr) throw insErr;
}

export async function setProductIndustries(productId: string, industryIds: string[]): Promise<void> {
  const supabase = await createClient();
  const { error: delErr } = await supabase
    .from("product_industry_links")
    .delete()
    .eq("product_id", productId);
  if (delErr) throw delErr;
  if (industryIds.length === 0) return;
  const rows = industryIds.map((product_industry_id) => ({
    product_id: productId,
    product_industry_id,
  }));
  const { error: insErr } = await supabase.from("product_industry_links").insert(rows);
  if (insErr) throw insErr;
}

export async function setProductTechnicalIssues(
  productId: string,
  issueIds: string[],
): Promise<void> {
  const supabase = await createClient();
  const { error: delErr } = await supabase
    .from("product_technical_issues")
    .delete()
    .eq("product_id", productId);
  if (delErr) throw delErr;
  if (issueIds.length === 0) return;
  const rows = issueIds.map((technical_issue_id) => ({
    product_id: productId,
    technical_issue_id,
  }));
  const { error: insErr } = await supabase.from("product_technical_issues").insert(rows);
  if (insErr) throw insErr;
}

// Counts useful for the public filter rail / admin pills.
export async function countProductsPerIndustry(): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_industry_links").select("product_industry_id");
  if (error) throw error;
  return tally((data ?? []).map((r) => r.product_industry_id));
}

export async function countProductsPerCategory(): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_categories").select("category_id");
  if (error) throw error;
  return tally((data ?? []).map((r) => r.category_id));
}

export async function listProductBrands(opts: { publishedOnly?: boolean } = {}): Promise<
  Array<{ brand: string; count: number }>
> {
  const supabase = await createClient();
  let q = supabase.from("products").select("brand");
  if (opts.publishedOnly) q = q.eq("is_enabled", true).eq("status", "published");
  const { data, error } = await q;
  if (error) throw error;
  const counts = new Map<string, number>();
  (data ?? []).forEach((r) => {
    const b = (r as { brand: string | null }).brand?.trim();
    if (!b) return;
    counts.set(b, (counts.get(b) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
}

export async function countProductsPerTechIssue(): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_technical_issues").select("technical_issue_id");
  if (error) throw error;
  return tally((data ?? []).map((r) => r.technical_issue_id));
}

function tally(ids: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  ids.forEach((id) => {
    out[id] = (out[id] ?? 0) + 1;
  });
  return out;
}

// ── Admin nav counts ─────────────────────────────────────────────────────
export interface AdminNavCounts {
  products: number;
  categories: number;
  industries: number;
  tech: number;
}

export async function getAdminNavCounts(): Promise<AdminNavCounts> {
  const supabase = await createClient();
  const [products, categories, industries, tech] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("product_industries").select("*", { count: "exact", head: true }),
    supabase.from("technical_issues").select("*", { count: "exact", head: true }),
  ]);
  return {
    products: products.count ?? 0,
    categories: categories.count ?? 0,
    industries: industries.count ?? 0,
    tech: tech.count ?? 0,
  };
}

// ── Composite helpers for the public site ────────────────────────────────
export interface MegaMenuLinkRow {
  slug: string;
  name: string;
  count?: number;
}

export interface MegaFeaturedRow {
  slug: string;
  name: string;
  short_description: string | null;
}

export interface MegaMenuPayload {
  categories: MegaMenuLinkRow[];
  industries: MegaMenuLinkRow[];
  issues: MegaMenuLinkRow[];
  featured: MegaFeaturedRow | null;
}

export async function getMegaMenuData(): Promise<MegaMenuPayload> {
  const supabase = await createClient();
  const [
    { data: cats },
    { data: inds },
    { data: techs },
    catCounts,
    indCounts,
    techCounts,
    { data: featured },
  ] = await Promise.all([
    supabase
      .from("categories")
      .select("id, slug, name")
      .eq("is_enabled", true)
      .eq("show_in_mega_menu", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("product_industries")
      .select("id, slug, name")
      .eq("is_enabled", true)
      .eq("show_in_mega_menu", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("technical_issues")
      .select("id, slug, name")
      .eq("is_enabled", true)
      .eq("show_in_mega_menu", true)
      .order("sort_order", { ascending: true }),
    countProductsPerCategory(),
    countProductsPerIndustry(),
    countProductsPerTechIssue(),
    supabase
      .from("products")
      .select("slug, name, short_description")
      .eq("is_enabled", true)
      .eq("status", "published")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const toLinks = (
    rows: Array<{ id: string; slug: string; name: string }> | null,
    counts: Record<string, number>,
  ): MegaMenuLinkRow[] =>
    (rows ?? []).map((r) => ({ slug: r.slug, name: r.name, count: counts[r.id] ?? 0 }));

  return {
    categories: toLinks(cats, catCounts),
    industries: toLinks(inds, indCounts),
    issues: toLinks(techs, techCounts),
    featured: featured
      ? {
          slug: (featured as { slug: string }).slug,
          name: (featured as { name: string }).name,
          short_description: (featured as { short_description: string | null }).short_description,
        }
      : null,
  };
}
