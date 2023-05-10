import {IsEmail, IsNotEmpty} from 'class-validator';

export class SuccessResetPasswordEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;
}