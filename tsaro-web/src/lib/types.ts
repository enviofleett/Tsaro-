import type React from 'react';

export interface Page {
  id: string;
  slug: string;
  title: string;
  is_published: boolean;
  is_archived: boolean;
  no_index?: boolean;
  canonical_url?: string;
  social_image?: string;
  created_at: string;
}

export interface PageSection {
  id: string;
  page_id: string;
  section_type: string;
  sort_order: number;
  content: BlockContent;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BlockContent = Record<string, any>;

export interface Template {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: Record<string, any>[];
  created_at: string;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
}

export interface MenuItem {
  id: string;
  menu_id: string;
  parent_id?: string | null;
  page_id?: string | null;
  label: string;
  url?: string | null;
  sort_order: number;
  menus?: { name: string };
  pages?: { slug: string; title: string };
}

export interface SiteSettings {
  id: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>;
}

export interface BlockVariant {
  type: string;
  name: string;
  description: string;
  variants?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderComponent?: (props: { content: Record<string, any>; allSections?: Record<string, any>[] }) => React.ReactNode;
}
