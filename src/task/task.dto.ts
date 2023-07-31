import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class TaskDto extends BaseDto {
  @Expose()
  title: string;

  @Expose()
  isCompleted: boolean;
}
