'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

import { Category } from '@/app/type/category';
import { ForwardRefEditor } from '@/components/mdx/ForwardRefEditor';

interface FormValues {
  title: string;
  summary: string;
  author: string;
  authorImageUrl: string;
  thumbnailUrl: string;
  content: string;
  categoryId: number;
}

export default function UpdateBlogPost() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      summary: '',
      author: '',
      authorImageUrl: '',
      thumbnailUrl: '',
      content: '',
      categoryId: 0,
    },
  });

  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setValue('author', sessionData.user?.name || '');
        setValue('authorImageUrl', sessionData.user?.image || '');
      }
    };

    fetchSession();

    if (!slug) {
      setError('Blog post slug is missing');
      setIsLoading(false);
      return;
    }

    const fetchCategoriesAndBlogPost = async () => {
      setIsLoading(true);
      try {
        const [categoriesResponse, blogResponse] = await Promise.all([
          fetch('/api/categories/create-blog'),
          fetch(`/api/blogs/${slug}`),
        ]);

        if (!categoriesResponse.ok || !blogResponse.ok) {
          throw new Error('Failed to load data');
        }

        const categoriesData = await categoriesResponse.json();
        const blogData = await blogResponse.json();

        setCategories(categoriesData.categories || []);
        setValue('title', blogData.title);
        setValue('summary', blogData.summary);
        setValue('thumbnailUrl', blogData.thumbnailUrl);
        setValue('content', blogData.content);
        setValue('categoryId', blogData.categoryId || 0);
      } catch (err) {
        console.error(err);
        setError('Failed to load categories or blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndBlogPost();
  }, [slug, setValue]);

  const onSubmit = async (data: FormValues) => {
    const requestBody = {
      title: data.title,
      summary: data.summary,
      author: data.author,
      content: data.content,
      categoryIds: [data.categoryId],
      authorImageUrl: data.authorImageUrl || undefined,
      thumbnailUrl: data.thumbnailUrl || undefined,
    };

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push(`/blog/${slug}`);
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to update post: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Error updating post. Please try again later.', err);
    }
  };

  return (
    <div className="editor-container mx-auto max-w-4xl mt-10 px-4">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <div className="mb-6">
              <input
                type="text"
                {...field}
                placeholder="Post Title"
                className={`w-full p-3 text-2xl border-b-2 focus:outline-none focus:border-indigo-600 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
            </div>
          )}
        />

        {/* Summary Input */}
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
                className={`w-full p-3 text-lg border-b-2 focus:outline-none focus:border-indigo-600 ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.summary && <p className="text-red-500 mt-1">{errors.summary.message}</p>}
            </div>
          )}
        />

        {/* Thumbnail Input */}
        <Controller
          name="thumbnailUrl"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <input
                type="text"
                {...field}
                placeholder="Thumbnail Image URL"
                className={`w-full p-3 text-lg border-b-2 focus:outline-none focus:border-indigo-600 ${errors.thumbnailUrl ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.thumbnailUrl && <p className="text-red-500">{errors.thumbnailUrl.message}</p>}
            </div>
          )}
        />

        {/* Category Dropdown */}
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <div className="relative w-72 max-w-full mx-auto m-6">
              <select
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className={`w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2 ${errors.categoryId ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading || !!error}
              >
                <option value={0} disabled>Select a category</option>
                {isLoading ? (
                  <option disabled>Loading categories...</option>
                ) : error ? (
                  <option disabled>{error}</option>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
              {errors.categoryId && <p className="text-red-500 mt-1">{errors.categoryId.message}</p>}
            </div>
          )}
        />

        {/* Content Editor */}
        <div className="mb-8">
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
                {errors.content && <p className="text-red-500 mt-1">{errors.content.message}</p>}
              </div>
            )}
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
