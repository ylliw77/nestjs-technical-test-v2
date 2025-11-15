import { integer, timestamp } from "drizzle-orm/pg-core";

export const default_column = {
    is_deleted: integer().default(0),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
}

