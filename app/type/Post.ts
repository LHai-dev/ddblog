export interface Post {
  id: number;
  slug: string;
  author: string;
  authorImageUrl: string;
  summary: string;
  createdDate: string;
  thumbnailUrl: string;
  content: string;
  title: string;
  tags?: string[]; // Add this if it's missing
}
