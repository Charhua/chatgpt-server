import { Controller, Get, Query } from '@nestjs/common';
import { GetTokenService } from './get-token.service';
import { GetTokenDTO } from './get-token.dto';

@Controller('v1/token')
export class GetTokenController {
  constructor(private readonly getTokenService: GetTokenService) {}

  @Get('getInfo')
  async getInfo(@Query() options: GetTokenDTO): Promise<string> {
    return await this.getTokenService.getInfo(options);
  }
}
