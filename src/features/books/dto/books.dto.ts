import { Transform } from 'class-transformer';
import { IsInt, Length, Max } from 'class-validator';

export class BooksDto {
  @Transform(({ value }) => String(value).trim())
  @Length(3, 100, {
    message: 'Wrong length',
  })
  author: string;

  @Transform(({ value }) => String(value).trim())
  @Length(3, 100, {
    message: 'Wrong length',
  })
  title: string;

  @Max(new Date().getFullYear())
  @IsInt({ message: 'Not a number' })
  yearOfPublishing: number;

  @Transform(({ value }) => String(value).trim())
  @Length(3, 200, {
    message: 'Wrong length',
  })
  shortDescription: string;
}
