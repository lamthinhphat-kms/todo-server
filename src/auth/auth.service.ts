import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import * as argon from 'argon2';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwt: JwtService,
  ) {
    super(userRepository);
  }
  async signin(userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
        isGoogle: false,
      },
    });
    if (!user) throw new ForbiddenException('Invalid email');
    const pwMathches = await argon.verify(user.hashPassword, userDto.password);
    if (!pwMathches) throw new ForbiddenException('Invalid password');

    return await this.signToken(user.id, user.email, false);
  }

  async signup(userDto: UserDto) {
    try {
      const hash = await argon.hash(userDto.password);
      const user = await this.save({
        email: userDto.email,
        hashPassword: hash,
      });
      return plainToInstance(UserDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email address already exists');
      }
      throw error;
    }
  }

  async refreshToken(user: UserEntity) {
    return await this.signToken(user.id, user.email, true);
  }

  async googleRedirect(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  async loginWithGoogle(userInfo: UserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (!user) {
      const cretedUser = await this.save({
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        isGoogle: true,
      });
      return await this.signToken(cretedUser.id, cretedUser.email, false);
    } else {
      if (!user.isGoogle) {
        throw new ConflictException('Email address already exists');
      }
      return await this.signToken(user.id, user.email, false);
    }
  }

  async signToken(userId: number, email: string, isRefresh: boolean) {
    const payload = {
      sub: userId,
      email: email,
    };
    return isRefresh
      ? {
          access_token: await this.jwt.signAsync(payload, {
            secret: 'super-secret',
            expiresIn: '1d',
          }),
        }
      : {
          access_token: await this.jwt.signAsync(payload, {
            secret: 'super-secret',
            expiresIn: '1d',
          }),
          refresh_token: await this.jwt.signAsync(payload, {
            secret: 'super-secret',
            expiresIn: '7d',
          }),
        };
  }
}
