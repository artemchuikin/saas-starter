import {Injectable, NotFoundException} from '@nestjs/common';
import {Knex} from 'knex';
import {Task, TaskStatus} from './task.types';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {InjectConnection} from 'nest-knexjs';
import {User} from '../users/users.types';
import {TelegramService} from '../telegram/telegram.service';

@Injectable()
export class TasksService {
    constructor(
        private telegramService: TelegramService,
        @InjectConnection() private readonly knex: Knex
    ) {
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const message = `\n`
            + `Has been created a new task\n`
            + `\n`
            + `Title: ${title}\n`
            + `Description: ${description}\n`;

        const task = await this.knex.table('tasks')
            .insert({
                title,
                description,
                status: TaskStatus.OPEN,
                user_id: user.id
            })
            .returning([
                'id',
                'title',
                'description',
                'status'
            ]);

        this.telegramService.sendMessage(message);

        return task[0];
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;

        const tasks = this.knex('tasks').select(
            'id',
            'title',
            'description',
            'status'
        );

        tasks.where('user_id', user.id);

        if (status) tasks.andWhere('status', status);

        if (search) {
            tasks
                .andWhere(function() {
                    this.andWhere('title', 'ilike', `%${search}%`)
                        .orWhere('description', 'ilike', `%${search}%`);
                });

            status && tasks.andWhere('status', status);
        }

        return tasks;
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.knex('tasks')
            .where('user_id', user.id)
            .where('id', id)
            .select(
                'id',
                'title',
                'description',
                'status'
            );

        if (!found[0]) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found[0];
    }

    async deleteTask(id: number, user: User): Promise<Omit<Task, 'status'>> {
        const deletedTask = await this.knex('tasks')
            .where('user_id', user.id)
            .where('id', id)
            .del()
            .returning(['id', 'title', 'description']);

        return deletedTask[0];
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.knex('tasks')
            .where('user_id', user.id)
            .where('id', id)
            .update({status: status})
            .returning(['id', 'title', 'description', 'status']);

        if (!task[0]) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task[0];
    }
}
