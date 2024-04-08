import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { BooksDto } from './dto/books.dto';
import { BooksEntity } from './entities/books.entity';
import { CreateNewBookCommand } from './useCases/create.new.book.use-case';
import { BooksQueryRepository } from './books.query.repository';
import { DeleteCurrentBookCommand } from './useCases/delete.current.book.use-case';
import { BookIdDto } from './dto/book.id.dto';
import { UpdateCurrentBookCommand } from './useCases/update.current.book.use-case';
import { QueryHelper } from '../../common/helpers/query.helper';
import { QueryBookType } from '../../common/types/query.book.type';

@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly booksQueryRepository: BooksQueryRepository,
    private readonly queryHelper: QueryHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewBook(
    @Body() body: BooksDto,
    @Req() req: any,
  ): Promise<BooksEntity> {
    return this.commandBus.execute(new CreateNewBookCommand(req.user, body));
  }

  @Get()
  async getBooks(@Query() query: any): Promise<QueryBookType> {
    const queryInfo = this.queryHelper.queryCheckHelper(query);
    return this.booksQueryRepository.getAllBooks(queryInfo);
  }

  @Get('/:id')
  async getCurrentBook(@Param('id') id: string): Promise<BooksEntity> {
    const book = await this.booksQueryRepository.getBookById(+id);
    if (book) {
      return book;
    } else {
      throw new NotFoundException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:id')
  async updateInformationBook(
    @Param() param: BookIdDto,
    @Body() body: BooksDto,
    @Req() req: any,
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdateCurrentBookCommand(+param.id, req.user, body),
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteBook(@Param() param: BookIdDto, @Req() req: any): Promise<void> {
    await this.commandBus.execute(
      new DeleteCurrentBookCommand(+param.id, req.user),
    );
  }
}
