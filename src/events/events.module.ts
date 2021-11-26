import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Badges } from 'src/entities/Badges';
import { Crews } from 'src/entities/Crews';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Locations } from 'src/entities/Locations';
import { Users } from 'src/entities/Users';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      Badges,
      Crews,
      Users,
      Locations,
      Events,
      Follows,
    ]),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
