import { varchar, uuid, text } from 'drizzle-orm/pg-core';
import { paulo, users } from './users.schema';
import { default_column } from '../constants';
import { relations } from 'drizzle-orm';
import { roles } from './roles.shema';
import { positions } from './positions.schema';
import { companies } from './companies.schema';
import { countries } from './countries.schema';
import { provinces } from './province.schema';
import { cities } from './cities.schema';
import { departments } from './department.schema';

export const employees = paulo.table('employees', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    employee_name: varchar().notNull(),
    employee_code: varchar().notNull().unique(),
    address: text(),
    email: text(),
    phone_number: varchar(),
    role_id: uuid().references(() => roles.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    company_id: uuid().references(() => companies.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    department_id : uuid().references(() => departments.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    position_id: uuid().references(() => positions.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    user_id: uuid().references(() => users.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    country_id: uuid().references(() => countries.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    province_id: uuid().references(() => provinces.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    city_id: uuid().references(() => cities.id, { onDelete: 'set null', onUpdate: 'cascade' }),
    ...default_column
});

export const employeeRelations = relations(employees, ({ one, many }) => ({
    company: one(companies, {
        references: [companies.id],
        fields: [employees.company_id]
    }),
    role: one(roles, {
        references: [roles.id],
        fields: [employees.role_id]
    }),
    user: one(users, {
        references: [users.id],
        fields: [employees.user_id]
    }),
    country: one(countries, {
        references: [countries.id],
        fields: [employees.country_id]
    }),
    province: one(provinces, {
        references: [provinces.id],
        fields: [employees.country_id]
    }),
    city: one(cities, {
        references: [cities.id],
        fields: [employees.country_id]
    })
}))

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;