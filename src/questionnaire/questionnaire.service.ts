import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/question.entity';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async getQuestionnaire(questionnaireId: number) {
    try {
      return this.questionnaireRepository.find({
        select: {
          comment: true,
          name: true,
          questions: {
            //question id is not sensitive information, and it is sent to avoid higher time complexity when inserting answers
            questionId: true,
            questionText: true,
            required: true,
            questionOrder: true,
            possibleAnswers: {
              answerValue: true,
              conditionalQuestion: {
                type: { typeName: true },
                possibleAnswers: true,
                questionText: true,
              },
            },
            type: { typeName: true },
          },
        },
        where: { questionnaireId },
        relations: {
          questions: {
            possibleAnswers: true,
            type: true,
          },
        },
        order: { questions: { questionOrder: 'ASC' } },
      });
    } catch (error) {
      throw error;
    }
  }
}
