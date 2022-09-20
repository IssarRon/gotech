import { Question } from 'src/question/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PossibleAnswer {
  @PrimaryGeneratedColumn()
  possibleAnswerId: number;

  @Column()
  answerValue: string;

  //link to the original question
  @ManyToOne(() => Question, (question) => question.possibleAnswers)
  @JoinColumn({ name: 'originalQuestionId' })
  originalQuestion: number;

  //link to conditional question, if such question exists
  @ManyToOne(() => Question, (question) => question.possibleAnswers, {
    nullable: true,
  })
  @JoinColumn({ name: 'conditionalQuestionId' })
  conditionalQuestion?: Question;
}
