import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Question } from './question/question.entity';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestiontypeModule } from './questiontype/questiontype.module';
import { PossibleanswerModule } from './possibleanswer/possibleanswer.module';
import { AnswerModule } from './answer/answer.module';
import { Questionnaire } from './questionnaire/questionnaire.entity';
import { QuestionType } from './questiontype/questiontype.entity';
import { User } from './user/user.entity';
import { Answer } from './answer/answer.entity';
import { PossibleAnswer } from './possibleanswer/possibleanswer.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //configure .env secrets file
    ConfigModule.forRoot(),
    //configure database connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      entities: [
        Question,
        Questionnaire,
        QuestionType,
        User,
        Answer,
        PossibleAnswer,
      ],
      //synchronize is set to true because the work is in development, in production sync is set to false
      synchronize: true,
    }),
    QuestionModule,
    UserModule,
    QuestionnaireModule,
    QuestiontypeModule,
    PossibleanswerModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
