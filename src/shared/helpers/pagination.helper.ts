import { IPagination } from '@interfaces/pagination.interface';

class PaginationHelper {
  public paginate(data: [any[], number], limit: number | string, page: number | string): IPagination<any> {
    const [rows, count] = data;
    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / Number(limit)),
      itemsPerPage: Number(limit),
      page: Number(page)
    };
  }
}

export default new PaginationHelper();
