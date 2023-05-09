import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import {
    TelegramOptions,
    TelegramOptionsFactory,
    TelegramModuleAsyncOptions
} from "./telegram.types";
import {
    TELEGRAM_MODULE_OPTIONS,
    TELEGRAM_MODULE_CONNECTION
} from "./telegram.constants";
import { createTelegramBot } from "./common/telegram.utils";

@Module({})
export class TelegramCoreModule {
    public static forRoot(
        options: TelegramOptions
    ): DynamicModule {
        const optionsProvider: Provider = {
            provide: TELEGRAM_MODULE_OPTIONS,
            useValue: options
        };

        const connectionProvider: Provider = {
            provide: TELEGRAM_MODULE_CONNECTION,
            useValue: createTelegramBot(options)
        };

        return {
            module: TelegramCoreModule,
            providers: [
                optionsProvider,
                connectionProvider,
            ],
            exports: [
                optionsProvider,
                connectionProvider
            ]
        }
    }

    public static forRootAsync(
        options: TelegramModuleAsyncOptions
    ): DynamicModule {
        const optionsProvider: Provider = {
            provide: TELEGRAM_MODULE_OPTIONS,
            useValue: options
        };

        const connectionProvider: Provider = {
            provide: TELEGRAM_MODULE_CONNECTION,
            useFactory: (options: TelegramOptions) => createTelegramBot(options),
            inject: [TELEGRAM_MODULE_OPTIONS]
        };

        return {
            module: TelegramCoreModule,
            providers: [
                ...this.createAsyncProvider(options),
                connectionProvider
            ],
            imports: options.imports,
            exports: [
                optionsProvider,
                connectionProvider
            ]
        };
    }

    private static createAsyncProvider(
        options: TelegramModuleAsyncOptions
    ): Provider[] {
        if(!(options.useFactory || options.useClass || options.useExisting)) {
            throw new Error(
                'Invalid configuration. Must provide useFactory, useClass or useExisting'
            );
        }

        if(options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass = options.useClass as Type<TelegramOptionsFactory>;

        return [
            this.createAsyncOptionsProvider(options),
            { provide: useClass, useClass }
        ]
    }

    private static createAsyncOptionsProvider(
        options: TelegramModuleAsyncOptions
    ): Provider {
        if(!(options.useFactory || options.useClass || options.useExisting)) {
            throw new Error(
                'Invalid configuration. Must provide useFactory, useClass or useExisting'
            );
        }

        if(options.useFactory) {
            return {
                provide: TELEGRAM_MODULE_OPTIONS,
                useFactory: async (...args: any[]) => {
                    return await options.useFactory(...args);
                },
                inject: options.inject || []
            };
        }

        return {
            provide: TELEGRAM_MODULE_OPTIONS,
            useFactory: async (
                optionsFactory: TelegramOptionsFactory
            ): Promise<TelegramOptions> => {
                return await optionsFactory.createTelegramOptions();
            },
            inject: [(options.useClass || options.useExisting) as Type<TelegramOptionsFactory>],
        };
    }
}
