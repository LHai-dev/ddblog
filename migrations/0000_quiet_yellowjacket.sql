CREATE TABLE `blogCategory` (
	`blog_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`author` text NOT NULL,
	`authorImageUrl` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`createdDate` text NOT NULL,
	`thumbnailUrl` text,
	`content` text NOT NULL,
	`views` integer DEFAULT 0,
	`minuteRead` integer
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
