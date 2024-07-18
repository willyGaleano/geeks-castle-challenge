import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Geeks Castle Microservices')
  .setDescription('Geeks Castle Microservices API Documentation')
  .setVersion('1.0.0')
  .addTag('ms-geeks-castle-bs')
  .build();
