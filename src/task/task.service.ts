import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/common/base.service';
import { NotFoundError } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private logger: LoggerService,
  ) {
    super(taskRepository);
    this.logger.setContext(TaskService.name);
  }

  async createTask(userId: number, task: TaskDto) {
    this.logger.verbose(`Create task: ${task} for user ${userId}`);
    const taskEntity = this.taskRepository.create({
      ...task,
      user: {
        id: userId,
      },
    });

    return plainToInstance(
      TaskDto,
      await this.taskRepository.save(taskEntity),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async updateTask(userId: number, taskId: number, task: TaskDto) {
    try {
      this.logger.verbose(`Update task: ${task} for user ${userId}`);
      const updateResult = await this.taskRepository.update(
        {
          id: taskId,
          user: {
            id: userId,
          },
        },
        task,
      );
      if (updateResult.affected == 0)
        throw new NotFoundException('Update failed');
      return { message: 'Update task successfully' };
    } catch (error) {
      throw error;
    }
  }

  async findAllTask(userId: number) {
    this.logger.verbose(`Find all tasks for user ${userId}`);
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findTaskById(userId: number, taskId: number) {
    this.logger.verbose(`Find tasks by id ${taskId} for user ${userId}`);
    return await this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });
  }

  async deleteTaskById(userId: number, taskId: number) {
    this.logger.verbose(`delete tasks by id ${taskId} for user ${userId}`);
    return await this.taskRepository.delete({
      id: taskId,
      user: {
        id: userId,
      },
    });
  }

  async softDeleteTaskById(userId: number, taskId: number) {
    return await this.taskRepository.softDelete({
      id: taskId,
      user: {
        id: userId,
      },
    });
  }
}
