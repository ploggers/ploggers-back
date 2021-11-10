import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'ploggers', name: 'articles' })
export class Articles {
  @ApiProperty({
    example: 1,
    description: '아티클 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '이것은 아티클 제목입니다',
    description: '아티클 제목',
  })
  @Column('varchar', { name: 'title', length: 300 })
  title: string;

  @IsString()
  @ApiProperty({
    example: '아티클 소개글입니다.',
    description: '아티클 소개글',
  })
  @Column('text', { name: 'text', nullable: true })
  text: string | null;

  @IsString()
  @ApiProperty({
    example: '../assets/articles/thumbnails/***.png',
    description: '아티클 썸네일 이미지 주소입니다.',
  })
  @Column('varchar', { name: 'thumbnail', nullable: true })
  thumbnail: string;

  @IsString()
  @ApiProperty({
    example: '../assets/articles/images/***.png',
    description: '아티클 본문 이미지 주소입니다.',
  })
  @Column('varchar', { name: 'image', nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
