'use client';

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
import '@mdxeditor/editor/style.css'; // Import the editor's CSS for proper styling

export default function InitializedMDXEditor({
                                               editorRef,
                                               ...props
                                             }: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <div className="prose prose-lg max-w-none"> {/* Apply typography styles */}
      <MDXEditor
        plugins={[
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
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
                <InsertAdmonition />
                <InsertThematicBreak />
                <InsertTable />
                <InsertImage />
                <InsertCodeBlock />
                <CodeToggle />
                <CreateLink />
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
    </div>
  );
}
