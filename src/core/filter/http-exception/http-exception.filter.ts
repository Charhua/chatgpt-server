import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * http请求错误异常过滤
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    // 错误消息
    const msg =
      typeof exceptionRes === 'string' && exceptionRes.length > 0
        ? exceptionRes
        : typeof exceptionRes === 'object' &&
          Array.isArray(exceptionRes.message)
        ? exceptionRes.message.join(',')
        : status >= 500
        ? '服务端错误'
        : '客户端错误';
    // 响应返回
    const resJson = {
      status: status,
      success: false,
      message: msg,
      data: {},
      timestamp: new Date().getTime(),
      path: request.url,
    };
    response.status(status).json(resJson);
  }
}
