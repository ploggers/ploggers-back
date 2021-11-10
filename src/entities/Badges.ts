import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Crews } from './Crews';
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '"../assets/badges/***.png',
    description: '배지 이미지 주소',
  })
  @Column('varchar', { name: 'image', length: 300 })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Users, (users) => users.MyBadges)
  User: Users[];

  @ManyToMany(() => Crews, (crews) => crews.MyBadges)
  Crew: Crews[];
}
