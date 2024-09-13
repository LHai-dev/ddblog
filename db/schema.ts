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
});
