import { Controller, Get, Param } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('api/questionnaire/')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get('get-questionnaire/:questionnaireId')
  async getQuestionnaire(@Param('questionnaireId') questionnaireId: number) {
    const questionnaire = await this.questionnaireService.getQuestionnaire(
      questionnaireId,
    );
    return questionnaire.length ? questionnaire : 'no questionnaire found';
  }
}
