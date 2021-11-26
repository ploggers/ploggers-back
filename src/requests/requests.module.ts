import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Badges } from 'src/entities/Badges';
import { Crews } from 'src/entities/Crews';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { JoinRequests } from 'src/entities/Join.Requests';
import { Locations } from 'src/entities/Locations';
import { Users } from 'src/entities/Users';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      Badges,
      Crews,
      Users,
      Events,
      Follows,
      Locations,
      JoinRequests,
    ]),
  ],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
