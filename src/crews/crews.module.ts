import { Module } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { CrewsController } from './crews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crews } from 'src/entities/Crews';
import { CrewBadges } from 'src/entities/Crew.Badges';
import { Follows } from 'src/entities/Follows';
import { Users } from 'src/entities/Users';
import { Locations } from 'src/entities/Locations';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crews, CrewBadges, Follows, Users, Locations]),
  ],
  providers: [CrewsService],
  controllers: [CrewsController],
})
export class CrewsModule {}
