import { Test, TestingModule } from '@nestjs/testing';
import { InvalidateCacheController } from './invalidate-cache.controller';

describe('InvalidateCacheController', () => {
  let controller: InvalidateCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvalidateCacheController],
    }).compile();

    controller = module.get<InvalidateCacheController>(InvalidateCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
