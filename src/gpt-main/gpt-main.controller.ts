import { Body, Controller, Post } from '@nestjs/common';
import { GptMainService } from './gpt-main.service';
import { GptRequestDTO } from './gpt-main.dto';

@Controller('v1/gpt')
export class GptMainController {
  constructor(private readonly gptMainService: GptMainService) {}

  @Post('getInfo')
  async getGpt(@Body() options: GptRequestDTO): Promise<any> {
    return await this.gptMainService.getGptMain(options);
  }
}
