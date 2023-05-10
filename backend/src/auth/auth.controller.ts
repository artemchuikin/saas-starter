import {Body, Controller, Post, Get, HttpStatus, HttpCode, Res, Req, UseGuards, Patch, Param} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserCredentialsDto} from '../users/dto/user-credentials.dto';
import {Request, Response} from 'express';
import {JwtTokens} from './auth.types';
import {ConfigService} from '@nestjs/config';
import {GetUser} from '../users/get-user.decorator';
import {User} from '../users/users.types';
import {AuthGuard} from '@nestjs/passport';
import {ForgotPasswordDto} from './dto/forgot-password.dto';
import {ResetPasswordDto} from './dto/reset-password.dto';
import {CookieService} from './cookie/cookie.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService
    ) {
    }

    @Post('signup')
    async signUp(
        @Res({passthrough: true}) res: Response,
        @Body() userCredentialsDto: UserCredentialsDto
    ): Promise<JwtTokens> {
        const generatedTokens = await this.authService.signUp(userCredentialsDto);

        this.cookieService.setRefreshToken(
            res,
            generatedTokens.refreshToken
        );

        return generatedTokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(
        @Res({passthrough: true}) res: Response,
        @Body() userCredentialsDto: UserCredentialsDto
    ): Promise<JwtTokens> {
        const generatedTokens = await this.authService.signIn(userCredentialsDto);

        this.cookieService.setRefreshToken(
            res,
            generatedTokens.refreshToken
        );

        return generatedTokens;
    }

    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.OK)
    @Post('signout')
    async signOut(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
        @GetUser() user: User
    ) {
        await this.authService.signOut(user.id);
        res.clearCookie('refreshToken');
    }

    @HttpCode(HttpStatus.OK)
    @Get('refresh-tokens')
    async refreshTokens(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response
    ): Promise<JwtTokens> {
        const {refreshToken} = req.cookies;
        const generatedTokens = await this.authService.refreshTokens({refreshToken});

        this.cookieService.setRefreshToken(
            res,
            generatedTokens.refreshToken
        );

        return generatedTokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto
    ): Promise<void> {
        await this.authService.forgotPassword(forgotPasswordDto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('reset-password/:token')
    async resetPassword(
        @Res({passthrough: true}) res: Response,
        @Param('token') resetToken: string,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<JwtTokens> {
        const generatedTokens = await this.authService.resetPassword(resetToken, resetPasswordDto);

        this.cookieService.setRefreshToken(
            res,
            generatedTokens.refreshToken
        );

        return generatedTokens;
    }
}
