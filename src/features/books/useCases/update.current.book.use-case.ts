import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from '../books.repository';
import { BooksQueryRepository } from '../books.query.repository';
import { ForbiddenException } from '@nestjs/common';
import { BooksDto } from '../dto/books.dto';

export class UpdateCurrentBookCommand {
  constructor(
    public bookId: number,
    public userId: number,
    public updateInfo: BooksDto,
  ) {}
}

@CommandHandler(UpdateCurrentBookCommand)
export class UpdateCurrentBookUseCase
  implements ICommandHandler<UpdateCurrentBookCommand>
{
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly booksQueryRepository: BooksQueryRepository,
  ) {}

  async execute(command: UpdateCurrentBookCommand): Promise<void> {
    const book = await this.booksQueryRepository.getBookById(command.bookId);
    if (book.userId !== command.userId) {
      throw new ForbiddenException();
    }
    await this.booksRepository.updateBooksById(
      command.bookId,
      command.updateInfo,
    );
  }
}
