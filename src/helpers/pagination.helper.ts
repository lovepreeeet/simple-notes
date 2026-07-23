class PaginationHelper {
    public getOffsetLimit(page = 1, limit = 10) {
        return {
            limit,
            offset: (page - 1) * limit,
        }
    }


    public getMeta(page = 1, limit = 10, totalItems = 0) {
        const totalPages = Math.ceil(totalItems / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {
            currentPage: page,
            limit,
            totalItems,
            totalPages,
            hasNextPage,
            hasPrevPage,
        }
    }
}

export default new PaginationHelper();