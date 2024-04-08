import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './features/users/entities/user.entity';
import { BooksEntity } from './features/books/entities/books.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { settings } from '../settings';
import { UsersController } from './features/users/users.controller';
import { RegistrationUserUseCase } from './features/users/useCases/registration.user.use-case';
import { BcryptService } from './common/bcript/bcript.service';
import { UsersRepository } from './features/users/users.repository';
import { UsersQueryRepository } from './features/users/users.query.repository';
import { CheckEmailInDb } from './features/users/validation/check-email-in-db.service';
import { LocalStrategy } from './common/strategies/local.strategy';
import { CreateAccessTokenUseCase } from './features/users/useCases/create.access.token.use-case';
import { Jwt } from './common/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';
import { BooksController } from './features/books/books.controller';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { CreateNewBookUseCase } from './features/books/useCases/create.new.book.use-case';
import { BooksRepository } from './features/books/books.repository';
import { BooksQueryRepository } from './features/books/books.query.repository';
import { CheckBookId } from './features/books/validation/check.book.id';
import { DeleteCurrentBookUseCase } from './features/books/useCases/delete.current.book.use-case';
import { UpdateCurrentBookUseCase } from './features/books/useCases/update.current.book.use-case';
import { QueryHelper } from './common/helpers/query.helper';

const entities = [UserEntity, BooksEntity];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        ssl: true,
        host: settings.POSTGRES_HOST,
        port: settings.POSTGRES_PORT,
        username: settings.POSTGRES_USERNAME,
        password: settings.POSTGRES_PASSWORD,
        database: settings.POSTGRES_DATABASE,
        entities: [...entities],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({}),
  ],
  controllers: [AppController, UsersController, BooksController],
  providers: [
    AppService,
    RegistrationUserUseCase,
    CreateAccessTokenUseCase,
    DeleteCurrentBookUseCase,
    UpdateCurrentBookUseCase,
    CreateNewBookUseCase,
    BcryptService,
    Jwt,
    UsersRepository,
    UsersQueryRepository,
    BooksRepository,
    BooksQueryRepository,
    CheckEmailInDb,
    LocalStrategy,
    JwtStrategy,
    CheckBookId,
    QueryHelper,
  ],
})
export class AppModule {}
