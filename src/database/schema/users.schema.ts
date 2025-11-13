import { varchar, timestamp, uuid, integer, pgSchema } from 'drizzle-orm/pg-core';

export const paulo = pgSchema("paulo");
export const users = paulo.table('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
  is_deleted: integer().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;