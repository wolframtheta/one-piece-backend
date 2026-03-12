import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

const XARXA_API_BASE = 'https://gestio.multimedia.xarxacatala.cat/api/v2';

@Injectable()
export class XarxaService {
  private api = axios.create({
    baseURL: XARXA_API_BASE,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  });

  async getShow(showId: number) {
    try {
      const { data } = await this.api.get(`/shows/${showId}`);
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch show', HttpStatus.BAD_GATEWAY);
    }
  }

  async getSeasons(showId: number) {
    try {
      const { data } = await this.api.get(`/shows/${showId}/seasons`);
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch seasons', HttpStatus.BAD_GATEWAY);
    }
  }

  async getPlaylist(playlistId: number) {
    try {
      const { data } = await this.api.get(`/playlists/${playlistId}`);
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch playlist', HttpStatus.BAD_GATEWAY);
    }
  }
}
