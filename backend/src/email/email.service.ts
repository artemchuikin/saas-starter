import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import {ForgotPasswordEmailDto} from './dto/forgot-password-email.dto';
import {SuccessResetPasswordEmailDto} from './dto/success-reset-password-email.dto';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {
    }

    async forgotPassword(forgotPasswordEmailDto: ForgotPasswordEmailDto) {
        const {email, name, link} = forgotPasswordEmailDto;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Forgot Password',
            template: 'forgot-password',
            context: {
                name,
                link
            }
        });
    }

    async successResetPassword(successResetPasswordEmailDto: SuccessResetPasswordEmailDto) {
        const {email, name} = successResetPasswordEmailDto;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Success Reset Password',
            template: 'success-reset-password',
            context: {
                name
            }
        });
    }
}