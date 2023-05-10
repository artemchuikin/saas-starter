import {ConfigService} from '@nestjs/config';

export const getJWTConfig = (configService: ConfigService) => {
    const secret = configService.get<string>('jwt.secret');
    const audience = configService.get<string>('jwt.audience');
    const issuer = configService.get<string>('jwt.issuer');

    return {
        secret,
        signOptions: {
            audience,
            issuer
        }
    };
};
