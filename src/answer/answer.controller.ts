import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { UserAnswer } from 'src/common/interfaces/userAnswer.interface';
import { AnswerService } from './answer.service';
import { formDataDto } from './validations/formDataDto.dto';

@Controller('api/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('save-results/:userId/:questionnaireId')
  saveResults(
    @Param('userId') userId: number,
    @Param('questionnaireId') questionnaireId: number,
    @Body(ValidationPipe) { formData }: formDataDto,
  ) {
    return this.answerService.saveQuestionnaireResults(
      userId,
      questionnaireId,
      formData,
    );
  }
}
