import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as prismaSessionStore from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import passport from 'passport';
import 'tslint-override/angular-register';

import { AppModule } from './app/app.module';
import { PrismaService } from './app/core/prisma.service';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const PrismaSessionStore = prismaSessionStore(expressSession);

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const prisma = app.get(PrismaService);

  app.use(
    expressSession({
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: null,
      }),
      secret: 'OH',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT ?? 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
};

bootstrap();
