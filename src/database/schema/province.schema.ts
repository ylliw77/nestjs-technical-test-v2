import { varchar, uuid } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';
import { relations } from 'drizzle-orm';
import { countries } from './countries.schema';
import { cities } from './cities.schema';

export const provinces = paulo.table('provinces', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    province_code: varchar('provinces_code').unique().notNull(),
    province_name: varchar('provinces_name').notNull(),
    country_id: uuid().references(() => countries.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    ...default_column
});

export const provinceRelations = relations(provinces, ({ one, many }) => ({
    country: one(countries, {
        references: [countries.id],
        fields: [provinces.country_id]
    }),
    cities: many(cities)
}))

export type Province = typeof provinces.$inferSelect;
export type NewProvince = typeof provinces.$inferInsert;