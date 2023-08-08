import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/common/base.service';

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

    return await this.taskRepository.save(taskEntity);
  }

  async updateTask(userId: number, taskId: number, task: TaskDto) {}

  async findAllTask(userId: number) {
    console.log(userId);
    return this.taskRepository.find({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findTaskById(userId: number, taskId: number) {}

  async deleteTaskById(userId: number, taskId: number) {}

  async softDeleteTaskById(userId: number, taskId: number) {}
}
