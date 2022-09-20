import { Answer } from 'src/answer/answer.entity';
import { Questionnaire } from 'src/questionnaire/questionnaire.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: Number;

  @Column()
  username: string;

  @Column()
  password: string;

  //one user can create multiple questionnaire's
  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.owner)
  questionnaires: Questionnaire[];

  //the user's answered questions
  @OneToMany(() => Answer, (answer) => answer.userId)
  answers: Answer[];
}
