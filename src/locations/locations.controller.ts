import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LocationsService } from './locations.service';

@ApiTags('LOCATIONS')
@Controller('api/locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}

  @ApiOperation({ summary: '전체 지역 리스트 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllLocations() {
    return await this.locationService.getAllLocations();
  }
}
