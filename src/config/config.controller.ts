import { Controller, Get } from '@nestjs/common';
import { IntroConfigService, IntroConfig } from './config.service';

@Controller('config')
export class IntroConfigController {
  constructor(private readonly configService: IntroConfigService) {}

  @Get('intro')
  getIntroConfig(): IntroConfig {
    return this.configService.getIntroConfig();
  }
}
