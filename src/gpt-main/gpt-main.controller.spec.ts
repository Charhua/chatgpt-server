import { Test, TestingModule } from '@nestjs/testing';
import { GptMainController } from './gpt-main.controller';

describe('GptMainController', () => {
  let controller: GptMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptMainController],
    }).compile();

    controller = module.get<GptMainController>(GptMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
