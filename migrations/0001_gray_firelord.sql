CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`password` text NOT NULL,
	`role` text DEFAULT 'user',
	`created_at` text DEFAULT '2025-01-24T01:45:04.485Z'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);