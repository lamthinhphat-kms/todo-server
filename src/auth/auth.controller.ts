import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';
import { GetUser } from '../common/decorator/get-user.decorator';
import { RefreshGuard } from 'src/common/guard/refresh.guard';
import { GoogleGuard } from 'src/common/guard/google.guard';

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

  @UseGuards(GoogleGuard)
  @Get('google')
  async googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async redirectedGoogleAuth(@Req() req) {
    return await this.authService.googleRedirect(req);
  }

  @Post('google/login/web')
  async googleInfoWeb(@Body('token') token: string) {
    return await this.authService.loginWithGoogleWeb(token);
  }

  @Post('google/login/mobile')
  async googleInfo(@Body('token') token: string) {
    return await this.authService.loginWithGoogle(token);
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(@GetUser('user') user: UserDto) {
    return this.authService.refreshToken(user);
  }
}
