import { Module } from '@nestjs/common';
import { XarxaController } from './xarxa.controller';
import { XarxaService } from './xarxa.service';

@Module({
  controllers: [XarxaController],
  providers: [XarxaService]
})
export class XarxaModule {}
