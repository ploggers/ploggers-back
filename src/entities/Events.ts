import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Crews } from './Crews';

@Entity({ schema: 'ploggers', name: 'events' })
export class Events {
  @ApiProperty({
    example: 1,
    description: '일정 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '심학산 플로깅',
    description: '일정 제목',
  })
  @Column('varchar', { name: 'title', length: 300 })
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-11-10',
    description: '날짜',
  })
  @Column('date', { name: 'date' })
  date: Date;

  @ApiProperty({
    example: '00:00',
    description: '시작 시간',
  })
  @Column('time', { name: 'startTime', nullable: true })
  startTime: Date | null;

  @ApiProperty({
    example: '12:00',
    description: '종료 시간',
  })
  @Column('time', { name: 'endTime', nullable: true })
  endTime: Date | null;

  @IsString()
  @ApiProperty({
    example: '심학산',
    description: '일정 장소',
  })
  @Column('varchar', { name: 'location', length: 100, nullable: true })
  location: string | null;

  @IsString()
  @ApiProperty({
    example: '심학산 플로깅 이벤트입니다.',
    description: '일정 세부 내용',
  })
  @Column('text', { name: 'text', nullable: true })
  text: string | null;

  @Column('int', { name: 'CrewId', nullable: false })
  CrewId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Crews, (crews) => crews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CrewId', referencedColumnName: 'id' }])
  Crew: Crews;
}
