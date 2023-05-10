import {Inject} from '@nestjs/common';
import {
    TWILIO_MODULE_CONNECTION,
    TWILIO_MODULE_OPTIONS
} from '../twilio.constants';

export const InjectOptions = () => Inject(TWILIO_MODULE_OPTIONS);
export const InjectConnection = () => Inject(TWILIO_MODULE_CONNECTION);
