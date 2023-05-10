import {IsEnum} from 'class-validator';
import {TaskStatus} from '../task.types';

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
