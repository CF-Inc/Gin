import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import passport from 'passport';
import 'tslint-override/angular-register';

import { AppModule } from './app/app.module';
import { PrismaService } from './app/core/prisma.service';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3333;
  const globalPrefix = 'api';

  const prisma = app.get(PrismaService);

  app.use(
    expressSession({
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        logger: new Logger('PrismaSessionStore'),
      }),
      secret: 'OH',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(globalPrefix);

  await app
    .listen(port)
    .then(() =>
      Logger.log(
        `Listening at http://localhost:${port}/${globalPrefix}`,
        'Bootstrap'
      )
    );
};

bootstrap();
