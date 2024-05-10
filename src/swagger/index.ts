import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Sushi Chat 🍣')
    .setDescription("Step into Sushi Chat for a taste of Japan's finest! 🍣")
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Rooms')
    .addTag('Messages')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
};
