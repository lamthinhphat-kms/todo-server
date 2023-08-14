import { GetUser } from '../common/decorator/get-user.decorator';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { JwtGuard } from 'src/common/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  async getMe(@GetUser() user: UserDto) {
    return plainToInstance(UserDto, await this.userService.findById(user.id), {
      excludeExtraneousValues: true,
    });
  }
}
