import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CrewBadges } from './Crew.Badges';
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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

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
  @Column('int', { name: 'crewScore', nullable: false, default: 0 })
  crewScore: number | 0;

  @IsString()
  @ApiProperty({
    example: '파주 불주먹 크루입니다.',
    description: '크루 소개',
  })
  @Column('varchar', { name: 'text', nullable: true })
  text: string | null;

  @IsString()
  @ApiProperty({
    example:
      '다음주에 정모가 예정되어 있습니다. 일정 확인하시고 꼭 참여해주세요! :)',
    description: '공지',
  })
  @Column('varchar', {
    name: 'notice',
    nullable: false,
    default: '공지가 없습니다.',
  })
  notice: string;

  @IsString()
  @ApiProperty({
    example: '서강대학교',
    description: '크루 소속 대학교',
  })
  @Column('varchar', { name: 'school', nullable: false, default: '학교미등록' })
  school: string | '학교미등록';

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

  @ManyToOne(() => Users, (users) => users.Leads, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'LeaderId', referencedColumnName: 'id' }])
  Leader: Users;

  @ManyToOne(() => Locations, (locations) => locations.BelongCrews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'LocationDongCd', referencedColumnName: 'dongCd' }])
  Location: Locations;

  @OneToMany(() => JoinRequests, (joinRequests) => joinRequests.requestCrew)
  Requests: JoinRequests[];

  @OneToMany(() => CrewBadges, (crewBadges) => crewBadges.badge)
  crewBadges: CrewBadges[];
}
