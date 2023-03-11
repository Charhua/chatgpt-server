import { HttpException, Injectable } from '@nestjs/common';
import { GptMain, GptMainToKey, GptMainToToken } from './gpt-main.interface';
import 'isomorphic-unfetch';
import { importDynamic } from '../core/utils/dynamicImport';

@Injectable()
export class GptMainService {
  async getGptMain(options: GptMain): Promise<any> {
    // mode:1为api 2为token代理 type:1为文本类型 2为流类型
    if (options.type === '1') {
      if (options.mode === '1') {
        return await this.getGptToKey(options.opts);
      } else if (options.mode === '2') {
        return await this.getGptToToken(options.opts);
      }
    } else if (options.type === '2') {
      throw new HttpException('无效的type值', 400);
    }
  }

  /**
   * api模式
   * @param options
   */
  async getGptToKey<T extends GptMainToKey>(options: T): Promise<any> {
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    try {
      const api = new ChatGPTAPI({
        apiKey: options.key,
        timeoutMs: 10 * 60 * 1000,
        ...options.opts,
      });
      const messageOpt: any = {};
      if (this.checkParentMessage(options)) {
        messageOpt.parentMessageId = options.parentMessageId;
      }
      const res = await api.sendMessage(options.content, messageOpt);
      return res;
    } catch (e) {
      throw new HttpException('获取chatGPT消息异常，请重试：' + e.message, 500);
    }
  }

  /**
   * 代理模式
   * @param options
   */
  async getGptToToken<T extends GptMainToToken>(options: T) {
    const { ChatGPTUnofficialProxyAPI } = await importDynamic('chatgpt');
    try {
      const api = new ChatGPTUnofficialProxyAPI({
        accessToken: options.key,
        timeoutMs: 10 * 60 * 1000,
        ...options.opts,
      });
      const messageOpt: any = {};
      if (this.checkParentMessage(options)) {
        console.log('代理追踪');
        messageOpt.parentMessageId = options.parentMessageId;
      }
      const res = await api.sendMessage(options.content, messageOpt);
      return res;
    } catch (e) {
      throw new HttpException('获取chatGPT消息异常，请重试：' + e.message, 500);
    }
  }

  /**
   * 是否消息追踪验证
   * @param opts
   */
  checkParentMessage(opts: GptMainToKey | GptMainToToken): string | boolean {
    return opts.parentMessageId && opts.parentMessageId.length > 0
      ? opts.parentMessageId
      : false;
  }
}
