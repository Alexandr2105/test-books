import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../users.query.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckEmailInDb implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersQueryRepository) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.usersRepository.getUserByEmail(email);
    return !user;
  }
}
