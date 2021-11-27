import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CrewBadges } from './Crew.Badges';
import { Users } from './Users';

@Entity({ schema: 'ploggers', name: 'badges' })
export class Badges {
  @ApiProperty({
    example: 1,
    description: '배지 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @ApiProperty({
    example: '개인',
    description: '개인 또는 크루',
  })
  @Column('enum', {
    name: 'category',
    enum: ['personal', 'crew'],
    nullable: true,
  })
  category: 'personal' | 'crew' | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Users, (users) => users.MyBadges)
  User: Users[];

  @OneToMany(() => CrewBadges, (crewBadges) => crewBadges.badge)
  crewBadges: CrewBadges[];
}
