import { Module } from '@nestjs/common';
import { GptMainController } from './gpt-main.controller';
import { GptMainService } from './gpt-main.service';

@Module({
  controllers: [GptMainController],
  providers: [GptMainService],
})
export class GptMainModule {}
