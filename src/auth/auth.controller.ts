import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/user.dto';
import { RefreshGuard } from './guard/refresh.guard';
import { UserEntity } from 'src/user/user.entity';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() userDto: UserDto) {
    return this.authService.signin(userDto);
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(@GetUser('user') user: UserEntity) {
    return this.authService.refreshToken(user);
  }
}
