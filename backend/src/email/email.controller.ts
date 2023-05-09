import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { ForgotPasswordEmailDto } from "./dto/forgot-password-email.dto";

@Controller('mail')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('forgot-password')
    async forgotPasswordEmail(
        @Body() forgotPasswordEmailDto: ForgotPasswordEmailDto
    ) {
        return await this.emailService.forgotPassword(forgotPasswordEmailDto);
    }
}