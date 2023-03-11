import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { ResponseInterceptor } from './core/interceptor/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 统一api前缀
  app.setGlobalPrefix('api');
  // 数据验证管道
  app.useGlobalPipes(new ValidationPipe());
  // http异常处理
  app.useGlobalFilters(new HttpExceptionFilter());
  // 拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // swagger挂载
  const options = new DocumentBuilder()
    .setTitle('问了就答')
    .setDescription('问了就答chatGPT核心接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(7002);
}

bootstrap();
