import {Knex} from 'knex';
import * as uniqid from 'uniqid';
import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {OAuth2Client} from 'google-auth-library';
import {ConfigService} from '@nestjs/config';
import {AuthService} from '../auth.service';
import {InjectConnection} from 'nest-knexjs';

@Injectable()
export class GoogleAuthService {
    private oAuth2Client: OAuth2Client;

    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
    }

    onModuleInit() {
        const clientId = this.configService.get('googleAuth.clientId');
        const clientSecret = this.configService.get('googleAuth.clientSecret');
        this.oAuth2Client = new OAuth2Client(clientId, clientSecret);
    }

    async authenticate(token: string) {
        try {
            const {email, sub: googleId} = await this.oAuth2Client.getTokenInfo(token);
            const user = await this.knex('users').where('googleId', googleId);

            if (user[0]) {
                return this.authService.generateTokens(user[0]);
            } else {
                const uid = uniqid();
                const newUser = await this.knex.table('users')
                    .insert({
                        id: uid,
                        email,
                        googleId
                    })
                    .returning(['id', 'email', 'googleId']);

                return await this.authService.generateTokens(newUser[0]);
            }
        } catch (error) {
            if (error.code === '23505') {
                /**
                 * @throws
                 * Will throw an error if the document (user) does not exist.
                 */
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
