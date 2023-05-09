import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { RefreshTokenIdsStorage } from "./refresh-token-ids.storage";
import { ResetPassTokenIdsStorage } from "./reset-pass-token-ids.storage";
import { GoogleAuthService } from './social/google-auth.service';
import { GoogleAuthController } from './social/google-auth.controller';
import { getJWTConfig } from "./jwt.config";
import { EmailService } from "../email/email.service";
import { CookieService } from "./cookie/cookie.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: getJWTConfig
        }),
        UsersModule
    ],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService
        },
        AuthService,
        CookieService,
        RefreshTokenIdsStorage,
        ResetPassTokenIdsStorage,
        JwtStrategy,
        GoogleAuthService,
        EmailService
    ],
    controllers: [AuthController, GoogleAuthController],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
