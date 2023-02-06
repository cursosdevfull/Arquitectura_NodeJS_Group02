import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const hostAllowed = ['http://localhost:4000', 'http://localhost:8080'];
  const app = await NestFactory.create(AppModule, {
    cors: { origin: hostAllowed },
  });
  //app.use(csurf());
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //app.useGlobalInterceptors(new IpInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Description of all endpoints');

  const documentBuild = config.build();

  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(AppService.PORT, () =>
    console.log(`Server is running on port ${AppService.PORT}`),
  );
}
bootstrap();
