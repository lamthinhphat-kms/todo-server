import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService extends BaseService<AuthEntity> {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {
    super(authRepository);
  }
  signin() {}
  async signup(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);
    const user = await this.save({
      email: authDto.email,
      hashPassword: hash,
    });
    return user;
  }
}
