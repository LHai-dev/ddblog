export interface Post {
  id: number;
  slug: string;
  author: string;
  authorImageUrl: string;
  summary: string;
  createdDate: string;
  thumbnailUrl: string | null;
  content: string;
  title: string;
  views: number; 
  minuteRead: number;
}