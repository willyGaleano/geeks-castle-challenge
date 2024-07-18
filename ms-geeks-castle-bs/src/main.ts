import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './common/infrastructure/utils/constants';
import { swaggerConfig } from './common/infrastructure/settings/swagger/swagger.config';
import { validateEnvironment } from './common/infrastructure/settings/env-vars/env-vars.validation';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${GLOBAL_API_PREFIX}/api-docs`, app, document);

  const configService = app.get<ConfigService>(ConfigService);

  validateEnvironment(process.env, app.get(Logger));
  await app.listen(configService.get('HTTP_PORT'), '0.0.0.0', async () => {
    app.get(Logger).log(`server listening on ${await app.getUrl()}`);
  });
}
bootstrap();
