import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from '../books.repository';
import { BooksQueryRepository } from '../books.query.repository';
import { ForbiddenException } from '@nestjs/common';

export class DeleteCurrentBookCommand {
  constructor(
    public bookId: number,
    public userId: number,
  ) {}
}

@CommandHandler(DeleteCurrentBookCommand)
export class DeleteCurrentBookUseCase
  implements ICommandHandler<DeleteCurrentBookCommand>
{
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly booksQueryRepository: BooksQueryRepository,
  ) {}

  async execute(command: DeleteCurrentBookCommand): Promise<void> {
    const book = await this.booksQueryRepository.getBookById(command.bookId);
    if (book.userId !== command.userId) {
      throw new ForbiddenException();
    }
    await this.booksRepository.deleteBookById(command.bookId);
  }
}
