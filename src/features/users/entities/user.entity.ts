import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BooksEntity } from '../../books/entities/books.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  email: string;

  @OneToMany(() => BooksEntity, (b) => b.id)
  books: BooksEntity[];

  constructor(login: string, password: string, email: string) {
    this.login = login;
    this.password = password;
    this.email = email;
  }
}
