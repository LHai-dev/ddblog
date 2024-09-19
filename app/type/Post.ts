export interface Post {
  id: number;
  slug: string;
  author: string;
  authorImageUrl: string;
  summary: string;
  createdDate: string;
  thumbnailUrl: string | null; // Assuming thumbnailUrl can be nullable
  content: string;
  title: string;
  views: number;       // New field for view count
  minuteRead: number;  // New field for reading time
}