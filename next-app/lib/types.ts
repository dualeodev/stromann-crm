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
