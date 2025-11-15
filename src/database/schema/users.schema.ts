import { varchar, uuid, pgSchema } from 'drizzle-orm/pg-core';
import { default_column } from '../constants';

export const paulo = pgSchema("paulo");
export const users = paulo.table('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
  ...default_column
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;