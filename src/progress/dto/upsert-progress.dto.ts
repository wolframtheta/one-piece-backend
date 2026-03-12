import { IsInt, IsNumber, IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpsertProgressDto {
  @IsInt()
  episodeId: number;

  @IsInt()
  seasonId: number;

  @IsInt()
  showId: number;

  @IsOptional()
  @IsString()
  episodeName?: string;

  @IsOptional()
  @IsString()
  seasonName?: string;

  @IsNumber()
  currentTime: number;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
