import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    console.log(authDto);
    return this.authService.signup(authDto);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
