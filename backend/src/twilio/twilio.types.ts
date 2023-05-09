import { ModuleMetadata, Type } from "@nestjs/common";
import { Twilio } from "twilio";

export interface TwilioClient extends Twilio {}

export interface TwilioOptions {
    accountSid: string;
    authToken: string;
    options?: Twilio.TwilioClientOptions
}

export interface TwilioOptionsFactory {
    createTwilioOptions(): Promise<TwilioOptions> | TwilioOptions;
}

export interface TwilioModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<TwilioOptionsFactory>;
    useExisting?: Type<TwilioOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<TwilioOptions> | TwilioOptions;
}
