import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserAnswer } from 'src/common/interfaces/userAnswer.interface';

export class formDataDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => answer)
  @ValidateNested({ each: true })
  formData: answer[];
}

export class answer implements UserAnswer {
  @IsNumber()
  questionId: number;

  @IsString()
  value: string;
}
