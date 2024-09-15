'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { ForwardRefEditor } from '@/components/mdx/ForwardRefEditor';
import { Session } from 'next-auth';

interface CreateMediumStylePostProps {
  session: Session | null;
}

interface FormValues {
  title: string;
  summary: string;
  author: string;
  authorImageUrl: string;
  thumbnailUrl: string;
  content: string;
}

export default function CreateMediumStylePost({ session }: CreateMediumStylePostProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      summary: '',
      author: session?.user?.name || 'Default Author',
      authorImageUrl: session?.user?.image || 'https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd',
      thumbnailUrl: '',
      content: '## Hello world\nThis is an example post.'
    }
  });

  const router = useRouter();

  const generateUniqueId = () => Math.floor(Math.random() * 1_000_000_000).toString();

  const onSubmit = async (data: FormValues, status: string) => {
    const createdDate = new Date().toISOString();
    const slugBase = slugify(data.title, { lower: true, strict: true });
    const uniqueId = generateUniqueId();
    const slug = `${slugBase}-${uniqueId}`;

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('author', data.author);
    formData.append('content', data.content);
    formData.append('createdDate', createdDate);
    formData.append('status', status);

    if (data.authorImageUrl) {
      formData.append('authorImageUrl', data.authorImageUrl);
    }

    if (data.thumbnailUrl) {
      formData.append('thumbnailUrl', data.thumbnailUrl);
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Post submitted successfully:', result);
        router.push(`/blog/${slug}`);
      } else {
        console.error('Failed to submit post:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="editor-container mx-auto max-w-4xl mt-10 px-4">
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field }) => (
          <div className="mb-6">
            <input
              type="text"
              {...field}
              placeholder="Title"
              className={`editor-title w-full text-5xl font-bold outline-none border-b-2 focus:border-black ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
        )}
      />

      <Controller
        name="summary"
        control={control}
        rules={{ required: 'Summary is required' }}
        render={({ field }) => (
          <div className="mb-6">
            <input
              type="text"
              {...field}
              placeholder="Short Summary"
              className={`editor-summary w-full text-lg outline-none border-b-2 focus:border-black ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
          </div>
        )}
      />

      <Controller
        name="author"
        control={control}
        rules={{ required: 'Author name is required' }}
        render={({ field }) => (
          <div className="mb-6">
            <input
              hidden
              type="text"
              {...field}
              placeholder="Author Name"
              className={`editor-author w-full text-lg outline-none border-b-2 focus:border-black ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
          </div>
        )}
      />

      <Controller
        name="authorImageUrl"
        control={control}
        rules={{ required: 'authorImageUrl name is required' }}
        render={({ field }) => (
          <div className="mb-6">
            <input
              hidden
              type="text"
              {...field}
              placeholder="Author Image URL"
              className={`editor-author-image w-full text-lg outline-none border-b-2 focus:border-black ${errors.authorImageUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.authorImageUrl && <p className="text-red-500">{errors.authorImageUrl.message}</p>}
          </div>
        )}
      />

      <Controller
        name="thumbnailUrl"
        control={control}
        render={({ field }) => (
          <div className="mb-6">
            <input
              type="text"
              {...field}
              placeholder="Thumbnail Image URL"
              className={`editor-thumbnail w-full text-lg outline-none border-b-2 focus:border-black ${errors.thumbnailUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.thumbnailUrl && <p className="text-red-500">{errors.thumbnailUrl.message}</p>}
          </div>
        )}
      />

      <div className="editor-content mb-8">
        <Controller
          name="content"
          control={control}
          rules={{ required: 'Content is required' }}
          render={({ field }) => (
            <div>
              <ForwardRefEditor
                markdown={field.value}
                onChange={(mdxContent: string) => setValue('content', mdxContent)}
                placeholder="Write your story..."
                autoFocus={true}
                suppressHtmlProcessing={true}
              />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>
          )}
        />
      </div>

      <div className="editor-footer flex justify-between items-center">
        {/*<button*/}
        {/*  onClick={() => handleSubmit((data) => onSubmit(data, 'draft'))()}*/}
        {/*  disabled={isSubmitting}*/}
        {/*  className="btn-secondary"*/}
        {/*>*/}
        {/*  {isSubmitting ? 'Saving Draft...' : 'Save Draft'}*/}
        {/*</button>*/}

        <button
          onClick={() => handleSubmit((data) => onSubmit(data, 'published'))()}
          disabled={isSubmitting}
          className="btn-secondary"
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
