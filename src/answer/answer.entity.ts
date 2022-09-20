import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answerId: number;

  //the question that was answered
  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  questionId: Question;

  //the user that answered
  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column()
  value: string;
}
