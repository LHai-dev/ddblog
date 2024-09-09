'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

// Dynamically import InitializedMDXEditor, ensuring SSR is disabled
const Editor = dynamic(
  () => import('./InitializedMDXEditor').then((mod) => mod.default || mod),
  { ssr: false }
);

// Forward the ref to the editor instance if needed
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

ForwardRefEditor.displayName = 'ForwardRefEditor';
