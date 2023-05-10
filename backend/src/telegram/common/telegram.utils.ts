import {Telegraf} from 'telegraf';
import {
    TelegramBot,
    TelegramOptions
} from '../telegram.types';

export const createTelegramBot = (options: Pick<TelegramOptions, 'token'>): TelegramBot => {
    const {token} = options;
    const telegramBot = new Telegraf(token);

    return telegramBot;
};
