import { ModuleMetadata, Type } from "@nestjs/common";
import { Telegraf } from 'telegraf';

export interface TelegramBot extends Telegraf{}

export interface TelegramOptions {
    chatId: string;
    token: string;
}

export interface TelegramOptionsFactory {
    createTelegramOptions(): Promise<TelegramOptions> | TelegramOptions;
}

export interface TelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<TelegramOptionsFactory>;
    useExisting?: Type<TelegramOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<TelegramOptions> | TelegramOptions;
}
