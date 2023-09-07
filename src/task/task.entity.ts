import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'task',
})
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  isCompleted: boolean;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  deadline: Date;

  @ManyToOne((type) => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
