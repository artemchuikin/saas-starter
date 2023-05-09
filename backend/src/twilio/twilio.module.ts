import { DynamicModule, Module } from "@nestjs/common";
import { TwilioService } from "./twilio.service";
import { TwilioModuleAsyncOptions, TwilioOptions } from "./twilio.types";
import { TwilioController } from "./twilio.controller";
import { TwilioCoreModule } from "./twilio-core.module";

@Module({})
export class TwilioModule {
    public static forRoot(options: TwilioOptions): DynamicModule {
        return {
            module: TwilioModule,
            imports: [TwilioCoreModule.forRoot(options)],
            providers: [TwilioService],
            exports: [TwilioService],
            controllers: [TwilioController]
        }
    }

    public static forRootAsync(options: TwilioModuleAsyncOptions): DynamicModule {
        return {
            module: TwilioModule,
            imports: [TwilioCoreModule.forRootAsync(options)],
            providers: [TwilioService],
            exports: [TwilioService],
            controllers: [TwilioController]
        };
    }
}
