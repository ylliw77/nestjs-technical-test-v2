import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { and, eq, ilike, or, sql, SQL } from 'drizzle-orm';
import { PgTable, PgColumn, PgSchema, TableConfig } from 'drizzle-orm/pg-core';


export interface BaseFilterParams {
    search?: string;
    searchFields?: string[];
    page?: number;
    pageSize?: number;
    order_by?: 'asc' | 'desc';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    include_deleted?: boolean;
}

@Injectable()
export abstract class BaseService {
    constructor(protected drizzleService: DrizzleService) { }

    protected buildWhereCondition<T extends PgTable>(
        table: T,
        filters: BaseFilterParams & Record<string, unknown>
    ): SQL | undefined {
        const conditions: SQL[] = []

        if ('is_deleted' in table && filters.include_deleted !== true) {
            const isDeletedColumn = table.is_deleted as PgColumn;
            conditions.push(eq(isDeletedColumn, 0));
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            const skipKeys = ['search', 'page', 'pageSize', 'order_by', 'sortBy', 'sortOrder', 'include_deleted', 'searchFields'];
            if (skipKeys.includes(key)) return;

            if (key in table) {
                const column = table[key as keyof T] as PgColumn;
                conditions.push(eq(column, value));
            }
        });

        if (filters.search && filters.searchFields && filters.searchFields.length > 0) {
            const searchConditions: SQL[] = [];

            filters.searchFields.forEach((field) => {
                if (field in table) {
                    const column = table[field as keyof T] as PgColumn;
                    searchConditions.push(ilike(column, `%${filters.search}%`));
                }
            });

            if (searchConditions.length > 0) {
                conditions.push(or(...searchConditions)!);
            }
        }

        return conditions.length > 0 ? and(...conditions) : undefined;
    }

    protected async getCountData<TConfig extends TableConfig>(
        table: PgTable<TConfig>,
        whereConditions?: SQL
    ): Promise<number> {
        const result = await this.drizzleService.db
            .select({ count: sql<number>`count(*)` })
            .from(table)
            .where(whereConditions);

        return Number(result[0]?.count) || 0;
    }

    protected getSortOrder<T extends PgTable>(
        table: T,
        sortBy: string = 'created_at',
        sortOrder: 'asc' | 'desc' = 'asc'
    ) {
        return (tableRef: T, { asc, desc }: { asc: (col: PgColumn) => SQL, desc: (col: PgColumn) => SQL }) => {
            const fieldKey = (sortBy in table ? sortBy : 'created_at') as keyof T;
            const field = table[fieldKey] as PgColumn;
            return sortOrder === 'desc' ? [desc(field)] : [asc(field)];
        };
    }

    protected calculateOffset(page: number = 1, pageSize: number = 10): number {
        return (page - 1) * pageSize;
    }

    protected buildPagination(page: number, pageSize: number, total: number) {
        return {
            page,
            limit: pageSize,
            total,
            total_page: Math.ceil(total / pageSize)
        };

    }
}