import { Module } from '@nestjs/common';
import { TaskGateway } from './task.gateway';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [TaskGateway],
})
export class TaskGatewayModule {}
