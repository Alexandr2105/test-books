import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class BooksEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  title: string;
  @Column()
  yearOfPublishing: number;
  @Column()
  shortDescription: string;
  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (u) => u.id, { onDelete: 'CASCADE' })
  user: UserEntity;

  constructor(
    author: string,
    title: string,
    yearOfPublishing: number,
    shortDescription: string,
    userId: number,
  ) {
    this.author = author;
    this.title = title;
    this.yearOfPublishing = yearOfPublishing;
    this.shortDescription = shortDescription;
    this.userId = userId;
  }
}
