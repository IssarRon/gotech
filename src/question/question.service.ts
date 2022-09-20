import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  //get the ids of questions assuming questionnaire contains unique
  async getQuestions(questionnaireId: number) {
    try {
      return this.questionRepository.find({
        relations: { type: true, possibleAnswers: true },
        where: {
          questionnaire: { questionnaireId },
        },
        select: {
          questionId: true,
          questionText: true,
          type: { typeName: true },
          possibleAnswers: { answerValue: true },
          required: true,
        },
        order: { questionOrder: 'ASC' },
      });
    } catch (error) {
      throw error;
    }
  }
}
