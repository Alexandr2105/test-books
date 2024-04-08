import { Transform } from 'class-transformer';
import { IsEmail, Length, Validate } from 'class-validator';
import { CheckEmailInDb } from '../validation/check-email-in-db.service';

export class CreateUserDto {
  @Transform(({ value }) => String(value).trim())
  @Length(3, 30, {
    message: 'Wrong length',
  })
  login: string;

  @IsEmail(
    {
      require_tld: true,
      allow_utf8_local_part: false,
    },
    { message: 'Invalid email' },
  )
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @Validate(CheckEmailInDb, {
    message: 'User with this email is already registered',
  })
  email: string;

  @Transform(({ value }) => String(value).trim())
  @Length(6, 20, {
    message: 'Wrong length',
  })
  password: string;
}
