import { integer, timestamp } from "drizzle-orm/pg-core";

export const default_column = {
    is_deleted: integer().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}