import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { StandupEntity } from '../standup/standup.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 20 })
  userId: string;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  image: string;

  // @OneToMany(() => StandupEntity, (standup) => standup.user, { nullable: true })
  // standups: StandupEntity[];
}
