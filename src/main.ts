import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

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
