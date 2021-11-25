import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequestsService } from './requests.service';

@ApiTags('REQUESTS')
@Controller('api/request-join')
export class RequestsController {
  constructor(private joinRequestService: RequestsService) {}

  @ApiOperation({ summary: '크루 가입 신청' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async registerJoin(@Body() data, @Request() req) {
    const crewId = data.crewId;
    const userId = req.user.id;
    return await this.joinRequestService.joinRequest(crewId, userId);
  }
}
