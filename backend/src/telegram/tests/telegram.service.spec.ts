import { Test } from "@nestjs/testing";
import { TelegramService } from "../telegram.service";

describe('TelegramService', () => {
    let telegramService: TelegramService;

    const mockTelegramService = {};

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                { provide: TelegramService, useValue: mockTelegramService }
            ]
        }).compile();

        telegramService = module.get<TelegramService>(TelegramService);
    });

    describe('sendMessage', () => {
        it('calls TelegramService.sendMessage and returns the result', () => {

        });
    });
});
