import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {UserCredentialsDto} from './dto/user-credentials.dto';
import * as uniqid from 'uniqid';
import {Knex} from 'knex';
import {InjectConnection} from 'nest-knexjs';
import {User} from './users.types';
import {HashingService} from '../auth/hashing/hashing.service';
import {JwtPayload} from '../auth/auth.types';
import {RefreshTokenIdsStorage} from '../auth/refresh-token-ids.storage';

@Injectable()
export class UsersService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly hashingService: HashingService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
    ) {
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const {email} = payload;
        const user: Promise<User> = this.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async createUser(userCredentialsDto: UserCredentialsDto): Promise<User> {
        const {email, password} = userCredentialsDto;
        const hashedPassword = await this.hashingService.hash(password);
        const uid = uniqid();

        try {
            const user = await this.knex.table('users')
                .insert({
                    id: uid,
                    email,
                    password: hashedPassword
                })
                .returning(['id', 'email']);

            return user[0];
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

    async getAllUsers(): Promise<User[]> {
        const allUsers = await this.knex('users')
            .select('id', 'email');
        return allUsers;
    }

    async getUserById(id: string): Promise<User> {
        const found = await this.knex('users')
            .where('id', id)
            .select('id', 'email');

        if (!found[0]) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return found[0];
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.knex('users')
            .where('id', id)
            .del()
            .returning(['id', 'email']);

        await this.refreshTokenIdsStorage.invalidate(id);

        return deletedUser[0];
    }

    async getUserByEmail(email: string): Promise<User> {
        const found = await this.knex('users')
            .where('email', email)
            .select('id', 'email');

        if (!found[0]) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return found[0];
    }
}
