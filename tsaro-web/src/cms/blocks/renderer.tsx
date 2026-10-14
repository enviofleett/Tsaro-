import React from 'react';
import { blockRegistry } from './registry';
import { PageSection } from './types';

interface PageRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
}

export function PageRenderer({ sections }: PageRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        const blockDef = blockRegistry[section.section_type];
        
        if (!blockDef) {
          return (
            <div key={section.id} className="p-10 border border-dashed border-white/20 m-6 text-textMuted rounded text-center">
              Unsupported Section Type: {section.section_type}
            </div>
          );
        }

        return (
          <React.Fragment key={section.id}>
            {blockDef.renderComponent({ content: section.content, allSections: sections })}
          </React.Fragment>
        );
      })}
    </>
  );
}
