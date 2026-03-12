import { Module } from '@nestjs/common';
import { IntroConfigController } from './config.controller';
import { IntroConfigService } from './config.service';

@Module({
  controllers: [IntroConfigController],
  providers: [IntroConfigService],
})
export class IntroConfigModule {}
