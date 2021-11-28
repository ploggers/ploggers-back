import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from 'src/entities/Locations';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private locationRepository: Repository<Locations>,
  ) {}

  async getAllLocations() {
    return await this.locationRepository.find();
  }
}
