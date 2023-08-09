import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/common/base.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }

  async createTask(userId: number, task: TaskDto) {
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
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findTaskById(userId: number, taskId: number) {
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
