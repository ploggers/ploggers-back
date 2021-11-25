import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FollowsService } from './follows.service';

@ApiTags('FOLLOWS')
@Controller('api/follows')
export class FollowsController {
  constructor(private followService: FollowsService) {}

  @ApiOperation({ summary: '크루 가입하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async registerCrew(@Body() data, @Request() req) {
    const crewId = data.crewId;
    const userId = req.user.id;
    return await this.followService.registerCrew(crewId, userId);
  }

  @ApiOperation({ summary: '크루 탈퇴하기' })
  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteFollow(@Body() data, @Request() req) {
    const crewId = data.crewId;
    const userId = req.user.id;
    return await this.followService.unregisterCrew(crewId, userId);
  }

  @ApiOperation({ summary: '마이 크루 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyCrews(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getMyCrews(userId);
  }
}
