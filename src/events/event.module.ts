import { Module } from '@nestjs/common'
import { WhatsappProvider } from './whatsapp.provider'
import { EventsGateway } from './events.gateway'

@Module({
  providers: [WhatsappProvider, EventsGateway]
})
export class EventsModule {}
