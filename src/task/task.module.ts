import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, LoggerService],
})
export class TaskModule {}
