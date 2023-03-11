import { HttpException, Injectable } from '@nestjs/common';
import { GetToken } from './get-token.interface';
import 'isomorphic-unfetch';

const { ChatGPTAuthTokenService } = require('chat-gpt-authenticator');

@Injectable()
export class GetTokenService {
  /**
   * 获取Token
   * @param opts
   */
  async getInfo(opts: GetToken): Promise<string> {
    try {
      const chatGPTAuthTokenService = new ChatGPTAuthTokenService(
        opts.email,
        opts.password,
      );
      if (opts.type === '1') {
        return await chatGPTAuthTokenService.getToken();
      } else if (opts.type === '2') {
        return await chatGPTAuthTokenService.refreshToken();
      }
    } catch (e) {
      throw new HttpException('获取异常，请重试：' + e.message, 500);
    }
  }
}
