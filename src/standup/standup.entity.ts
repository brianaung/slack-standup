import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('standup')
export class StandupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  standupId: string;

  // @ManyToOne(() => UserEntity, (user) => user.standups)
  // user: UserEntity;

  @Column()
  userId: string;

  @Column()
  text: string;

  @Column('float8')
  ts: number;
}
