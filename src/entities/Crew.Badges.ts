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
import { Badges } from './Badges';
import { Crews } from './Crews';

@Index('CrewId', ['CrewId'], {})
@Entity({ schema: 'ploggers', name: 'crew_badges' })
export class CrewBadges {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('varchar', { primary: true, name: 'BadgeId' })
  BadgeId: string;

  @Column('varchar', { primary: true, name: 'CrewId' })
  CrewId: string;

  @ManyToOne(() => Badges, (badges) => badges.crewBadges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'BadgeId', referencedColumnName: 'id' }])
  badge: Badges;

  @ManyToOne(() => Crews, (crews) => crews.crewBadges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CrewId', referencedColumnName: 'id' }])
  crew: Crews;
}
