import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { RefrestJwtStrategy } from 'src/common/strategy/refresh.strategy';
import { GoogleStrategy } from 'src/common/strategy/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefrestJwtStrategy, GoogleStrategy],
})
export class AuthModule {}
