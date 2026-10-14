import { BlockDefinition } from './types';

// In a real app, this file would export the default initial content for each block type.
// For now, it's just a placeholder to demonstrate the structure.
export const blockDefaults: Record<string, any> = {
  hero_banner: {
    headline: 'Your Headline Here',
    subheadline: 'Your Subheadline Here',
  },
  text_block: {
    title: 'Section Title',
    body: '<p>Start typing your content here...</p>'
  }
};
