import { IsEmail, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class EmailDto {
  @IsEmail()
  @Transform(({ value }) => value.trim())
  // @Validate(CheckOriginalEmail)
  email: string;
  @Transform(({ value }) => value.trim())
  @Length(6, 20, { message: 'Не верно заполнено поле' })
  password: string;
}
