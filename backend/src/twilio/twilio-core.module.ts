import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import {
    TwilioOptions,
    TwilioOptionsFactory,
    TwilioModuleAsyncOptions
} from "./twilio.types";
import {
    TWILIO_MODULE_OPTIONS,
    TWILIO_MODULE_CONNECTION
} from "./twilio.constants";
import { createTwilioClient } from "./common/twilio.utils";

@Module({})
export class TwilioCoreModule {
    public static forRoot(
        options: TwilioOptions
    ): DynamicModule {
        const connectionProvider: Provider = {
            provide: TWILIO_MODULE_CONNECTION,
            useValue: createTwilioClient(options)
        };

        return {
            module: TwilioCoreModule,
            providers: [
                connectionProvider,
            ],
            exports: [connectionProvider]
        }
    }

    public static forRootAsync(
        options: TwilioModuleAsyncOptions
    ): DynamicModule {
        const connectionProvider: Provider = {
            provide: TWILIO_MODULE_CONNECTION,
            useFactory: (options: TwilioOptions) => createTwilioClient(options),
            inject: [TWILIO_MODULE_OPTIONS]
        };

        return {
            module: TwilioCoreModule,
            providers: [
                ...this.createAsyncProvider(options),
                connectionProvider
            ],
            imports: options.imports,
            exports: [connectionProvider]
        };
    }

    private static createAsyncProvider(
        options: TwilioModuleAsyncOptions
    ): Provider[] {
        if(!(options.useFactory || options.useClass || options.useExisting)) {
            throw new Error(
                'Invalid configuration. Must provide useFactory, useClass or useExisting'
            );
        }

        if(options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass = options.useClass as Type<TwilioOptionsFactory>;

        return [
            this.createAsyncOptionsProvider(options),
            { provide: useClass, useClass }
        ]
    }

    private static createAsyncOptionsProvider(
        options: TwilioModuleAsyncOptions
    ): Provider {
        if(!(options.useFactory || options.useClass || options.useExisting)) {
            throw new Error(
                'Invalid configuration. Must provide useFactory, useClass or useExisting'
            );
        }

        if(options.useFactory) {
            return {
                provide: TWILIO_MODULE_OPTIONS,
                useFactory: async (...args: any[]) => {
                    return await options.useFactory(...args);
                },
                inject: options.inject || []
            };
        }

        return {
            provide: TWILIO_MODULE_OPTIONS,
            useFactory: async (
                optionsFactory: TwilioOptionsFactory
            ): Promise<TwilioOptions> => {
                return await optionsFactory.createTwilioOptions();
            },
            inject: [(options.useClass || options.useExisting) as Type<TwilioOptionsFactory>],
        };
    }
}
