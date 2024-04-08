import { BooksEntity } from '../../features/books/entities/books.entity';

export type QueryBookType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BooksEntity[];
};
