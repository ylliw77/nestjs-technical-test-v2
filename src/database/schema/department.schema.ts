import { varchar, uuid } from 'drizzle-orm/pg-core';
import { paulo } from './users.schema';
import { default_column } from '../constants';
import { companies } from './companies.schema';
import { relations } from 'drizzle-orm';

export const departments = paulo.table('departments', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    department_code: varchar().unique().notNull(),
    department_name: varchar().notNull(),
    company_id: uuid().references(() => companies.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    ...default_column
});

export const departmentRelation = relations(departments, ({ one, many }) => ({
    company: one(companies, {
        references: [companies.id],
        fields: [departments.company_id]
    })
}))

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;