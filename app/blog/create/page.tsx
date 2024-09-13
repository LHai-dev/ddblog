'use client';

import React, {useState} from 'react';
import {ForwardRefEditor} from '@/components/mdx/ForwardRefEditor';
import {useRouter} from 'next/navigation';
import slugify from 'slugify';
import {auth} from "@/lib/auth"; // Assuming you have a slugify library or use your own logic
import {redirect} from "next/navigation"
export default async function CreateMediumStylePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('LimHai');
  const [authorImageUrl, setAuthorImageUrl] = useState('https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('## Hello world\nThis is an example post.');
  const [isPublishing, setIsPublishing] = useState(false);
  const [thumbnailFile] = useState<File | null>(null);
  const [useThumbnailUrl] = useState(true);
  const [authorImageFile] = useState<File | null>(null);
  const [useImageUrl] = useState(true);
  const router = useRouter();

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1_000_000_000).toString();
  };

  const handleFormSubmit = async (status: string) => {
    setIsPublishing(true);
    const createdDate = new Date().toISOString();

    // Generate the slug from the title
    const slugBase = slugify(title, {lower: true, strict: true});
    const uniqueId = generateUniqueId();
    const slug = `${slugBase}-${uniqueId}`;

    const formData = new FormData();
    formData.append('slug', slug); // Use the generated slug here
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('createdDate', createdDate);
    formData.append('status', status);

    if (useImageUrl && authorImageUrl) {
      formData.append('authorImageUrl', authorImageUrl);
    } else if (authorImageFile) {
      formData.append('authorImageFile', authorImageFile);
    }

    if (useThumbnailUrl && thumbnailUrl) {
      formData.append('thumbnailUrl', thumbnailUrl);
    } else if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile);
    }

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

  const session = await auth();
  if (!session) redirect("/api/auth/signin")
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


      <input
        type="text"
        value={authorImageUrl}
        onChange={(e) => setAuthorImageUrl(e.target.value)}
        placeholder="Author Image URL"
        className="editor-author-image w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />


      <input
        type="text"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        placeholder="Thumbnail Image URL"
        className="editor-thumbnail w-full text-lg outline-none border-b-2 focus:border-black mb-6"
      />

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
        <button onClick={() => handleFormSubmit('draft')} disabled={isPublishing} className="btn-secondary">
          {isPublishing ? 'Saving Draft...' : 'Save Draft'}
        </button>

        <button onClick={() => handleFormSubmit('published')} disabled={isPublishing} className="btn-secondary">
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
