import { DynamicModule, Module } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { TelegramModuleAsyncOptions, TelegramOptions } from "./telegram.types";
import { TelegramCoreModule } from "./telegram-core.module";

@Module({})
export class TelegramModule {
    public static forRoot(options: TelegramOptions): DynamicModule {
        return {
            module: TelegramModule,
            imports: [TelegramCoreModule.forRoot(options)],
            providers: [TelegramService],
            exports: [TelegramService]
        }
    }

    public static forRootAsync(options: TelegramModuleAsyncOptions): DynamicModule {
        return {
            module: TelegramModule,
            imports: [TelegramCoreModule.forRootAsync(options)],
            providers: [TelegramService],
            exports: [TelegramService]
        };
    }
}
