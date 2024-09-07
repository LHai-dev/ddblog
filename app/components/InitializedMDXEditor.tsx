'use client'; // Mark this file as a Client Component

import { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  tablePlugin,
  toolbarPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertTable,
  InsertImage,
  ListsToggle,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'; // Import the styles

export default function InitializedMDXEditor({
                                               editorRef,
                                               ...props
                                             }: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        imagePlugin(),
        codeBlockPlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <InsertTable />
              <InsertImage />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
