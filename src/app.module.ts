import { Module } from '@nestjs/common'
import { EventsModule } from './events/event.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [EventsModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
