import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('watch_progress')
@Unique(['userId', 'episodeId'])
export class WatchProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'episode_id', type: 'int' })
  episodeId: number;

  @Column({ name: 'season_id', type: 'int' })
  seasonId: number;

  @Column({ name: 'show_id', type: 'int' })
  showId: number;

  @Column({ name: 'episode_name', type: 'text', nullable: true })
  episodeName?: string;

  @Column({ name: 'season_name', type: 'text', nullable: true })
  seasonName?: string;

  @Column({ name: 'current_time', type: 'float', default: 0 })
  currentTime: number;

  @Column({ type: 'float', default: 0 })
  duration: number;

  @Column({ default: false })
  completed: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.watchProgress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
