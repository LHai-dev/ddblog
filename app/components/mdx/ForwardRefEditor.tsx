'use client'; // Mark this as a Client Component

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

// Dynamically import the InitializedMDXEditor component, with SSR disabled
const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false, // Disable Server-Side Rendering
});

// Forward reference to the editor instance, if needed
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

// Required for TypeScript to avoid complaints
ForwardRefEditor.displayName = 'ForwardRefEditor';
