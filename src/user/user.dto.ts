import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @Expose()
  @IsOptional()
  firstName: string;

  @Expose()
  @IsOptional()
  lastName: string;
}
