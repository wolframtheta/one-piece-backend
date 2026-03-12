import { Test, TestingModule } from '@nestjs/testing';
import { XarxaService } from './xarxa.service';

describe('XarxaService', () => {
  let service: XarxaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XarxaService],
    }).compile();

    service = module.get<XarxaService>(XarxaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
