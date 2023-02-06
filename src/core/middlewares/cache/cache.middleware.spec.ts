import { CacheMiddleware } from './cache.middleware';

describe('CacheMiddleware', () => {
  it('should be defined', () => {
    expect(new CacheMiddleware()).toBeDefined();
  });
});
