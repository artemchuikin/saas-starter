import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Delete,
    Patch,
    Query,
    UseGuards,
    Req
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {UpdateTaskStatusDto} from './dto/update-task-status.dto';
import {GetUser} from '../users/get-user.decorator';
import {Task} from './task.types';
import {User} from '../users/users.types';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {
    }

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: number,
        @GetUser() user: User
    ): Promise<Omit<Task, 'status'>> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
