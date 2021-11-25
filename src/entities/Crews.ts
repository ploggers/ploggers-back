import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Badges } from './Badges';
import { Events } from './Events';
import { Follows } from './Follows';
import { JoinRequests } from './Join.Requests';
import { Locations } from './Locations';
import { Users } from './Users';

@Entity({ schema: 'ploggers', name: 'crews' })
export class Crews {
  @ApiProperty({
    example: 1,
    description: '크루 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '파주 불주먹 크루',
    description: '크루명',
  })
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: '공개여부',
  })
  @Column('boolean', { name: 'isPublic', default: true })
  isPublic: boolean;

  @IsNumber()
  @ApiProperty({
    example: '1000',
    description: '크루 점수',
  })
  @Column('int', { name: 'crewScore', nullable: true })
  crewScore: number | null;

  @IsString()
  @ApiProperty({
    example: '파주 불주먹 크루입니다.',
    description: '크루 소개',
  })
  @Column('varchar', { name: 'text', nullable: true })
  text: string | null;

  @IsString()
  @ApiProperty({
    example: '서강대학교',
    description: '크루 소속 대학교',
  })
  @Column('varchar', { name: 'school', nullable: true })
  school: string | null;

  @OneToMany(() => Users, (users) => users.Leads)
  Leader: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Follows, (follows) => follows.FollowCrew)
  Follows: Follows[];

  @OneToMany(() => Events, (events) => events.Crew)
  Events: Events[];

  @OneToMany(() => JoinRequests, (JoinRequests) => JoinRequests.RequestCrew)
  Requests: JoinRequests[];

  @OneToOne(() => Locations)
  @JoinColumn()
  location: Locations;

  @ManyToMany(() => Badges)
  @JoinTable({
    name: 'crew_badges',
    joinColumn: {
      name: 'CrewId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'BadgeId',
      referencedColumnName: 'id',
    },
  })
  MyBadges: Badges[];

  // @ManyToMany(() => Users)
  // @JoinTable({
  //   name: 'join_requests',
  //   joinColumn: {
  //     name: 'CrewId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'UserId',
  //     referencedColumnName: 'id',
  //   },
  // })
  // JoinRequests: Users[];
}
