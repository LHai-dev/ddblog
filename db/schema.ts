import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const blogs = sqliteTable('blogs', {
  id: integer('id').primaryKey(),
  slug: text('slug').notNull(),
  author: text('author').notNull(),
  authorImageUrl: text('authorImageUrl').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  createdDate: text('createdDate').notNull(),
  thumbnailUrl: text('thumbnailUrl'),
  content: text('content').notNull(),
  views: integer('views').default(0),
  minuteRead: integer('minuteRead'),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const blogCategory = sqliteTable('blogCategory', {
  blog_id: integer('blog_id')
    .references(() => blogs.id, { onDelete: 'cascade' })
    .notNull(),
  category_id: integer('category_id')
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(),
});