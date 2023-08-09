import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RefrestJwtStrategy } from './strategy/refresh.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefrestJwtStrategy],
})
export class AuthModule {}
