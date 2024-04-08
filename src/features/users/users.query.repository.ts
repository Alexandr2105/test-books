import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersCollection: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.usersCollection.findOneBy({ email });
  }
}
