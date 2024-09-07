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
}
export interface Category{
  id: number;
  slug: string;
  name: string;
}
