import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from 'src/entities/Locations';

@Module({
  imports: [TypeOrmModule.forFeature([Locations])],
  providers: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
