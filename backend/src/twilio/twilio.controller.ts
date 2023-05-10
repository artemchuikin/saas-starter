import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import {TwilioService} from './twilio.service';

@Controller('twilio')
export class TwilioController {
    constructor(
        private twilioService: TwilioService
    ) {
    }

    @Post('sms')
    sendNotification(
        @Body('message') message: string
    ): Promise<void> {
        return this.twilioService.sendSMS(message);
    }
}
