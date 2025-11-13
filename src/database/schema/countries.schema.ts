import { varchar, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { provinces } from './province.schema';
import { relations } from 'drizzle-orm';

export const countries = paulo.table('countries', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    country_code: varchar('country_code').unique().notNull(),
    country_name: varchar('country_name').notNull(),
    is_deleted: integer().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const countryRelations = relations(countries, ({ many }) => ({
    provinces: many(provinces)
}))

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;