import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
