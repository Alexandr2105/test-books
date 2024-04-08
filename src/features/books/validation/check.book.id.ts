import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksQueryRepository } from '../books.query.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckBookId implements ValidatorConstraintInterface {
  constructor(private readonly booksQueryRepository: BooksQueryRepository) {}

  async validate(bookId: string): Promise<boolean> {
    const book = await this.booksQueryRepository.getBookById(+bookId);
    if (!book) {
      throw new NotFoundException();
    } else {
      return true;
    }
  }
}
