import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CrewsService } from './crews.service';

@ApiTags('CREWS')
@Controller('api/crews')
export class CrewsController {
  constructor(private crewService: CrewsService) {}

  @ApiOperation({ summary: '전체 크루 랭킹 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('ranking-all')
  async getAllCrewRanking() {
    return await this.crewService.getAllCrewRanking();
  }

  @ApiOperation({ summary: '학교 랭킹 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('ranking-school')
  async getSchoolRanking() {
    const result = await this.crewService.getSchoolRanking();
    console.log(result);
    return await this.crewService.getSchoolRanking();
  }

  @ApiOperation({ summary: '크루 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCrew(@Body() data: any) {
    return await this.crewService.createCrew(data);
  }

  @ApiOperation({ summary: '크루 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':crewId')
  async getCrewInfo(@Param('crewId') crewId: number) {
    return await this.crewService.getCrewInfo(crewId);
  }

  @ApiOperation({ summary: '크루 배지 개수 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':crewId/badges-count')
  async getCrewBadgesCount(@Param('crewId') crewId: number) {
    return await this.crewService.getCrewBadgesCount(crewId);
  }

  @ApiOperation({ summary: '크루 배지 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':crewId/badges')
  async getCrewBadges(@Param('crewId') crewId: number) {
    return await this.crewService.getCrewBadges(crewId);
  }

  @ApiOperation({ summary: '크루원 수 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':crewId/members-count')
  async getCrewMembersCount(@Param('crewId') crewId: number) {
    return await this.crewService.getCrewMembersCount(crewId);
  }
}
