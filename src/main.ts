import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = await NestFactory.create<any>(AppModule)

  app.setViewEngine('hbs')
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  await app.listen(3000)
}
bootstrap()
