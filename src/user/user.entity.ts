import { BaseEntity } from 'src/common/base.entity';
import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: true,
  })
  hashPassword: string;

  @Column({
    name: 'first_name',
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'is_google',
    default: false,
  })
  isGoogle: boolean;

  @OneToMany((type) => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
