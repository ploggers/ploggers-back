import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follows } from './Follows';
import { Manages } from './Manages';
import { Locations } from './Locations';
import { Badges } from './Badges';
import { Crews } from './Crews';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'ploggers', name: 'users' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
    description: '이메일',
  })
  @Column('varchar', { name: 'email', unique: true, length: 50 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '김홍엽',
    description: '이름',
  })
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'abcd1234!@#$',
    description: '해시된 비밀번호',
  })
  @Column('varchar', { name: 'password', length: 300, select: false })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'currentHashedRefreshToken',
    description: 'Refresh 토큰',
  })
  @Column('varchar', {
    name: 'currentHashedRefreshToken',
    length: 300,
    nullable: true,
  })
  currentHashedRefreshToken: string;

  @IsString()
  @ApiProperty({
    example: 'male',
    description: '남성 또는 여성',
  })
  @Column('enum', { name: 'sex', enum: ['male', 'female'], nullable: true })
  sex: 'male' | 'female' | null;

  @IsString()
  @ApiProperty({
    example: '010-1234-5678',
    description: '핸드폰 번호',
  })
  @Column('varchar', { name: 'phoneNumber', length: 15, nullable: true })
  phoneNumber: string | null;

  @IsString()
  @ApiProperty({
    example: '경기도 파주시',
    description: '주소',
  })
  @Column('varchar', { name: 'address', length: 200, nullable: true })
  address: string | null;

  @IsDate()
  @ApiProperty({
    example: '1997-05-28',
    description: '생년월일',
  })
  @Column('date', { name: 'birthdate', nullable: true })
  birthdate: Date | null;

  @IsNumber()
  @ApiProperty({
    example: '1000',
    description: '사용자 개인 점수',
  })
  @Column('int', { name: 'myScore', nullable: true })
  myScore: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Follows, (follows) => follows.Follower)
  Follows: Follows[];

  @OneToMany(() => Manages, (manages) => manages.Manager)
  Manages: Manages[];

  @ManyToMany(() => Locations, (locations) => locations.Belongers)
  @JoinTable({
    name: 'belongs',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'DongCd',
      referencedColumnName: 'dongCd',
    },
  })
  BelongLocations: Locations[];

  @ManyToMany(() => Badges)
  @JoinTable({
    name: 'user_badges',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'BadgeId',
      referencedColumnName: 'id',
    },
  })
  MyBadges: Badges[];

  @ManyToMany(() => Crews, (crews) => crews.JoinRequests)
  Crew: Crews[];
}
