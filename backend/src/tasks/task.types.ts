import {Knex} from 'knex';

declare module 'knex/types/tables' {
    interface Tables {
        tasks: Task;
        tasks_composite: Knex.CompositeTableType<Task>;
    }
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user_id?: string;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
