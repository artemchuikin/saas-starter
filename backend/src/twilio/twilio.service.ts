import {Injectable} from '@nestjs/common';
import {InjectConnection} from './common/twilio.decorator';
import {TwilioClient} from './twilio.types';

@Injectable()
export class TwilioService {
    constructor(
        @InjectConnection() private readonly twilioClient: TwilioClient
    ) {
    }

    async sendSMS(message: string): Promise<any> {
        try {
            await this.twilioClient.messages.create({
                from: '(936) 243-1322',
                to: '+79119599386',
                body: message
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
