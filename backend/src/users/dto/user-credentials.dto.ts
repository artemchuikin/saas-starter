import {IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength} from 'class-validator';

export class UserCredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @MinLength(8)
    @MaxLength(14)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak'
    })
    password: string;

    @IsOptional()
    googleId?: string;
}
