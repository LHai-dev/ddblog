'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import AuthorBlogCard from '@/components/AuthorBlogCard';
import { Post } from '@/app/type/Post';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import BlogListSkeleton from '@/components/BlogListSkeleton';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to show/hide dialog
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null); // Track post slug for deletion
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push('/api/auth/signin');
        } else {
          setSession(session);
        }
      } catch (error) {
        console.error('Error fetching session:', error); // Add detailed logging
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, [router]);
  
  useEffect(() => {
    if (!session) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/blogs/author?author=${session?.user?.name}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching posts:', error);
      }
    };

    fetchPosts();
  }, [session]);

  const handleUpdate = (slug: string) => {
    console.log(`Update post: ${slug}`);
  };

  const confirmDelete = (slug: string) => {
    setSlugToDelete(slug); // Set the slug to delete
    setShowDeleteDialog(true); // Show confirmation dialog
  };

  const handleDelete = async () => {
    if (!slugToDelete) return;

    try {
      const response = await fetch(`/api/blogs/${slugToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Successfully deleted post: ${slugToDelete}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slugToDelete));
        setShowSuccessAlert(true); // Show success alert
        setTimeout(() => setShowSuccessAlert(false), 3000); // Auto-hide alert after 3 seconds
      } else {
        console.error(`Failed to delete post: ${slugToDelete}, Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the post: ${slugToDelete}`, error);
    } finally {
      setShowDeleteDialog(false); // Close the dialog after delete
    }
  };

  if (loading) {
    return <BlogListSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      {showSuccessAlert && (
        <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-green-600 font-semibold">Success</span>
                <p className="text-green-600 mt-1">Post has been deleted successfully.</p>
              </div>
            </div>
            <button onClick={() => setShowSuccessAlert(false)} className="self-start text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <AuthorBlogCard
            key={post.slug}
            session={session}
            post={post}
            onUpdate={() => handleUpdate(post.slug)}
            onDelete={() => confirmDelete(post.slug)} // Trigger dialog before deletion
          />
        ))
      ) : (
        <BlogListSkeleton />
      )}

      <Dialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
            <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <Dialog.Title className="text-lg font-medium text-gray-800">Confirm Delete</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                  Are you sure you want to delete this blog post? This action cannot be undone.
                </Dialog.Description>
                <div className="items-center gap-2 mt-3 text-sm sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleDelete} // Proceed to delete
                  >
                    Delete
                  </button>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
