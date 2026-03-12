import { Controller, Put, Get, Param, Body, UseGuards, ParseIntPipe, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpsertProgressDto } from './dto/upsert-progress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Put()
  upsert(@CurrentUser('id') userId: string, @Body() dto: UpsertProgressDto) {
    return this.progressService.upsert(userId, dto);
  }

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.progressService.findAll(userId);
  }

  @Get('recent')
  findRecent(@CurrentUser('id') userId: string) {
    return this.progressService.findRecent(userId);
  }

  @Get('latest')
  findLast(@CurrentUser('id') userId: string) {
    return this.progressService.findLast(userId);
  }

  @Get('episode/:episodeId')
  findByEpisode(
    @CurrentUser('id') userId: string,
    @Param('episodeId', ParseIntPipe) episodeId: number,
  ) {
    return this.progressService.findByEpisode(userId, episodeId);
  }

  @Post('sync-names')
  async syncNames(@CurrentUser('id') userId: string) {
    return this.progressService.syncNamesFromApi(userId);
  }
}
