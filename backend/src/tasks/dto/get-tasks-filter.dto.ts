import { TaskStatus } from "../task.types";
import { IsEnum, IsString, IsOptional } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}
