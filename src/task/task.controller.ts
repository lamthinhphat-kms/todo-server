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
  UseInterceptors,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { DeleteResult } from 'typeorm';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { UserDto } from 'src/user/user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @GetUser() user: UserEntity,
    @Body() task: TaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.createTask(user.id, task);
  }

  @Put(':id')
  async updateTaskById(
    @Param('id') taskId: number,
    @GetUser() user: UserDto,
    @Body() taskDto: TaskDto,
  ) {
    return await this.taskService.updateTask(user.id, taskId, taskDto);
  }

  @Get()
  async getListTask(@GetUser() user: UserDto) {
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
