import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './task/task.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';
import { TaskGatewayModule } from './gateways/task.gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: process.env.DB_HOST,
            port: 6379,
          },
          password: process.env.REDIS_PASSWORD,
        }),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [TaskEntity, UserEntity],
      synchronize: true,
    }),
    TaskModule,
    AuthModule,
    UserModule,
    TaskGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
