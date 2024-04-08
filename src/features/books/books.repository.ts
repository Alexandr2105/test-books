import { BooksEntity } from './entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
  ) {}

  async createNewBook(book: BooksEntity): Promise<BooksEntity> {
    return this.booksRepository.save(book);
  }

  async deleteBookById(bookId: number): Promise<void> {
    await this.booksRepository.delete({ id: bookId });
  }

  async updateBooksById(bookId: number, updateInfo: BooksDto): Promise<void> {
    await this.booksRepository.update({ id: bookId }, { ...updateInfo });
  }
}
