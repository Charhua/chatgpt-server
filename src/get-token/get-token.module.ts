import { Module } from '@nestjs/common';
import { GetTokenController } from './get-token.controller';
import { GetTokenService } from './get-token.service';

@Module({
  controllers: [GetTokenController],
  providers: [GetTokenService]
})
export class GetTokenModule {}
