import { Module } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { CrewsController } from './crews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crews } from 'src/entities/Crews';
import { CrewBadges } from 'src/entities/Crew.Badges';

@Module({
  imports: [TypeOrmModule.forFeature([Crews, CrewBadges])],
  providers: [CrewsService],
  controllers: [CrewsController],
})
export class CrewsModule {}
