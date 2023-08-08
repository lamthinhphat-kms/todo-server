import { GetUser } from './../auth/decorator/get-user.decorator';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserEntity } from './user.entity';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  async getMe(@GetUser() user: UserEntity) {
    return plainToInstance(UserDto, await this.userService.findById(user.id), {
      excludeExtraneousValues: true,
    });
  }
}
