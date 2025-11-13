import { varchar, uuid, } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';
import { relations } from 'drizzle-orm';
import { provinces } from './province.schema';

export const cities = paulo.table('cities', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    city_code: varchar('city_code').unique().notNull(),
    city_name: varchar('city_name').notNull(),
    province_id: uuid().references(() => provinces.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    ...default_column
});

export const cityRelations = relations(cities, ({ one }) => ({
    province: one(provinces, {
        references: [provinces.id],
        fields: [cities.province_id]
    })
}))

export type City = typeof cities.$inferSelect;
export type NewCities = typeof cities.$inferInsert;