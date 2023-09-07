import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class TaskDto extends BaseDto {
  @Expose()
  @IsOptional()
  title?: string;

  @Expose()
  @IsOptional()
  isCompleted?: boolean;

  @Expose()
  @IsOptional()
  deadline?: boolean;
}
