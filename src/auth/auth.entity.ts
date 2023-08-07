import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'auth',
})
export class AuthEntity extends BaseEntity {
  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'password',
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
}
