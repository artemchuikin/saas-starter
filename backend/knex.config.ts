import {Knex} from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    },
    migrations: {
        directory: './src/db/migrations'
    }
};

export default config;
