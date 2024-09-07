'use client'; // Ensure this is a client component

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
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  InsertAdmonition,
  InsertThematicBreak,
  BlockTypeSelect,
  CreateLink,
  CodeToggle
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export default function InitializedMDXEditor({
                                               editorRef,
                                               ...props
                                             }: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {


  return (
    <MDXEditor
      plugins={[
        // Essential plugins for headings, lists, quotes, code blocks, etc.
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            java: 'Java',
          },
        }),
        tablePlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor], // Enables admonitions
        }),

        // Toolbar plugin with all desired components
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {/* Undo/Redo */}
              <UndoRedo />

              {/* Bold, Italic, Underline toggles */}
              <BoldItalicUnderlineToggles />

              {/* Block Type Select for headings, blockquotes, etc. */}
              <BlockTypeSelect />

              {/* Lists Toggle for bulleted/numbered lists */}
              <ListsToggle />

              {/* Insert Admonitions (note, tip, caution, etc.) */}
              <InsertAdmonition />

              {/* Insert Thematic Break (HR) */}
              <InsertThematicBreak />

              {/* Insert Table */}
              <InsertTable />

              {/* Insert Image */}
              <InsertImage />

              {/* Insert Code Block */}
              <InsertCodeBlock />

              {/* Code Toggle for inline code */}
              <CodeToggle />

              {/* Link Creation */}
              <CreateLink />

              {/* Language Change for Code Block */}
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === 'code-block',
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                ]}
              />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
