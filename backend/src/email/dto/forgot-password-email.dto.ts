import {IsEmail, IsNotEmpty} from 'class-validator';

export class ForgotPasswordEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    link: string;
}