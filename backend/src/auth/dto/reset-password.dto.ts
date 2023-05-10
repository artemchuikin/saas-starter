import {IsNotEmpty, Matches, MaxLength, MinLength} from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(14)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak'
    })
    password: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(14)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak'
    })
    confirmPassword: string;
}
