import { plainToInstance } from 'class-transformer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: TaskDto): Promise<TaskDto> {
    const taskCreated = await this.taskService.save(task);
    return plainToInstance(TaskDto, taskCreated, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async updateTaskById(
    @Param('id') id: number,
    @Body() taskDto: TaskDto,
  ): Promise<TaskDto> {
    const taskUpdated = await this.taskService.update(id, taskDto);
    return plainToInstance(TaskDto, taskUpdated, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getListTask(): Promise<TaskDto[]> {
    const taskList = await this.taskService.findAll();

    return plainToInstance(TaskDto, taskList, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<TaskDto> {
    const taskFound = await this.taskService.findById(id);
    return plainToInstance(TaskDto, taskFound, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: number): Promise<DeleteResult> {
    return await this.taskService.deleteById(id);
  }
}
