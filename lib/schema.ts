import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const hotels = sqliteTable("hotels", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  price: integer("price").notNull(),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  hotelId: integer("hotel_id").notNull(),

  name: text("name").notNull(),
  email: text("email").notNull(),

  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),

  totalPrice: integer("total_price").notNull(),  // 🔥 THIS WAS MISSING
});