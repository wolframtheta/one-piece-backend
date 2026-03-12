import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface IntroTiming {
  start: number;
  end: number;
}

export interface IntroConfig {
  default: IntroTiming;
  episodes: Record<string, IntroTiming>;
}

@Injectable()
export class IntroConfigService {
  private config: IntroConfig;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const configPath = join(process.cwd(), 'config', 'intro-skip.json');
    const raw = readFileSync(configPath, 'utf-8');
    this.config = JSON.parse(raw);
  }

  getIntroConfig(): IntroConfig {
    return this.config;
  }
}
