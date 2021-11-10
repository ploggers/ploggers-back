import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtRefreshGuard } from 'src/auth/jwt-refresh.guart';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기 ' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    return req.user || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      throw new ConflictException();
    }
    await this.userService.join(data.email, data.name, data.password);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response: Response) {
    const user = req.user;
    const token = await this.userService.login(user);
    response
      .cookie('accessToken', token.accessToken, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 15),
      })
      .cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .send({ user: user });
  }

  @ApiOperation({ summary: 'access 토큰 재발급' })
  @UseGuards(JwtRefreshGuard)
  @Get('refresh-access')
  async refreshAccess(@Request() req, @Res() response: Response) {
    const user = req.user;
    const { accessToken } = await this.userService.refreshAccessToken(user);
    response
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 15),
      })
      .send({ success: true });
  }

  @ApiOperation({ summary: 'refresh & access 토큰 재발급' })
  @UseGuards(JwtRefreshGuard)
  @Get('refresh-all')
  async refreshAll(@Request() req, @Res() response: Response) {
    const user = req.user;
    const token = await this.userService.login(user);
    response
      .cookie('accessToken', token.accessToken, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 15),
      })
      .cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .send({ user: user });
  }
}
