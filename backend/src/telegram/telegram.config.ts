import { ConfigService } from "@nestjs/config";

export const getTelegramConfig = (configService: ConfigService) => {
    const token = configService.get('telegram.token');

    if(!token) throw new Error('Telegram token is not defined');

    return {
        token,
        chatId: configService.get('telegram.chatId')
    }
}
