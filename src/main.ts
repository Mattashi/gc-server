import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalValidationPipe } from 'pipes/validation.pipe';
import { HttpExceptionFilter } from 'filters/exception.filter';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = +process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('GC Chat Docs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
}

start();
