import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const getEmailConfig = (configService: ConfigService) => {
    const nodeEnv = configService.get('nodeEnv');
    const host = configService.get('email.host');
    const username = configService.get('email.username');
    const password = configService.get('email.password');

    return {
        transport: {
            host: host,
            secure: true,
            auth: {
                user: username,
                pass: password
            },
        },
        defaults: {
            from: `Nice App ${configService.get('email.username')}`
        },
        template: {
            dir: nodeEnv === "prod"
                ? join(__dirname, '..', 'email', 'templates')
                : join(__dirname, '../src/email/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true
            }
        }
    }
}
