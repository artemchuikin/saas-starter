import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KnexModule } from "nest-knexjs";
import configuration from './config/configuration';
import { getDbConfig } from "./db/db.config";
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TwilioModule } from './twilio/twilio.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getEmailConfig } from "./email/email.config";
import { EmailController } from "./email/email.controller";
import { EmailService } from "./email/email.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        KnexModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getDbConfig
        }),
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getEmailConfig
        }),
        AuthModule,
        TasksModule,
        TwilioModule
    ],
    controllers: [EmailController],
    providers: [EmailService],
})
export class AppModule {}
