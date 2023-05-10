import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {HashingService} from '../auth/hashing/hashing.service';
import {BcryptService} from '../auth/hashing/bcrypt.service';
import {RefreshTokenIdsStorage} from '../auth/refresh-token-ids.storage';

@Module({
    exports: [UsersService],
    providers: [
        UsersService,
        RefreshTokenIdsStorage,
        {
            provide: HashingService,
            useClass: BcryptService
        }
    ],
    controllers: [UsersController]
})
export class UsersModule {
}
