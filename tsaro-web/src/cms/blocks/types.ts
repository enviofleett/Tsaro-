import { ReactNode } from 'react';

export type BlockVariant = string;

export interface BlockDefinition<T = any> {
  type: string;
  name: string;
  description: string;
  icon?: string | ReactNode;
  variants?: BlockVariant[];
  defaultContent?: T;
  // Zod schema could be added here in the future
  renderComponent: (props: { content: T; allSections?: Record<string, any>[] }) => ReactNode | null;
}

export interface PageSection {
  id: string;
  page_id: string;
  section_type: string;
  content: Record<string, any>;
  sort_order: number;
}
