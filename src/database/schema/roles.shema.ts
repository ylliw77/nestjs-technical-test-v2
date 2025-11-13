import { varchar, uuid } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';
import { positions } from './positions.schema';
import { relations } from 'drizzle-orm';

export const roles = paulo.table('roles', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    role_name: varchar().unique().notNull(),
    role_aliasing: varchar().notNull(),
    ...default_column
});

export const roleRelations = relations(roles, ({ many }) => ({
    positions: many(positions)
}))

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;