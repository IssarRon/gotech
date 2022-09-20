import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  questionnaireId: number;

  @Column()
  name: string;

  @Column()
  comment: string;

  //the questionnaire's owner
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  //the quesionnaire's questions
  @OneToMany(() => Question, (question) => question.questionnaire)
  questions: Question[];
}
