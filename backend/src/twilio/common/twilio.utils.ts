import { Twilio } from "twilio";
import {
    TwilioClient,
    TwilioOptions
} from "../twilio.types";

export const createTwilioClient = (options: TwilioOptions): TwilioClient => {
    const { accountSid, authToken } = options;
    const client = new Twilio(accountSid, authToken);

    return client;
}
