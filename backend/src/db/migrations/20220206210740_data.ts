import {Knex} from 'knex';

export const up = async (knex: Knex) => {
    await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.string('id')
            .unique()
            .primary();
        table.string('email', 255)
            .unique()
            .notNullable();
        table.string('password', 255)
            .nullable();
        table.string('googleId', 255)
            .nullable();
    });

    await knex.schema.createTable('tasks', function(table) {
        table.increments('id')
            // .defaultTo(knex.raw('gen_random_uuid()'))
            .primary();
        table.string('title')
            .notNullable();
        table.string('description');
        table.string('status')
            .notNullable();
        table.string('user_id')
            .references('users.id');
    });
};

export const down = async (knex: Knex): Promise<any> => {
    await knex.schema.dropTable('tasks');
    await knex.schema.dropTable('users');
};
