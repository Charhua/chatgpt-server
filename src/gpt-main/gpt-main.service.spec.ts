import { Test, TestingModule } from '@nestjs/testing';
import { GptMainService } from './gpt-main.service';

describe('GptMainService', () => {
  let service: GptMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptMainService],
    }).compile();

    service = module.get<GptMainService>(GptMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
