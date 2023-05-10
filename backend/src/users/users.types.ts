import {Knex} from 'knex';

declare module 'knex/types/tables' {
    interface Tables {
        users: User;
        users_composite: Knex.CompositeTableType<User>;
    }
}

export interface User {
    id: string;
    email: string;
    password?: string;
    googleId?: string;
}
