import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { WatchProgress } from './entities/watch-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchProgress])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
