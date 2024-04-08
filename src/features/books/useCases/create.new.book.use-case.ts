import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BooksDto } from '../dto/books.dto';
import { BooksEntity } from '../entities/books.entity';
import { BooksRepository } from '../books.repository';

export class CreateNewBookCommand {
  constructor(
    public userId: number,
    public body: BooksDto,
  ) {}
}

@CommandHandler(CreateNewBookCommand)
export class CreateNewBookUseCase
  implements ICommandHandler<CreateNewBookCommand>
{
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(command: CreateNewBookCommand): Promise<BooksEntity | false> {
    const newBook = new BooksEntity(
      command.body.author,
      command.body.title,
      command.body.yearOfPublishing,
      command.body.shortDescription,
      command.userId,
    );

    const book = await this.booksRepository.createNewBook(newBook);
    if (book) {
      return book;
    } else {
      return false;
    }
  }
}
