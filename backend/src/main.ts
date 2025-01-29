import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorGenericExceptionFilter } from './filters/error-generic-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ErrorGenericExceptionFilter());
  await app.listen(process.env.HTTP_SERVER ?? 3000);
}
bootstrap();
