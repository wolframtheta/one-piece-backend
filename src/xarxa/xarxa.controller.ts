import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { XarxaService } from './xarxa.service';

@Controller('xarxa')
export class XarxaController {
  constructor(private readonly xarxaService: XarxaService) {}

  @Get('shows/:id')
  getShow(@Param('id', ParseIntPipe) id: number) {
    return this.xarxaService.getShow(id);
  }

  @Get('shows/:id/seasons')
  getSeasons(@Param('id', ParseIntPipe) id: number) {
    return this.xarxaService.getSeasons(id);
  }

  @Get('playlists/:id')
  getPlaylist(@Param('id', ParseIntPipe) id: number) {
    return this.xarxaService.getPlaylist(id);
  }
}
