import { questionType } from 'src/common/types/questionType.type';
import { Question } from 'src/question/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionType {
  @PrimaryGeneratedColumn()
  questionTypeId: number;

  @Column()
  typeName: questionType;

  @OneToMany(() => Question, (question) => question.type)
  questions: Question[];
}
