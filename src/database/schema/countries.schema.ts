import { varchar, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { provinces } from './province.schema';
import { relations } from 'drizzle-orm';
import { default_column } from '../constants';

export const countries = paulo.table('countries', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    country_code: varchar('country_code').unique().notNull(),
    country_name: varchar('country_name').notNull(),
    ...default_column
});

export const countryRelations = relations(countries, ({ many }) => ({
    provinces: many(provinces)
}))

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;