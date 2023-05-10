import {TwilioOptions} from './twilio.types';
import {ConfigService} from '@nestjs/config';

export const getTwilioConfig = (configService: ConfigService): TwilioOptions => {
    const accountSid = configService.get('accountSid');
    const authToken = configService.get('authToken');

    return {
        accountSid,
        authToken
    };
};
