import {Controller, Delete, Get, Param} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './users.types';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Get()
    getUsers(): Promise<any> {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Get('/user/:email')
    getUserByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.getUserByEmail(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }
}
