import { Answer } from 'src/answer/answer.entity';
import { PossibleAnswer } from 'src/possibleanswer/possibleanswer.entity';
import { Questionnaire } from 'src/questionnaire/questionnaire.entity';
import { QuestionType } from 'src/questiontype/questiontype.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  //the question itself
  @Column()
  questionText: string;

  //the question's place among other questions within the same questionnaire
  @Column()
  questionOrder: number;

  @Column()
  required: boolean;

  //the user's inserted answers
  @OneToMany(() => Answer, (answer) => answer.questionId)
  answers: Answer[];

  //if a question is multi-choice or open multi-choice it will have a set of possible answers
  @OneToMany(
    () => PossibleAnswer,
    (possibleAnswer) => possibleAnswer.originalQuestion,
  )
  possibleAnswers: PossibleAnswer[];

  //database normalization includes putting question types in a separate table
  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  @JoinColumn({ name: 'questionTypeId' })
  type: QuestionType;

  //many questions per questionnaire
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;
}
