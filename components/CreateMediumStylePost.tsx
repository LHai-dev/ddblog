"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { ForwardRefEditor } from "@/components/mdx/ForwardRefEditor";
import { Category } from "@/app/type/category";



interface FormValues {
  title: string;
  summary: string;
  author: string;
  authorImageUrl: string;
  thumbnailUrl: string;
  content: string;
  categoryId: number;
}

export default function CreateMediumStylePost() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm<FormValues>({
    defaultValues: {
      title: "",
      summary: "",
      author: "Default Author",
      authorImageUrl: "https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd",
      thumbnailUrl: "",
      content: "## Hello world\nThis is an example post.",
      categoryId: 0,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/categories/create-blog');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    const createdDate = new Date().toISOString();
    const slugBase = slugify(data.title, { lower: true, strict: true });
    const slug = `${slugBase}-${Math.floor(Math.random() * 1_000_000_000).toString()}`;

    const requestBody = {
      slug,
      title: data.title,
      summary: data.summary,
      author: data.author,
      content: data.content, // Used to calculate minuteRead
      createdDate,
      status: 'published',
      categoryIds: [data.categoryId], // Wrap categoryId in an array
      authorImageUrl: data.authorImageUrl || undefined,
      thumbnailUrl: data.thumbnailUrl || undefined,
    };
        
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push("/blog/author");
      } else {
        const errorMessage = await response.text();
        setSubmitError(`Failed to submit post: ${errorMessage}`);
      }
    } catch (error) {
      setSubmitError('Error submitting post. Please try again later.');
    }
  };

  return (
    <div className="editor-container mx-auto max-w-4xl mt-10 px-4">
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
            />
            {errors.thumbnailUrl && <p className="text-red-500">{errors.thumbnailUrl.message}</p>}
          </div>
        )}
      />
<Controller
  name="categoryId"
  control={control}
  rules={{ required: 'Category is required' }}
  render={({ field }) => (
    <div className="relative w-72 max-w-full mx-auto m-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <select
        {...field}
        onChange={(e) => field.onChange(Number(e.target.value))} // Cast to number
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

      {/* Submit Error */}
      {submitError && <p className="text-red-500 mb-6">{submitError}</p>}

      {/* Publish Button */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
