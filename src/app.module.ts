import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptMainModule } from './gpt-main/gpt-main.module';
import { GetTokenModule } from './get-token/get-token.module';

@Module({
  imports: [GptMainModule, GetTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
