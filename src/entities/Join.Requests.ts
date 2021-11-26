import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Crews } from './Crews';
import { Users } from './Users';

@Index('UserId', ['UserId'], {})
@Entity({ schema: 'ploggers', name: 'join_requests' })
export class JoinRequests {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('varchar', { primary: true, name: 'UserId' })
  UserId: string;

  @Column('int', { primary: true, name: 'CrewId' })
  CrewId: number;

  @ManyToOne(() => Users, (users) => users.Requests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  request: Users;

  @ManyToOne(() => Crews, (crews) => crews.Requests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CrewId', referencedColumnName: 'id' }])
  requestCrew: Crews;
}
