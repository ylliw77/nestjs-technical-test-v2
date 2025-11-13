import { varchar, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';

export const companies = paulo.table('companies', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    company_code: varchar().unique().notNull(),
    company_name: varchar().notNull(),
    ...default_column
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;