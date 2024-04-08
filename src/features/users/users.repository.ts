import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersCollection: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<void> {
    await this.usersCollection.save(user);
  }
}
