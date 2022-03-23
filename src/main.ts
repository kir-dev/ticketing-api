import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 7 * 1000 * 60 * 60 * 24 },
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Ticketing')
    .setDescription('The Ticketing API description')
    .setVersion('1.0')
    .addTag('support')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.APP_PORT || 3000)
}
bootstrap()
