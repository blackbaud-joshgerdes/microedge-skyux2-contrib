import { SkyContribConfigService } from './config.service';

describe('SkyContribConfigService', () => {
  it('should return configuration', () => {
    const configService = new SkyContribConfigService();
    expect(configService).toBeDefined();
  });
});
