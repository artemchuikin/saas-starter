import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Injectable()
export class CookieService {

    constructor(
        private readonly configService: ConfigService
    ) {}

    setRefreshToken(res: Response, value: string) {
        res.cookie('refreshToken', value, {
            // secure: true,
            httpOnly: true,
            // sameSite: 'strict',
            maxAge: this.configService.get('jwt.refreshTokenTtl'),
            // path: '/api/v1/auth',
            // domain: `.${this.configService.get('domain')}`
        });
    }
}
