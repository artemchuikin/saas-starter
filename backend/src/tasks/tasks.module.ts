import {Module} from '@nestjs/common';
import {TasksController} from './tasks.controller';
import {TasksService} from './tasks.service';
import {AuthModule} from '../auth/auth.module';
import {TelegramModule} from '../telegram/telegram.module';
import {ConfigService} from '@nestjs/config';
import {getTelegramConfig} from '../telegram/telegram.config';

@Module({
    imports: [
        AuthModule,
        TelegramModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getTelegramConfig
        })
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {
}
