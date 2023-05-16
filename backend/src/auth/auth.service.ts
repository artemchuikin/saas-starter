import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Knex} from 'knex';
import {UsersService} from '../users/users.service';
import {HashingService} from './hashing/hashing.service';
import {UserCredentialsDto} from '../users/dto/user-credentials.dto';
import {JwtPayload, JwtTokens} from './auth.types';
import {InjectConnection} from 'nest-knexjs';
import {User} from '../users/users.types';
import {ConfigService} from '@nestjs/config';
import {RefreshTokenDto} from './dto/refresh-token.dto';
import {InvalidatedTokenError, RefreshTokenIdsStorage} from './refresh-token-ids.storage';
import {randomUUID} from 'crypto';
import {ForgotPasswordDto} from './dto/forgot-password.dto';
import {EmailService} from '../email/email.service';
import {ResetPasswordDto} from './dto/reset-password.dto';
import {ResetPassTokenIdsStorage} from './reset-pass-token-ids.storage';

@Injectable()
export class AuthService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
        private readonly resetPassTokenIdsStorage: ResetPassTokenIdsStorage,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService
    ) {
    }

    async signUp(userCredentialsDto: UserCredentialsDto): Promise<JwtTokens> {
        const user = await this.usersService.createUser(userCredentialsDto);

        return this.generateTokens(user);
    }

    async signIn(userCredentialsDto: UserCredentialsDto
    ): Promise<JwtTokens> {
        const {email, password} = userCredentialsDto;
        const user = await this.knex('users').where('email', email);

        if (!user[0]) {
            throw new UnauthorizedException('These credentials do not match our records.');
        }

        const isEquilPassword = await this.hashingService.compare(password, user[0].password);

        if (!isEquilPassword) {
            throw new UnauthorizedException('Password does not match');
        }

        return await this.generateTokens(user[0]);
    }

    async signOut(userId: string) {
        await this.refreshTokenIdsStorage.invalidate(userId);
    }

    private async signToken<T>(userId: string, expiresIn: string, payload?: T) {
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload
        }, {
            expiresIn
        });
    }

    async generateTokens(user: User): Promise<JwtTokens> {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            await this.signToken<Partial<JwtPayload>>(
                user.id,
                this.configService.get('jwt.accessTokenTtl'),
                {email: user.email}
            ),
            await this.signToken(user.id, this.configService.get('jwt.refreshTokenTtl'), {refreshTokenId})
        ]);

        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId, this.configService.get('jwt.refreshTokenTtl'));

        return {accessToken, refreshToken};
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<JwtTokens> {
        try {
            const {
                sub,
                refreshTokenId
            } = await this.jwtService.verifyAsync<Pick<JwtPayload, 'sub'> & {refreshTokenId: string}>(refreshTokenDto.refreshToken);
            const user = await this.knex('users').where('id', sub);
            const isValid = await this.refreshTokenIdsStorage.validate(user[0].id, refreshTokenId);

            if (isValid) {
                await this.refreshTokenIdsStorage.invalidate(user[0].id);
            } else {
                throw new Error('Refresh token is invalid');
            }

            return await this.generateTokens(user[0]);
        } catch (err) {
            if (err instanceof InvalidatedTokenError) {
                //Take action: notify user that his refresh token might have been stolen?
                throw new UnauthorizedException('Access denied');
            }
            throw new UnauthorizedException();
        }
    }

    async insertOldRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<void> {
        const {
            sub,
            refreshTokenId
        } = await this.jwtService.verifyAsync<Pick<JwtPayload, 'sub'> & {refreshTokenId: string}>(refreshTokenDto.refreshToken);
        const user = await this.knex('users').where('id', sub);

        try {
            await this.refreshTokenIdsStorage.insert(user[0].id, refreshTokenId, this.configService.get('jwt.refreshTokenTtl'));
        } catch(err) {
            throw new UnauthorizedException();
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const {email} = forgotPasswordDto;
        const resetTokenId = randomUUID();
        const user = await this.knex('users').where('email', email);

        if (!user[0]) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const token = await this.signToken(
            user[0].id,
            this.configService.get('jwt.resetTokenTtl'),
            {email: user[0].email, resetTokenId}
        );
        const link = `${this.configService.get('clientUrl')}/reset-password/${token}`;

        await this.resetPassTokenIdsStorage.insert(user[0].id, resetTokenId, this.configService.get('jwt.accessTokenTtl'));
        await this.emailService.forgotPassword({
            email: user[0].email,
            name: 'Vasya',
            link
        });
    }

    async resetPassword(resetToken, resetPasswordDto: ResetPasswordDto): Promise<JwtTokens> {
        const {password, confirmPassword} = resetPasswordDto;

        try {
            const {
                email,
                resetTokenId
            } = await this.jwtService.verifyAsync<Pick<JwtPayload, 'email'> & {resetTokenId: string}>(resetToken);
            const user = await this.knex('users').where('email', email);
            const isValid = await this.resetPassTokenIdsStorage.validate(user[0].id, resetTokenId);
            const hashedPassword = await this.hashingService.hash(password);

            if (isValid) {
                if (password === confirmPassword) {
                    await this.knex('users')
                        .where('email', email)
                        .update({password: hashedPassword})
                        .returning(['id', 'email']);

                    await this.resetPassTokenIdsStorage.invalidate(user[0].id);
                    await this.emailService.successResetPassword({
                        email: user[0].email,
                        name: 'Vasya'
                    });

                    return await this.signIn({email, password});
                } else {
                    throw new Error('Passwords don\'t match');
                }
            } else {
                throw new BadRequestException('Token is invalid or has expired. Please request a new password reset token.');
            }
        } catch (err) {
            throw new BadRequestException('Token is invalid or has expired. Please request a new password reset token.');
        }
    }
}
