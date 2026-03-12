import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchProgress } from './entities/watch-progress.entity';
import { UpsertProgressDto } from './dto/upsert-progress.dto';
import axios from 'axios';

@Injectable()
export class ProgressService {
  private xarxaApi = axios.create({
    baseURL: 'https://gestio.multimedia.xarxacatala.cat/api/v2',
  });

  constructor(
    @InjectRepository(WatchProgress)
    private readonly progressRepo: Repository<WatchProgress>,
  ) {}

  async upsert(userId: string, dto: UpsertProgressDto): Promise<WatchProgress> {
    const existing = await this.progressRepo.findOne({
      where: { userId, episodeId: dto.episodeId },
    });

    const completed =
      dto.completed ?? (dto.duration > 0 && dto.currentTime / dto.duration > 0.95);

    if (existing) {
      existing.currentTime = dto.currentTime;
      existing.duration = dto.duration;
      existing.seasonId = dto.seasonId;
      existing.showId = dto.showId;
      existing.episodeName = dto.episodeName;
      existing.seasonName = dto.seasonName;
      existing.completed = completed;
      return this.progressRepo.save(existing);
    }

    const progress = this.progressRepo.create({
      userId,
      ...dto,
      completed,
    });
    return this.progressRepo.save(progress);
  }

  async findAll(userId: string): Promise<WatchProgress[]> {
    return this.progressRepo.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findRecent(userId: string): Promise<WatchProgress[]> {
    const items = await this.progressRepo.find({
      where: { userId, completed: false },
      order: { updatedAt: 'DESC' },
      take: 5,
    });

    await Promise.all(
      items.map((item) => {
        if (!item.episodeName || !item.seasonName) {
          return this.enrichProgressNames(item);
        }
      }),
    );

    return items;
  }

  async findLast(userId: string): Promise<WatchProgress | null> {
    const progress = await this.progressRepo.findOne({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });

    if (progress && (!progress.episodeName || !progress.seasonName)) {
      await this.enrichProgressNames(progress);
    }

    return progress;
  }

  private async enrichProgressNames(progress: WatchProgress): Promise<void> {
    try {
      const { data: playlist } = await this.xarxaApi.get(`/playlists/${progress.seasonId}`);
      const episode = playlist.videos?.find((v: any) => v.id === progress.episodeId);

      if (episode) {
        progress.episodeName = episode.nom;
        progress.seasonName = playlist.nom;
        await this.progressRepo.save(progress);
      }
    } catch (error) {
      console.error(`Failed to enrich episode ${progress.episodeId}:`, error.message);
    }
  }

  async findByEpisode(userId: string, episodeId: number): Promise<WatchProgress | null> {
    return this.progressRepo.findOne({
      where: { userId, episodeId },
    });
  }

  async updateNames(userId: string, episodeId: number, episodeName: string, seasonName: string): Promise<void> {
    await this.progressRepo.update(
      { userId, episodeId },
      { episodeName, seasonName },
    );
  }

  async syncNamesFromApi(userId: string): Promise<{ updated: number }> {
    const allProgress = await this.progressRepo.find({
      where: { userId },
    });

    let updated = 0;

    for (const progress of allProgress) {
      if (!progress.episodeName || !progress.seasonName) {
        try {
          const { data: playlist } = await this.xarxaApi.get(`/playlists/${progress.seasonId}`);
          const episode = playlist.videos?.find((v: any) => v.id === progress.episodeId);

          if (episode) {
            progress.episodeName = episode.nom;
            progress.seasonName = playlist.nom;
            await this.progressRepo.save(progress);
            updated++;
          }
        } catch (error) {
          console.error(`Failed to sync episode ${progress.episodeId}:`, error.message);
        }
      }
    }

    return { updated };
  }
}
