'use client'; // Ensure this is a Client Component

import React, { useState } from 'react';
import {ForwardRefEditor} from '@/app/components/mdx/ForwardRefEditor' // Dynamically loaded editor
import slugify from 'slugify';
import { useRouter } from 'next/navigation';

export default function CreateMediumStylePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');
  const [authorImageUrl, setAuthorImageUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('## Hello world This is an example post.'); // MDX content
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter(); // Next.js router

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);

    const slug = slugify(title, { lower: true, strict: true });
    const createdDate = new Date().toISOString();

    const draftPost = {
      slug,
      title,
      summary,
      author,
      authorImageUrl,
      thumbnailUrl,
      content,
      createdDate,
      status: 'draft',
    };

    try {
      const response = await fetch('/api/blogs/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftPost),
      });

      if (response.ok) {
        console.log('Draft saved successfully');
      } else {
        console.error('Failed to save draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    const slug = slugify(title, { lower: true, strict: true });
    const createdDate = new Date().toISOString();

    const publishedPost = {
      slug,
      title,
      summary,
      author,
      authorImageUrl,
      thumbnailUrl,
      content,
      createdDate,
      status: 'published',
    };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publishedPost),
      });

      if (response.ok) {
        console.log('Post published successfully');
        router.push(`/blog/${slug}`); // Redirect to the newly published post
      } else {
        console.error('Failed to publish post');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="editor-container mx-auto max-w-4xl mt-10 px-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="editor-title w-full text-5xl font-bold outline-none border-b-2 focus:border-black mb-6"
      />

      {/* Summary Input */}
      <input
        type="text"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Short Summary"
        className="editor-summary w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      {/* Author Input */}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        className="editor-author w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      {/* Author Image URL Input */}
      <input
        type="text"
        value={authorImageUrl}
        onChange={(e) => setAuthorImageUrl(e.target.value)}
        placeholder="Author Image URL"
        className="editor-author-image w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      {/* Thumbnail URL Input */}
      <input
        type="text"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        placeholder="Thumbnail Image URL"
        className="editor-thumbnail w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      {/* Editor Content */}
      <div className="editor-content mb-8">
        <ForwardRefEditor
          markdown={content}
          onChange={(mdxContent: string) => setContent(mdxContent)}
          placeholder="Write your story..."
          autoFocus={true}  // Keep autofocus
        />
      </div>


      {/* Save/Publish Buttons */}
      <div className="editor-footer flex justify-between items-center">
        <button
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="btn-secondary"
        >
          {isSavingDraft ? 'Saving Draft...' : 'Save Draft'}
        </button>

        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="btn-secondary"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
