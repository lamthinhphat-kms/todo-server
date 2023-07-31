import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'task',
})
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  isCompleted: boolean;
}
