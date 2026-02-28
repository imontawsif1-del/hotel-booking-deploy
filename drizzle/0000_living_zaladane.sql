CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`hotel_id` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`total_price` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `hotels` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`price` integer NOT NULL
);
