export type ProductGroup =
  | "DEFOAMER"
  | "DISPERSANT"
  | "WETTING AGENT"
  | "RHEOLOGY"
  | "WAX"
  | "LEVELING";

export interface Product {
  id: string;
  group: ProductGroup;
  name: string;
  desc: string;
  brand: string;
  featured?: boolean;
}

export interface NavProductGroup {
  group: string;
  count: number;
}

export interface Industry {
  id: string;
  code: string;
  title: string;
  swatch: string;
  paint: string;
  finish: string;
  desc: string;
  chips: string[];
  products: number;
}

export interface WhyRow {
  num: string;
  title: string;
  desc: string;
}

export interface NewsItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  read: string;
}

export interface TimelineItem {
  year: string;
  title: string;
}

export interface Stat {
  num: string;
  lbl: string;
}

export interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  salary: string;
  deadline: string;
  tags: string[];
  summary: string;
  hot?: boolean;
}

export interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

export interface CompanyValue {
  num: string;
  title: string;
  desc: string;
}
