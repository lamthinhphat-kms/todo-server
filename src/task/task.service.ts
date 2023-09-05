import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/common/base.service';
import { NotFoundError } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
    await this.cacheManager.del(`findAllTask:${userId}`);
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
      await this.cacheManager.del(`findTaskById:${taskId}OfUser:${userId}`);
      await this.cacheManager.del(`findAllTask:${userId}`);
      return { message: 'Update task successfully' };
    } catch (error) {
      throw error;
    }
  }

  async findAllTask(userId: number) {
    const taskList = await this.cacheManager.get(`findAllTask:${userId}`);
    if (taskList != null) {
      return taskList;
    } else {
      const findTasks = await this.taskRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });
      await this.cacheManager.set(`findAllTask:${userId}`, findTasks);
      return findTasks;
    }
  }

  async findTaskById(userId: number, taskId: number) {
    this.logger.verbose(`Find tasks by id ${taskId} for user ${userId}`);
    const task = await this.cacheManager.get(
      `findTaskById:${taskId}OfUser:${userId}`,
    );
    if (task != null) {
      return task;
    } else {
      const findTask = await this.taskRepository.findOne({
        where: {
          id: taskId,
          user: {
            id: userId,
          },
        },
      });
      await this.cacheManager.set(
        `findTaskById:${taskId}OfUser:${userId}`,
        findTask,
      );
      return findTask;
    }
  }

  async deleteTaskById(userId: number, taskId: number) {
    this.logger.verbose(`delete tasks by id ${taskId} for user ${userId}`);
    await this.cacheManager.del(`findAllTask:${userId}`);
    return await this.taskRepository.delete({
      id: taskId,
      user: {
        id: userId,
      },
    });
  }

  async softDeleteTaskById(userId: number, taskId: number) {
    await this.cacheManager.del(`findAllTask:${userId}`);
    return await this.taskRepository.softDelete({
      id: taskId,
      user: {
        id: userId,
      },
    });
  }
}
