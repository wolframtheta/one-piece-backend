import { Test, TestingModule } from '@nestjs/testing';
import { XarxaController } from './xarxa.controller';

describe('XarxaController', () => {
  let controller: XarxaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XarxaController],
    }).compile();

    controller = module.get<XarxaController>(XarxaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
