import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from 'src/common/interfaces/userAnswer.interface';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { DeepPartial, Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly questionService: QuestionService,
  ) {}

  async saveQuestionnaireResults(
    userId: number,
    questionnaireId: number,
    formData: Array<UserAnswer>,
  ) {
    const validateAnswer = (
      question: DeepPartial<Question>,
      answer: UserAnswer,
    ) => {
      //if answer is required and none received, return false and throw error
      if (!answer?.value.trim() && question.required === true)
        throw 'required question not answered';
      //if question is multi choice
      //both open and open multi-choice questions can accept any value, only multi choice cannot
      if (question.type.typeName === 'multiple-choice') {
        //map possibilities to see if received value matches possible values
        const possibilities = question.possibleAnswers.map(
          (possibleAnswer: { answerValue: string }) =>
            possibleAnswer.answerValue,
        );
        //check if provided answer value is in possbilities
        if (!possibilities.includes(answer?.value) && answer)
          throw 'answer not included in possibilites';
      }
      //all validation completed, information is okay
      return true;
    };

    try {
      //get all questionnaire questions for data validation
      //data is brought from the database because user information might be faulty and must be checked against a known source of truth
      const questions: Array<DeepPartial<Question>> =
        await this.questionService.getQuestions(questionnaireId);

      //iterate over questions and check data validation
      const answers: Array<DeepPartial<Answer>> = questions.map((question) => {
        //find the user answer corresponding to the question
        const relevantAnswer = formData.find(
          (answer) => answer.questionId === question.questionId,
        );
        //check if answer is valid, if it is insert it to the answers array
        if (validateAnswer(question, relevantAnswer)) {
          return {
            questionId: {
              questionId: question.questionId,
            },
            userId: { userId },
            value: relevantAnswer?.value || '',
          };
          //if something is wrong with the information, throw error
        } else {
          throw 'information unacceptable';
        }
      });

      //insert answer information into the database
      this.answerRepository.insert(answers);
      return;
    } catch (e) {
      throw e;
    }
  }
}
