'use client';
import { useEffect, useState } from "react";
import {Post} from "@/app/type/type";


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // Type the blogs state as an array of Blog objects

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data: Post[] = await res.json();  // Ensure TypeScript understands the structure of the data
        console.log('Fetched blogs:', data);  // Log the data to see it in the console
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {posts.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.summary}</p>
          <h1>{blog.slug}</h1>
        </div>
      ))}
    </div>
  );
}
