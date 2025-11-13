import { varchar, uuid } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';
import { relations } from 'drizzle-orm';
import { roles } from './roles.shema';

export const positions = paulo.table('positions', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    position_name: varchar().unique().notNull(),
    position_alias: varchar('position_code', { length: 30 }).notNull().unique(),
    role_id: uuid().references(() => roles.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    ...default_column
});

export const positionRelations = relations(positions, ({ one, many }) => ({
    role: one(roles, {
        references: [roles.id],
        fields: [positions.role_id]
    })
}))

export type Position = typeof positions.$inferSelect;
export type NewPosition = typeof positions.$inferInsert;