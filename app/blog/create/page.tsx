'use client';

import React, { useState } from 'react';
import { ForwardRefEditor } from '@/components/mdx/ForwardRefEditor';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';

// Function to generate a 9-digit random number
function generateUniqueId() {
  return Math.floor(Math.random() * 1_000_000_000).toString(); // Generates a string representation of a 9-digit number
}

export default function CreateMediumStylePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('LimHai');
  const [authorImageUrl, setAuthorImageUrl] = useState('https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('## Hello world\nThis is an example post.');
  const [isPublishing, setIsPublishing] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [useThumbnailUrl, setUseThumbnailUrl] = useState(true); // Toggle for thumbnail
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const [useImageUrl, setUseImageUrl] = useState(true); // Toggle for author image
  const router = useRouter();

  // Handle form submission and upload images in the same request
  const handleFormSubmit = async (status: string) => {
    setIsPublishing(true);
    const slugBase = slugify(title, { lower: true, strict: true });
    const uniqueId = generateUniqueId(); // Generate a unique numeric ID
    const slug = `${slugBase}-${uniqueId}`; // Concatenate slug with the unique numeric ID
    const createdDate = new Date().toISOString();

    // Create FormData for combining both image files and other form data
    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('createdDate', createdDate);
    formData.append('status', status);

    // Check if user is entering URL or uploading a file for author image
    if (useImageUrl && authorImageUrl) {
      formData.append('authorImageUrl', authorImageUrl);
    } else if (authorImageFile) {
      formData.append('authorImageFile', authorImageFile);
    }

    // Check if user is entering URL or uploading a file for thumbnail
    if (useThumbnailUrl && thumbnailUrl) {
      formData.append('thumbnailUrl', thumbnailUrl); // Only append if not empty
    } else if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile);
    }

    // Debugging to verify form data content
    console.log('FormData entries:', Array.from(formData.entries()));

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post submitted successfully:', data);
        router.push(`/blog/${slug}`);
      } else {
        console.error('Failed to submit post:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="editor-container mx-auto max-w-4xl mt-10 px-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="editor-title w-full text-5xl font-bold outline-none border-b-2 focus:border-black mb-6"
      />

      <input
        type="text"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Short Summary"
        className="editor-summary w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      <input
        hidden
        type="text"
        value={author || 'Lim Hai'}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        className="editor-author w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            checked={useImageUrl}
            onChange={() => setUseImageUrl(true)}
          />
          Use Author Image URL
        </label>
        <label>
          <input
            type="radio"
            checked={!useImageUrl}
            onChange={() => setUseImageUrl(false)}
          />
          Upload Author Image
        </label>
      </div>

      {useImageUrl ? (
        <input
          type="text"
          value={authorImageUrl}
          onChange={(e) => setAuthorImageUrl(e.target.value)}
          placeholder="Author Image URL"
          className="editor-author-image w-full text-lg outline-none border-b-2 focus:border-black mb-6"
        />
      ) : (
        <input
          type="file"
          onChange={(e) => setAuthorImageFile(e.target.files ? e.target.files[0] : null)}
          className="mb-6"
          accept="image/*"
        />
      )}

      {/* Toggle between URL input and file upload for thumbnail image */}
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            checked={useThumbnailUrl}
            onChange={() => setUseThumbnailUrl(true)}
          />
          Use Thumbnail URL
        </label>
        <label>
          <input
            type="radio"
            checked={!useThumbnailUrl}
            onChange={() => setUseThumbnailUrl(false)}
          />
          Upload Thumbnail Image
        </label>
      </div>

      {useThumbnailUrl ? (
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="Thumbnail Image URL"
          className="editor-thumbnail w-full text-lg outline-none border-b-2 focus:border-black mb-6"
        />
      ) : (
        <input
          type="file"
          onChange={(e) => setThumbnailFile(e.target.files ? e.target.files[0] : null)}
          className="mb-6"
          accept="image/*"
        />
      )}

      <div className="editor-content mb-8">
        <ForwardRefEditor
          markdown={content}
          onChange={(mdxContent: string) => setContent(mdxContent)}
          placeholder="Write your story..."
          autoFocus={true}
          suppressHtmlProcessing={true}
        />
      </div>

      <div className="editor-footer flex justify-between items-center">
        <button
          onClick={() => handleFormSubmit('draft')}
          disabled={isPublishing}
          className="btn-secondary"
        >
          {isPublishing ? 'Saving Draft...' : 'Save Draft'}
        </button>

        <button
          onClick={() => handleFormSubmit('published')}
          disabled={isPublishing}
          className="btn-secondary"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
