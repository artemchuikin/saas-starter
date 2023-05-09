import { Test, TestingModule } from "@nestjs/testing";
import {
    TelegramBot,
    TelegramOptions,
    TelegramOptionsFactory
} from "../telegram.types";
import { TelegramModule } from '../telegram.module';
import { TELEGRAM_MODULE_CONNECTION, TELEGRAM_MODULE_OPTIONS } from "../telegram.constants";

describe('TelegramModule', () => {
    let telegramOptions: TelegramOptions;
    let telegramBot: TelegramBot;
    const { CHAT_ID, BOT_TOKEN } = process.env;

    const config: TelegramOptions = {
        chatId: CHAT_ID,
        token: BOT_TOKEN,
    };

    class TestService implements TelegramOptionsFactory {
        createTelegramOptions(): TelegramOptions {
            return config;
        }
    }

    describe('forRoot', () => {
        it('should provide telegramOptions and telegramBot', async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [TelegramModule.forRoot(config)],
            }).compile();

            telegramOptions = module.get<TelegramOptions>(TELEGRAM_MODULE_OPTIONS);
            telegramBot = module.get<TelegramBot>(TELEGRAM_MODULE_CONNECTION);

            expect(telegramOptions).toBeDefined();
            expect(telegramBot).toBeDefined();
        });
    });

    describe('forRootAsync', () => {
        describe('when `useFactory` option is used', () => {
            it('should provide should provide telegramOptions and telegramBot', async () => {
                const module: TestingModule = await Test.createTestingModule({
                    imports: [
                        TelegramModule.forRootAsync({
                            useFactory: () => config,
                        }),
                    ],
                }).compile();

                telegramOptions = module.get<TelegramOptions>(TELEGRAM_MODULE_OPTIONS);
                telegramBot = module.get<TelegramBot>(TELEGRAM_MODULE_CONNECTION);

                expect(telegramOptions).toBeDefined();
                expect(telegramBot).toBeDefined();
            });
        });
    });

    describe('when `useClass` option is used', () => {
        it('should provide telegramOptions and telegramBot', async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    TelegramModule.forRootAsync({
                        useClass: TestService,
                    }),
                ],
            }).compile();

            telegramOptions = module.get<TelegramOptions>(TELEGRAM_MODULE_OPTIONS);
            telegramBot = module.get<TelegramBot>(TELEGRAM_MODULE_CONNECTION);

            expect(telegramOptions).toBeDefined();
            expect(telegramBot).toBeDefined();
        });
    });
});
