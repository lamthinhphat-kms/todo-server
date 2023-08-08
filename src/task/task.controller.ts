import { plainToInstance } from 'class-transformer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { DeleteResult } from 'typeorm';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserEntity } from 'src/user/user.entity';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @GetUser() user: UserEntity,
    @Body() task: TaskDto,
  ): Promise<TaskDto> {
    console.log(task);
    const taskCreated = await this.taskService.createTask(user.id, task);
    return plainToInstance(TaskDto, taskCreated, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async updateTaskById(
    @Param('id') taskId: number,
    @GetUser() user: UserEntity,
    @Body() taskDto: TaskDto,
  ): Promise<TaskDto> {
    const taskUpdated = await this.taskService.updateTask(
      user.id,
      taskId,
      taskDto,
    );
    return plainToInstance(TaskDto, taskUpdated, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getListTask(@GetUser() user: UserEntity) {
    const taskList = await this.taskService.findAllTask(user.id);

    return plainToInstance(TaskDto, taskList, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: number, @GetUser() user: UserEntity) {
    const taskFound = await this.taskService.findTaskById(user.id, taskId);
    return plainToInstance(TaskDto, taskFound, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async deleteTaskById(
    @Param('id') taskId: number,
    @GetUser() user: UserEntity,
  ) {
    return await this.taskService.deleteTaskById(user.id, taskId);
  }
}
