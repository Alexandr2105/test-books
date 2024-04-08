import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryHelper {
  skipHelper = (pageNumber: number, pageSize: number) => {
    return (pageNumber - 1) * pageSize;
  };

  pagesCountHelper = (totalCount: number, pageSize: number) => {
    return Math.ceil(totalCount / pageSize);
  };

  queryCheckHelper = (query: any) => {
    const pageNumber =
      query.pageNumber <= 0 || isNaN(query.pageNumber) ? 1 : +query.pageNumber;
    const pageSize =
      query.pageSize <= 0 || isNaN(query.pageSize) ? 10 : +query.pageSize;
    const sortBy =
      query.sortBy === '' || query.sortBy === undefined
        ? 'yearOfPublishing'
        : query.sortBy;
    const sortDirection =
      query.sortDirection === '' || query.sortDirection === undefined
        ? 'desc'
        : query.sortDirection;
    const searchNameTerm =
      query.searchNameTerm === undefined ? '' : query.searchNameTerm;
    const searchDateTerm =
      query.searchDateTerm === undefined ? null : query.searchDateTerm;

    return {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchNameTerm,
      searchDateTerm,
    };
  };
}
