import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { GoogleAuthService } from "./google-auth.service";
import { GoogleTokenDto } from "../dto/google-token.dto";
import { Response } from "express";
import { JwtTokens } from "../auth.types";
import { ConfigService } from "@nestjs/config";
import { CookieService } from "../cookie/cookie.service";

@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService,
        private cookieService: CookieService,
        private readonly configService: ConfigService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async authenticate(
        @Res({passthrough: true}) res: Response,
        @Body() googleTokenDto: GoogleTokenDto
    ): Promise<JwtTokens> {
        const generatedTokens = await this.googleAuthService.authenticate(googleTokenDto.token);

        this.cookieService.setRefreshToken(
            res,
            generatedTokens.refreshToken
        );

        return generatedTokens;
    }
}
