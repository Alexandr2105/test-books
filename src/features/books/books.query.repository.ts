import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from './entities/books.entity';
import { ILike, Repository } from 'typeorm';
import { QueryHelper } from '../../common/helpers/query.helper';
import { QueryBookType } from '../../common/types/query.book.type';

export class BooksQueryRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    private readonly queryHelper: QueryHelper,
  ) {}

  async getBookById(bookId: number): Promise<BooksEntity> {
    return this.booksRepository.findOneBy({ id: bookId });
  }

  async getAllBooks(queryInfo: any): Promise<QueryBookType> {
    const [sortBooks, totalCount] = await this.booksRepository.findAndCount({
      where: {
        author: ILike(`%${queryInfo.searchNameTerm}%`),
        yearOfPublishing: queryInfo.searchDateTerm,
      },
      order: { [queryInfo.sortBy]: queryInfo.sortDirection },
      skip: this.queryHelper.skipHelper(
        queryInfo.pageNumber,
        queryInfo.pageSize,
      ),
      take: queryInfo.pageSize,
    });
    return {
      pagesCount: this.queryHelper.pagesCountHelper(
        totalCount,
        queryInfo.pageSize,
      ),
      page: queryInfo.pageNumber,
      pageSize: queryInfo.pageSize,
      totalCount: totalCount,
      items: sortBooks,
    };
  }
}
