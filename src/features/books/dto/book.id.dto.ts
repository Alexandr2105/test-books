import { Validate } from 'class-validator';
import { CheckBookId } from '../validation/check.book.id';

export class BookIdDto {
  @Validate(CheckBookId)
  id: string;
}
