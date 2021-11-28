import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Crews } from './Crews';
import { Users } from './Users';

@Index('dongCd', ['dongCd'], {})
@Entity({ schema: 'ploggers', name: 'locations' })
export class Locations {
  @ApiProperty({
    example: 1010101010,
    description: '행정동코드',
  })
  @PrimaryColumn({ type: 'varchar', name: 'dongCd' })
  dongCd: string;

  @ApiProperty({
    example: '운정2동',
    description: '행정동명',
  })
  @Column({ type: 'varchar', name: 'dongNm' })
  dongnM: string;

  @ApiProperty({
    example: '파주시',
    description: '시도명',
  })
  @Column({ type: 'varchar', name: 'sdNm' })
  sdNm: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Users, (users) => users.BelongLocations)
  Belongers: Users[];

  @OneToMany(() => Crews, (crews) => crews.Location)
  BelongCrews: Crews[];
}
