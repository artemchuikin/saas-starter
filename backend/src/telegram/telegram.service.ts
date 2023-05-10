import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {
    TelegramOptions,
    TelegramBot
} from './telegram.types';
import {InjectConnection, InjectOptions} from './common/telegram.decorator';

@Injectable()
export class TelegramService {
    constructor(
        @InjectOptions() private telegramOptions: TelegramOptions,
        @InjectConnection() private telegramBot: TelegramBot
    ) {
    }

    async sendMessage(
        message: string,
        chatId: string = this.telegramOptions.chatId
    ): Promise<void> {
        try {
            await this.telegramBot.telegram.sendMessage(chatId, message);
        } catch (err) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }
    }
}
