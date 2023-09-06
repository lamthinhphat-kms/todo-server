import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from 'src/task/task.service';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class TaskGateway {
  constructor(private taskService: TaskService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('task')
  async handleTaskUpdate(@MessageBody('userId') userId: number): Promise<void> {
    this.server
      .to(`task - ${userId}`)
      .emit('task', await this.taskService.findAllTask(userId));
    // this.server.emit('task', await this.taskService.findAllTask(userId));
  }

  @SubscribeMessage('listen')
  async handleListenToTask(
    @MessageBody('sub') userId: number,
    @MessageBody('socketId') socketId: string,
  ): Promise<void> {
    console.log(userId);
    if (socketId) {
      await this.server.in(socketId).socketsJoin(`task - ${userId}`);
    }
  }
}
