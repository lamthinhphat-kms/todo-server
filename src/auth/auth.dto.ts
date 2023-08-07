import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class AuthDto extends BaseDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
