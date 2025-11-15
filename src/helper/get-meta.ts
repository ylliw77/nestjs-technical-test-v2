
type PaginationProps = {
    page: number;
    pageSize: number;
    count: number;
}
export const paginationGenerator = ({ page, pageSize, count }: PaginationProps): { page: number, limit: number, total_data: number, total_page: number } => {
    const total_page = Math.ceil(count / (pageSize || 10))

    return {
        page: page,
        limit: pageSize,
        total_data: count,
        total_page: total_page
    }
}